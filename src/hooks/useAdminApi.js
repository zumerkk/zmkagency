import { useState, useCallback } from 'react';
import { auth } from '../firebase';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export function useAdminApi() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getHeaders = useCallback(async () => {
        const user = auth.currentUser;
        if (!user) throw new Error('Oturum açılmamış');
        const token = await user.getIdToken();
        return {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        };
    }, []);

    const request = useCallback(async (path, options = {}) => {
        setLoading(true);
        setError(null);
        try {
            const headers = await getHeaders();
            const res = await fetch(`${API_BASE}${path}`, {
                ...options,
                headers: { ...headers, ...options.headers },
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.error || `HTTP ${res.status}`);
            }

            // Check if response is a file download
            const contentType = res.headers.get('content-type');
            if (contentType && (
                contentType.includes('application/pdf') ||
                contentType.includes('application/vnd.openxmlformats') ||
                contentType.includes('application/octet-stream')
            )) {
                return res.blob();
            }

            return res.json();
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [getHeaders]);

    const get = useCallback((path) => request(path), [request]);
    const post = useCallback((path, data) => request(path, { method: 'POST', body: JSON.stringify(data) }), [request]);
    const put = useCallback((path, data) => request(path, { method: 'PUT', body: JSON.stringify(data) }), [request]);
    const del = useCallback((path) => request(path, { method: 'DELETE' }), [request]);

    const downloadFile = useCallback(async (path, filename) => {
        const blob = await request(path);
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, [request]);

    return { get, post, put, del, downloadFile, loading, error, setError };
}
