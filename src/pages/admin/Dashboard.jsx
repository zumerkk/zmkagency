import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Calendar, CheckCircle } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import AdminSidebar from '../../components/admin/AdminSidebar';
import LeadDetailModal from '../../components/admin/LeadDetailModal';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview'); // overview, all, quote, pricing, contact
    const [selectedLead, setSelectedLead] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                navigate('/login');
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    useEffect(() => {
        if (!user) return;

        const q = query(collection(db, 'leads'), orderBy('timestamp', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setLeads(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user]);

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/login');
    };

    const markAsContacted = async (id) => {
        const leadRef = doc(db, 'leads', id);
        await updateDoc(leadRef, { status: 'Contacted' });
        // Update local state smoothly (firestore listener will also update but this feels instant)
        if (selectedLead && selectedLead.id === id) {
            setSelectedLead(prev => ({ ...prev, status: 'Contacted' }));
        }
    };

    // Filtering Logic
    const filteredLeads = leads.filter(lead => {
        if (activeTab === 'overview') return false; // Overview handled separately
        if (activeTab === 'all') return true;
        if (activeTab === 'quote') return lead.type.includes('Quick Quote') || lead.type === 'Custom Quote';
        if (activeTab === 'pricing') return lead.type.includes('Pricing');
        if (activeTab === 'contact') return lead.type === 'Contact Form';
        return true;
    });

    // Stats
    const stats = {
        total: leads.length,
        new: leads.filter(l => l.status === 'New').length,
        contacted: leads.filter(l => l.status === 'Contacted').length,
        today: leads.filter(l => {
            if (!l.timestamp) return false;
            const d = l.timestamp.toDate();
            const today = new Date();
            return d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
        }).length
    };

    if (loading) return <div style={{ height: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>Yükleniyor...</div>;

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#000', color: '#f5f5f7', fontFamily: 'Inter, sans-serif' }}>

            <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />

            <div style={{ marginLeft: '260px', flex: 1, padding: '40px', overflowY: 'auto' }}>

                {/* Header */}
                <div style={{ marginBottom: '40px', paddingBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <h1 style={{ fontSize: '2rem', marginBottom: '10px' }}>
                        {activeTab === 'overview' ? 'Özet Durum' :
                            activeTab === 'all' ? 'Tüm Mesajlar' :
                                activeTab === 'quote' ? 'Hızlı Teklifler' :
                                    activeTab === 'pricing' ? 'Fiyat Talepleri' : 'Mesajlar'}
                    </h1>
                    <p style={{ color: '#666' }}>Yönetici Paneli • {user?.email}</p>
                </div>

                {/* OVERVIEW TAB */}
                {activeTab === 'overview' && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                        <StatCard label="Toplam Mesaj" value={stats.total} />
                        <StatCard label="Bugün Gelen" value={stats.today} color="#2997ff" />
                        <StatCard label="Bekleyen" value={stats.new} color="#ff4444" />
                        <StatCard label="Tamamlanan" value={stats.contacted} color="#00C851" />

                        <div style={{ gridColumn: 'span 4', marginTop: '40px' }}>
                            <h3 style={{ marginBottom: '20px', color: '#888' }}>Son Gelenler</h3>
                            <LeadsTable leads={leads.slice(0, 5)} onSelect={setSelectedLead} />
                        </div>
                    </div>
                )}

                {/* OTHER TABS */}
                {activeTab !== 'overview' && (
                    <LeadsTable leads={filteredLeads} onSelect={setSelectedLead} emptyMsg="Bu kategoride henüz mesaj yok." />
                )}

            </div>

            <AnimatePresence>
                {selectedLead && (
                    <LeadDetailModal
                        lead={selectedLead}
                        onClose={() => setSelectedLead(null)}
                        onMarkRead={markAsContacted}
                    />
                )}
            </AnimatePresence>

        </div>
    );
};

// Sub-components for cleaner code
const StatCard = ({ label, value, color = '#fff' }) => (
    <div style={{ background: '#111', padding: '25px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)' }}>
        <h4 style={{ color: '#666', fontSize: '0.9rem', marginBottom: '10px', fontWeight: 'normal' }}>{label}</h4>
        <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: 0, color: color }}>{value}</p>
    </div>
);

const LeadsTable = ({ leads, onSelect, emptyMsg = "Veri bulunamadı." }) => {
    if (leads.length === 0) return <div style={{ padding: '40px', textAlign: 'center', color: '#444', background: '#111', borderRadius: '15px' }}>{emptyMsg}</div>;

    return (
        <div style={{ width: '100%', borderCollapse: 'collapse' }}>
            {leads.map(lead => (
                <div
                    key={lead.id}
                    onClick={() => onSelect(lead)}
                    className="lead-row-hover"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '80px 1.5fr 1.5fr 1fr 100px',
                        alignItems: 'center',
                        padding: '20px',
                        background: '#0a0a0a',
                        marginBottom: '10px',
                        borderRadius: '12px',
                        border: '1px solid rgba(255,255,255,0.03)',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    {lead.status === 'New' && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: '#ff4444' }}></div>}

                    <div style={{ color: '#666', fontSize: '0.85rem' }}>
                        {lead.timestamp?.toDate ? lead.timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '-'}
                    </div>
                    <div style={{ fontWeight: '500', color: '#fff' }}>{lead.name}</div>
                    <div style={{ color: '#888', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '90%' }}>
                        {lead.type} • {lead.budget || 'Plan Yok'}
                    </div>
                    <div style={{ color: '#888', fontSize: '0.9rem' }}>
                        {lead.status === 'New' ? <span style={{ color: '#ff4444' }}>Bekliyor</span> : <span style={{ color: '#00C851', display: 'flex', alignItems: 'center', gap: '5px' }}><CheckCircle size={14} /> Tamam</span>}
                    </div>
                    <div style={{ textAlign: 'right', color: '#2997ff', fontSize: '0.9rem' }}>Detay →</div>
                </div>
            ))}
        </div>
    );
}

export default Dashboard;
