import React from 'react';
import { LayoutDashboard, Inbox, Zap, DollarSign, LogOut } from 'lucide-react';

const AdminSidebar = ({ activeTab, setActiveTab, onLogout }) => {
    const menuItems = [
        { id: 'overview', label: 'Özet Durum', icon: <LayoutDashboard size={20} /> },
        { id: 'all', label: 'Tüm Mesajlar', icon: <Inbox size={20} /> },
        { id: 'quote', label: 'Hızlı Teklifler', icon: <Zap size={20} /> },
        { id: 'pricing', label: 'Fiyat Planları', icon: <DollarSign size={20} /> },
    ];

    return (
        <div style={{
            width: '260px',
            minHeight: '100vh',
            background: '#050505',
            borderRight: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            flexDirection: 'column',
            padding: '20px',
            position: 'fixed'
        }}>
            {/* Logo Area */}
            <div style={{ marginBottom: '40px', paddingLeft: '10px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '-1px' }}>
                    ZMK <span style={{ color: '#2997ff' }}>ADMIN</span>
                </h2>
            </div>

            {/* Menu */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '5px' }}>
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '12px 15px',
                            background: activeTab === item.id ? 'rgba(41, 151, 255, 0.1)' : 'transparent',
                            color: activeTab === item.id ? '#2997ff' : '#888',
                            border: 'none',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            textAlign: 'left',
                            fontSize: '0.95rem',
                            fontWeight: activeTab === item.id ? '600' : '400',
                            transition: 'all 0.2s'
                        }}
                    >
                        {item.icon}
                        {item.label}
                    </button>
                ))}
            </div>

            {/* Logout */}
            <button
                onClick={onLogout}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 15px',
                    color: '#ff4444',
                    background: 'rgba(255, 68, 68, 0.05)',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    marginTop: 'auto',
                    transition: 'background 0.2s'
                }}
            >
                <LogOut size={20} />
                Güvenli Çıkış
            </button>
        </div>
    );
};

export default AdminSidebar;
