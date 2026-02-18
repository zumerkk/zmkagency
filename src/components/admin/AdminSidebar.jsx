import React from 'react';
import { LayoutDashboard, Users, Briefcase, FolderKanban, FileText, FileSignature, CreditCard, Settings, LogOut, Bell } from 'lucide-react';

const AdminSidebar = ({ activeTab, setActiveTab, onLogout, overdueCount = 0 }) => {
    const mainItems = [
        { id: 'dashboard', label: 'Gösterge Paneli', icon: <LayoutDashboard size={18} /> },
        { id: 'clients', label: 'Müşteriler', icon: <Users size={18} /> },
    ];

    const workItems = [
        { id: 'services', label: 'Hizmet Kataloğu', icon: <Briefcase size={18} /> },
        { id: 'projects', label: 'Projeler', icon: <FolderKanban size={18} /> },
    ];

    const financeItems = [
        { id: 'quotes', label: 'Teklifler', icon: <FileText size={18} /> },
        { id: 'contracts', label: 'Sözleşmeler', icon: <FileSignature size={18} /> },
        { id: 'payments', label: 'Ödemeler', icon: <CreditCard size={18} />, badge: overdueCount || null },
    ];

    const systemItems = [
        { id: 'templates', label: 'Şablonlar', icon: <Settings size={18} /> },
    ];

    const renderSection = (title, items) => (
        <>
            <div className="admin-sidebar-section">{title}</div>
            {items.map((item) => (
                <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`admin-nav-item ${activeTab === item.id ? 'active' : ''}`}
                >
                    {item.icon}
                    {item.label}
                    {item.badge && <span className="nav-badge">{item.badge}</span>}
                </button>
            ))}
        </>
    );

    return (
        <div className="admin-sidebar">
            <div className="admin-sidebar-logo">
                <h2>ZMK <span>ADMIN</span></h2>
            </div>

            <div className="admin-sidebar-nav">
                {renderSection('ANA MENÜ', mainItems)}
                {renderSection('İŞ YÖNETİMİ', workItems)}
                {renderSection('FİNANS', financeItems)}
                {renderSection('SİSTEM', systemItems)}
            </div>

            <button onClick={onLogout} className="admin-nav-logout">
                <LogOut size={18} />
                Güvenli Çıkış
            </button>
        </div>
    );
};

export default AdminSidebar;
