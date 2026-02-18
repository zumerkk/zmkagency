import { useState, useEffect, useCallback, useRef } from 'react';
import { db } from '../firebase';
import {
    collection, doc, addDoc, updateDoc, deleteDoc, getDoc,
    query, orderBy, where, onSnapshot, serverTimestamp,
    getDocs, limit, startAfter
} from 'firebase/firestore';

const PAGE_SIZE = 20;

/**
 * Generic Firestore CRUD hook.
 * Usage: const { items, loading, error, add, update, remove, refresh } = useFirestoreCRUD('customers');
 */
export function useFirestoreCRUD(collectionName, {
    orderField = 'createdAt',
    orderDir = 'desc',
    filters = [],      // [{ field, op, value }]
    pageSize = PAGE_SIZE,
    realtime = true,
} = {}) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lastDoc, setLastDoc] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const unsubRef = useRef(null);

    // Build query
    const buildQuery = useCallback((afterDoc = null) => {
        const ref = collection(db, collectionName);
        const constraints = [];

        filters.forEach(f => {
            if (f.value !== undefined && f.value !== null && f.value !== '' && f.value !== 'all') {
                constraints.push(where(f.field, f.op || '==', f.value));
            }
        });

        constraints.push(orderBy(orderField, orderDir));
        constraints.push(limit(pageSize));

        if (afterDoc) {
            constraints.push(startAfter(afterDoc));
        }

        return query(ref, ...constraints);
    }, [collectionName, orderField, orderDir, pageSize, JSON.stringify(filters)]);

    // Realtime listener
    useEffect(() => {
        setLoading(true);
        setError(null);

        if (unsubRef.current) unsubRef.current();

        try {
            const q = buildQuery();

            if (realtime) {
                unsubRef.current = onSnapshot(q,
                    (snapshot) => {
                        const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
                        setItems(data);
                        setLastDoc(snapshot.docs[snapshot.docs.length - 1] || null);
                        setHasMore(snapshot.docs.length >= pageSize);
                        setLoading(false);
                    },
                    (err) => {
                        console.error(`Firestore error (${collectionName}):`, err);
                        setError(err.message);
                        setLoading(false);
                    }
                );
            } else {
                getDocs(q).then(snapshot => {
                    const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
                    setItems(data);
                    setLastDoc(snapshot.docs[snapshot.docs.length - 1] || null);
                    setHasMore(snapshot.docs.length >= pageSize);
                    setLoading(false);
                }).catch(err => {
                    setError(err.message);
                    setLoading(false);
                });
            }
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }

        return () => {
            if (unsubRef.current) unsubRef.current();
        };
    }, [buildQuery, realtime]);

    // Load more (pagination)
    const loadMore = useCallback(async () => {
        if (!lastDoc || !hasMore) return;
        try {
            const q = buildQuery(lastDoc);
            const snapshot = await getDocs(q);
            const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
            setItems(prev => [...prev, ...data]);
            setLastDoc(snapshot.docs[snapshot.docs.length - 1] || null);
            setHasMore(snapshot.docs.length >= pageSize);
        } catch (err) {
            setError(err.message);
        }
    }, [lastDoc, hasMore, buildQuery, pageSize]);

    // Add document
    const add = useCallback(async (data) => {
        try {
            const docRef = await addDoc(collection(db, collectionName), {
                ...data,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            });
            return docRef.id;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    }, [collectionName]);

    // Update document
    const update = useCallback(async (id, data) => {
        try {
            await updateDoc(doc(db, collectionName, id), {
                ...data,
                updatedAt: serverTimestamp(),
            });
        } catch (err) {
            setError(err.message);
            throw err;
        }
    }, [collectionName]);

    // Delete document
    const remove = useCallback(async (id) => {
        try {
            await deleteDoc(doc(db, collectionName, id));
        } catch (err) {
            setError(err.message);
            throw err;
        }
    }, [collectionName]);

    // Get single document
    const get = useCallback(async (id) => {
        try {
            const snap = await getDoc(doc(db, collectionName, id));
            if (snap.exists()) {
                return { id: snap.id, ...snap.data() };
            }
            return null;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    }, [collectionName]);

    // Manual refresh
    const refresh = useCallback(async () => {
        setLoading(true);
        try {
            const q = buildQuery();
            const snapshot = await getDocs(q);
            const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
            setItems(data);
            setLastDoc(snapshot.docs[snapshot.docs.length - 1] || null);
            setHasMore(snapshot.docs.length >= pageSize);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [buildQuery, pageSize]);

    return { items, loading, error, add, update, remove, get, loadMore, hasMore, refresh };
}

/**
 * Simple helper for getting all docs from a collection (for dropdowns).
 */
export function useFirestoreList(collectionName, orderField = 'createdAt') {
    const [items, setItems] = useState([]);
    useEffect(() => {
        const q = query(collection(db, collectionName), orderBy(orderField, 'desc'));
        const unsub = onSnapshot(q, (snap) => {
            setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        });
        return unsub;
    }, [collectionName, orderField]);
    return items;
}

/**
 * Toast notification utility
 */
let toastTimeout;
export function showToast(message, type = 'success') {
    // Remove existing
    const existing = document.querySelector('.admin-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `admin-toast admin-toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('show'));

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
