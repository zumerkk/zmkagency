import React, { useState } from 'react';
import { Search, Plus, Users, FileText, FolderKanban, CreditCard, LogOut } from 'lucide-react';

const AdminTopbar = ({ onQuickAdd, userEmail }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const quickAddItems = [
        { id: 'customers', label: 'Yeni Müşteri', icon: <Users size={15} /> },
        { id: 'quotes', label: 'Yeni Teklif', icon: <FileText size={15} /> },
        { id: 'projects', label: 'Yeni Proje', icon: <FolderKanban size={15} /> },
        { id: 'payments', label: 'Yeni Ödeme', icon: <CreditCard size={15} /> },
    ];

    return (
        <div className="admin-topbar">
            <div className="admin-topbar-actions">
                <div className="admin-topbar-quickadd">
                    <button
                        className="admin-btn admin-btn-primary admin-btn-sm"
                        onClick={() => setShowDropdown(!showDropdown)}
                        onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                    >
                        <Plus size={15} /> Hızlı Ekle
                    </button>
                    {showDropdown && (
                        <div className="admin-topbar-dropdown">
                            {quickAddItems.map(item => (
                                <button key={item.id} onClick={() => { onQuickAdd(item.id); setShowDropdown(false); }}>
                                    {item.icon} {item.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <span style={{ color: '#555', fontSize: '0.8rem', marginLeft: '8px' }}>
                    {userEmail}
                </span>
            </div>
        </div>
    );
};

export default AdminTopbar;
