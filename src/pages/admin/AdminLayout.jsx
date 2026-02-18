import React from 'react';
import AdminGuard from '../../components/admin/AdminGuard';
import AdminSidebar from '../../components/admin/AdminSidebar';
import '../../styles/Admin.css';

const AdminLayout = ({ children, activeTab, setActiveTab, onLogout, overdueCount = 0 }) => {
    return (
        <AdminGuard>
            <div className="admin-layout">
                <AdminSidebar
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    onLogout={onLogout}
                    overdueCount={overdueCount}
                />
                <div className="admin-main">
                    {children}
                </div>
            </div>
        </AdminGuard>
    );
};

export default AdminLayout;
