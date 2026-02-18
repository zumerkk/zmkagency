import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAdminApi } from '../../hooks/useAdminApi';
import AdminLayout from './AdminLayout';
import DashboardView from './views/DashboardView';
import ClientsView from './views/ClientsView';
import ClientDetailView from './views/ClientDetailView';
import ServicesView from './views/ServicesView';
import ProjectsView from './views/ProjectsView';
import QuotesView from './views/QuotesView';
import ContractsView from './views/ContractsView';
import PaymentsView from './views/PaymentsView';
import TemplatesView from './views/TemplatesView';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [selectedClientId, setSelectedClientId] = useState(null);
    const [overdueCount, setOverdueCount] = useState(0);
    const navigate = useNavigate();
    const api = useAdminApi();

    // Fetch overdue count for sidebar badge
    useEffect(() => {
        api.get('/dashboard').then(data => {
            setOverdueCount(data.stats?.overdueCount || 0);
        }).catch(() => { });
    }, [activeTab]);

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/admin/login');
    };

    const handleViewClient = (clientId) => {
        setSelectedClientId(clientId);
        setActiveTab('clientDetail');
    };

    const handleBackToClients = () => {
        setSelectedClientId(null);
        setActiveTab('clients');
    };

    const renderView = () => {
        switch (activeTab) {
            case 'dashboard':
                return <DashboardView api={api} onViewClient={handleViewClient} />;
            case 'clients':
                return <ClientsView api={api} onViewClient={handleViewClient} />;
            case 'clientDetail':
                return <ClientDetailView api={api} clientId={selectedClientId} onBack={handleBackToClients} />;
            case 'services':
                return <ServicesView api={api} />;
            case 'projects':
                return <ProjectsView api={api} />;
            case 'quotes':
                return <QuotesView api={api} onViewClient={handleViewClient} />;
            case 'contracts':
                return <ContractsView api={api} />;
            case 'payments':
                return <PaymentsView api={api} />;
            case 'templates':
                return <TemplatesView api={api} />;
            default:
                return <DashboardView api={api} onViewClient={handleViewClient} />;
        }
    };

    return (
        <AdminLayout
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onLogout={handleLogout}
            overdueCount={overdueCount}
        >
            {renderView()}
        </AdminLayout>
    );
};

export default Dashboard;
