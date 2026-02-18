import React from 'react';
import { LayoutDashboard, Inbox, Zap, DollarSign, MessageSquare, Users, Briefcase, FolderKanban, FileText, FileSignature, CreditCard, Settings, LogOut } from 'lucide-react';

const AdminSidebar = ({ activeTab, setActiveTab, onLogout }) => {
    // Firebase-based leads sections
    const leadsItems = [
        { id: 'overview', label: 'Özet Durum', icon: <LayoutDashboard size={18} /> },
        { id: 'all', label: 'Tüm Mesajlar', icon: <Inbox size={18} /> },
        { id: 'quote', label: 'Hızlı Teklifler', icon: <Zap size={18} /> },
        { id: 'pricing', label: 'Fiyat Planları', icon: <DollarSign size={18} /> },
        { id: 'contact', label: 'İletişim Mesajları', icon: <MessageSquare size={18} /> },
    ];

    // CRM sections (API-based)
    const crmMainItems = [
        { id: 'clients', label: 'Müşteriler', icon: <Users size={18} /> },
    ];

    const crmWorkItems = [
        { id: 'services', label: 'Hizmet Kataloğu', icon: <Briefcase size={18} /> },
        { id: 'projects', label: 'Projeler', icon: <FolderKanban size={18} /> },
    ];

    const crmFinanceItems = [
        { id: 'quotes', label: 'Teklifler', icon: <FileText size={18} /> },
        { id: 'contracts', label: 'Sözleşmeler', icon: <FileSignature size={18} /> },
        { id: 'payments', label: 'Ödemeler', icon: <CreditCard size={18} /> },
    ];

    const crmSystemItems = [
        { id: 'templates', label: 'Şablonlar', icon: <Settings size={18} /> },
    ];

    const renderSection = (title, items) => (
        <>
            <div style={{
                fontSize: '0.65rem',
                color: '#555',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                fontWeight: 700,
                padding: '18px 15px 6px',
                marginTop: '4px'
            }}>{title}</div>
            {items.map((item) => (
                <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '10px 15px',
                        background: activeTab === item.id ? 'rgba(41, 151, 255, 0.1)' : 'transparent',
                        color: activeTab === item.id ? '#2997ff' : '#888',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontSize: '0.85rem',
                        fontWeight: activeTab === item.id ? '600' : '400',
                        transition: 'all 0.2s',
                        width: '100%'
                    }}
                >
                    {item.icon}
                    {item.label}
                </button>
            ))}
        </>
    );

    return (
        <div style={{
            width: '260px',
            minHeight: '100vh',
            background: '#050505',
            borderRight: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            flexDirection: 'column',
            padding: '20px',
            position: 'fixed',
            overflowY: 'auto'
        }}>
            {/* Logo Area */}
            <div style={{ marginBottom: '25px', paddingLeft: '10px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '-1px' }}>
                    ZMK <span style={{ color: '#2997ff' }}>ADMIN</span>
                </h2>
            </div>

            {/* Menu */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {renderSection('MESAJLAR & LEAD', leadsItems)}

                <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '12px 0' }}></div>

                {renderSection('MÜŞTERİ YÖNETİMİ', crmMainItems)}
                {renderSection('İŞ YÖNETİMİ', crmWorkItems)}
                {renderSection('FİNANS', crmFinanceItems)}
                {renderSection('SİSTEM', crmSystemItems)}
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
                    marginTop: '15px',
                    transition: 'background 0.2s',
                    width: '100%'
                }}
            >
                <LogOut size={18} />
                Güvenli Çıkış
            </button>
        </div>
    );
};

export default AdminSidebar;
