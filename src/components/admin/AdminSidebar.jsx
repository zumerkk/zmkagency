import React from 'react';
import {
    LayoutDashboard, Inbox, Zap, DollarSign, MessageSquare,
    Users, Briefcase, FolderKanban, FileText, FileSignature,
    CreditCard, Settings, LogOut
} from 'lucide-react';

const AdminSidebar = ({ activeTab, setActiveTab, onLogout, newLeadCount = 0 }) => {

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
                    {item.badge ? <span className="nav-badge">{item.badge}</span> : null}
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
                {renderSection('MESAJLAR', [
                    { id: 'overview', label: 'Özet Durum', icon: <LayoutDashboard size={17} /> },
                    { id: 'all', label: 'Tüm Mesajlar', icon: <Inbox size={17} />, badge: newLeadCount || null },
                    { id: 'quote', label: 'Hızlı Teklifler', icon: <Zap size={17} /> },
                    { id: 'pricing', label: 'Fiyat Planları', icon: <DollarSign size={17} /> },
                    { id: 'contact', label: 'İletişim', icon: <MessageSquare size={17} /> },
                ])}

                <div className="admin-sidebar-divider" />

                {renderSection('CRM', [
                    { id: 'customers', label: 'Müşteriler', icon: <Users size={17} /> },
                ])}

                {renderSection('İŞ YÖNETİMİ', [
                    { id: 'catalog', label: 'Hizmet Kataloğu', icon: <Briefcase size={17} /> },
                    { id: 'projects', label: 'Projeler', icon: <FolderKanban size={17} /> },
                ])}

                {renderSection('SATIŞ', [
                    { id: 'quotes', label: 'Teklifler', icon: <FileText size={17} /> },
                    { id: 'contracts', label: 'Sözleşmeler', icon: <FileSignature size={17} /> },
                ])}

                {renderSection('FİNANS', [
                    { id: 'payments', label: 'Ödemeler', icon: <CreditCard size={17} /> },
                ])}

                {renderSection('SİSTEM', [
                    { id: 'settings', label: 'Ayarlar', icon: <Settings size={17} /> },
                ])}
            </div>

            <button onClick={onLogout} className="admin-nav-logout">
                <LogOut size={17} />
                Güvenli Çıkış
            </button>
        </div>
    );
};

export default AdminSidebar;
