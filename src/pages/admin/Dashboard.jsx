import React, { useEffect, useState, useMemo } from 'react';
import { auth, db } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Inbox, Zap, CreditCard, MessageSquare } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import AdminLayout from './AdminLayout';
import LeadDetailModal from '../../components/admin/LeadDetailModal';

// CRM Views
import DashboardView from './views/DashboardView';
import ClientsView from './views/ClientsView';
import ServicesView from './views/ServicesView';
import ProjectsView from './views/ProjectsView';
import QuotesView from './views/QuotesView';
import ContractsView from './views/ContractsView';
import PaymentsView from './views/PaymentsView';
import SettingsView from './views/SettingsView';

const LEAD_TABS = ['overview', 'all', 'quote', 'pricing', 'contact'];

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [selectedLead, setSelectedLead] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            if (u) setUser(u);
            else navigate('/login');
        });
        return unsub;
    }, [navigate]);

    useEffect(() => {
        if (!user) return;
        const q = query(collection(db, 'leads'), orderBy('timestamp', 'desc'));
        const unsub = onSnapshot(q, (snap) => {
            setLeads(snap.docs.map(d => ({ id: d.id, ...d.data() })));
            setLoading(false);
        });
        return unsub;
    }, [user]);

    const handleLogout = async () => { await signOut(auth); navigate('/login'); };

    const markAsContacted = async (id) => {
        await updateDoc(doc(db, 'leads', id), { status: 'Contacted' });
        if (selectedLead?.id === id) setSelectedLead(p => ({ ...p, status: 'Contacted' }));
    };

    // Quick add from topbar — just switch tab (views handle their own modals)
    const handleQuickAdd = (tab) => setActiveTab(tab);

    // Lead stats
    const stats = useMemo(() => ({
        total: leads.length,
        new: leads.filter(l => l.status === 'New').length,
        contacted: leads.filter(l => l.status === 'Contacted').length,
        today: leads.filter(l => {
            if (!l.timestamp?.toDate) return false;
            const d = l.timestamp.toDate();
            const now = new Date();
            return d.toDateString() === now.toDateString();
        }).length,
    }), [leads]);

    const filteredLeads = useMemo(() => {
        if (activeTab === 'overview') return [];
        if (activeTab === 'all') return leads;
        if (activeTab === 'quote') return leads.filter(l => l.type?.includes('Quick Quote') || l.type === 'Custom Quote');
        if (activeTab === 'pricing') return leads.filter(l => l.type?.includes('Pricing'));
        if (activeTab === 'contact') return leads.filter(l => l.type === 'Contact Form' || l.type === 'Contact Page Form');
        return leads;
    }, [leads, activeTab]);

    const isLeadTab = LEAD_TABS.includes(activeTab);

    if (loading) return (
        <div style={{ height: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
            <div className="admin-spinner" style={{ marginRight: 10 }} /> Yükleniyor...
        </div>
    );

    const renderCRMView = () => {
        switch (activeTab) {
            case 'customers': return <ClientsView />;
            case 'catalog': return <ServicesView />;
            case 'projects': return <ProjectsView />;
            case 'quotes': return <QuotesView />;
            case 'contracts': return <ContractsView />;
            case 'payments': return <PaymentsView />;
            case 'settings': return <SettingsView />;
            default: return <DashboardView />;
        }
    };

    const tabTitle = {
        overview: 'Özet Durum',
        all: 'Tüm Mesajlar',
        quote: 'Hızlı Teklifler',
        pricing: 'Fiyat Talepleri',
        contact: 'İletişim Mesajları',
    };

    return (
        <AdminLayout
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onLogout={handleLogout}
            newLeadCount={stats.new}
            userEmail={user?.email}
            onQuickAdd={handleQuickAdd}
        >
            {isLeadTab ? (
                <>
                    <div className="admin-header">
                        <div>
                            <h1>{tabTitle[activeTab] || 'Mesajlar'}</h1>
                            <p className="admin-header-subtitle">Yönetici Paneli</p>
                        </div>
                    </div>

                    {activeTab === 'overview' && (
                        <>
                            <div className="admin-stat-grid">
                                <StatCard label="Toplam Mesaj" value={stats.total} icon={<Inbox size={16} />} />
                                <StatCard label="Bugün Gelen" value={stats.today} color="info" icon={<Zap size={16} />} />
                                <StatCard label="Bekleyen" value={stats.new} color="danger" icon={<MessageSquare size={16} />} />
                                <StatCard label="Tamamlanan" value={stats.contacted} color="success" icon={<CheckCircle size={16} />} />
                            </div>

                            <div className="admin-table-wrapper">
                                <div className="admin-table-header">
                                    <h3>Son Gelenler</h3>
                                </div>
                                <div style={{ padding: '8px' }}>
                                    <LeadsTable leads={leads.slice(0, 8)} onSelect={setSelectedLead} />
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab !== 'overview' && (
                        <LeadsTable leads={filteredLeads} onSelect={setSelectedLead} emptyMsg="Bu kategoride henüz mesaj yok." />
                    )}
                </>
            ) : (
                renderCRMView()
            )}

            <AnimatePresence>
                {selectedLead && (
                    <LeadDetailModal
                        lead={selectedLead}
                        onClose={() => setSelectedLead(null)}
                        onMarkRead={markAsContacted}
                    />
                )}
            </AnimatePresence>
        </AdminLayout>
    );
};

/* ===== Sub-components ===== */
const StatCard = ({ label, value, color = '', icon }) => (
    <div className="admin-stat-card">
        <div className="stat-label">{icon} {label}</div>
        <div className={`stat-value ${color}`}>{value}</div>
    </div>
);

const LeadsTable = ({ leads, onSelect, emptyMsg = "Veri bulunamadı." }) => {
    if (leads.length === 0) return (
        <div className="admin-empty">
            <div className="admin-empty-icon">📭</div>
            <p>{emptyMsg}</p>
        </div>
    );

    return (
        <div>
            {leads.map(lead => (
                <div key={lead.id} onClick={() => onSelect(lead)} className="lead-row lead-row-hover">
                    {lead.status === 'New' && <div className="lead-new-indicator" />}
                    <div style={{ color: '#666', fontSize: '0.82rem' }}>
                        {lead.timestamp?.toDate ? lead.timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '-'}
                    </div>
                    <div style={{ fontWeight: 500, color: '#fff' }}>{lead.name}</div>
                    <div style={{ color: '#888', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {lead.type} • {lead.budget || lead.phone || 'Bilgi Yok'}
                    </div>
                    <div style={{ fontSize: '0.85rem' }}>
                        {lead.status === 'New'
                            ? <span className="admin-badge admin-badge-danger">Bekliyor</span>
                            : <span className="admin-badge admin-badge-success"><CheckCircle size={12} style={{ marginRight: 4 }} />Tamam</span>
                        }
                    </div>
                    <div style={{ textAlign: 'right', color: 'var(--admin-accent)', fontSize: '0.85rem', fontWeight: 500 }}>Detay →</div>
                </div>
            ))}
        </div>
    );
};

export default Dashboard;
