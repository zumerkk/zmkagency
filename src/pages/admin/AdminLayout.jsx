import React from 'react';
import AdminGuard from '../../components/admin/AdminGuard';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminTopbar from '../../components/admin/AdminTopbar';
import '../../styles/Admin.css';

const AdminLayout = ({ children, activeTab, setActiveTab, onLogout, newLeadCount, userEmail, onQuickAdd }) => {
    return (
        <AdminGuard>
            <div className="admin-layout">
                <AdminSidebar
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    onLogout={onLogout}
                    newLeadCount={newLeadCount}
                />
                <div className="admin-main">
                    <AdminTopbar
                        onQuickAdd={onQuickAdd}
                        userEmail={userEmail}
                    />
                    <div className="admin-content">
                        {children}
                    </div>
                </div>
            </div>
        </AdminGuard>
    );
};

export default AdminLayout;
