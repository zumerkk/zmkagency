import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const AdminGuard = ({ children }) => {
    const [checking, setChecking] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthenticated(true);
            } else {
                navigate('/admin/login');
            }
            setChecking(false);
        });
        return () => unsubscribe();
    }, [navigate]);

    if (checking) {
        return (
            <div style={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#000',
                color: '#fff',
                gap: '10px',
            }}>
                <div className="admin-spinner" />
                Doğrulanıyor...
            </div>
        );
    }

    if (!authenticated) return null;
    return children;
};

export default AdminGuard;
