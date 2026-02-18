import React, { useMemo } from 'react';
import { Users, FolderKanban, FileText, CreditCard, AlertTriangle, Clock, CheckCircle } from 'lucide-react';
import { useFirestoreCRUD } from '../../../hooks/useFirestoreCRUD';

const DashboardView = () => {
    const { items: customers, loading: l1 } = useFirestoreCRUD('customers', { pageSize: 100 });
    const { items: projects, loading: l2 } = useFirestoreCRUD('projects', { pageSize: 100 });
    const { items: quotes, loading: l3 } = useFirestoreCRUD('quotes', { pageSize: 100 });
    const { items: payments, loading: l4 } = useFirestoreCRUD('payments', { pageSize: 100 });

    const loading = l1 || l2 || l3 || l4;

    const stats = useMemo(() => {
        const activeProjects = projects.filter(p => p.status === 'Devam Ediyor' || p.status === 'Başladı').length;
        const pendingQuotes = quotes.filter(q => q.status === 'Taslak' || q.status === 'Gönderildi').length;
        const totalReceivable = payments.filter(p => p.status !== 'Ödendi').reduce((s, p) => s + (Number(p.amount) || 0), 0);
        const totalReceived = payments.filter(p => p.status === 'Ödendi').reduce((s, p) => s + (Number(p.amount) || 0), 0);
        const overduePayments = payments.filter(p => p.status === 'Gecikti' || (p.status === 'Bekliyor' && p.dueDate && new Date(p.dueDate) < new Date()));
        return { totalClients: customers.length, activeProjects, pendingQuotes, totalReceivable, totalReceived, overdueCount: overduePayments.length, overduePayments };
    }, [customers, projects, quotes, payments]);

    const fmt = (n) => `₺${Number(n || 0).toLocaleString('tr-TR', { minimumFractionDigits: 0 })}`;

    if (loading) return <div className="admin-loading"><div className="admin-spinner" /> Yükleniyor...</div>;

    return (
        <>
            <div className="admin-header">
                <div>
                    <h1>Gösterge Paneli</h1>
                    <p className="admin-header-subtitle">ZMK Agency CRM</p>
                </div>
            </div>

            <div className="admin-stat-grid">
                <div className="admin-stat-card">
                    <div className="stat-label"><Users size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} />Toplam Müşteri</div>
                    <div className="stat-value">{stats.totalClients}</div>
                </div>
                <div className="admin-stat-card">
                    <div className="stat-label"><FolderKanban size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} />Aktif Proje</div>
                    <div className="stat-value accent">{stats.activeProjects}</div>
                </div>
                <div className="admin-stat-card">
                    <div className="stat-label"><CreditCard size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} />Bekleyen Tahsilat</div>
                    <div className="stat-value warning">{fmt(stats.totalReceivable)}</div>
                </div>
                <div className="admin-stat-card">
                    <div className="stat-label"><AlertTriangle size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} />Geciken</div>
                    <div className="stat-value danger">{stats.overdueCount}</div>
                </div>
                <div className="admin-stat-card">
                    <div className="stat-label"><CheckCircle size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} />Tahsil Edilen</div>
                    <div className="stat-value success">{fmt(stats.totalReceived)}</div>
                </div>
                <div className="admin-stat-card">
                    <div className="stat-label"><FileText size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} />Bekleyen Teklif</div>
                    <div className="stat-value info">{stats.pendingQuotes}</div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {/* Overdue Payments */}
                <div className="admin-table-wrapper">
                    <div className="admin-table-header">
                        <h3><Clock size={15} style={{ marginRight: 5, verticalAlign: 'middle' }} /> Vade Uyarıları</h3>
                    </div>
                    <div style={{ padding: '14px' }}>
                        {stats.overduePayments.length === 0 ? (
                            <div className="admin-empty" style={{ padding: '20px' }}>Yaklaşan vade yok ✓</div>
                        ) : (
                            <div className="admin-alert-list">
                                {stats.overduePayments.slice(0, 5).map((p, i) => (
                                    <div key={i} className="admin-alert-item danger">
                                        <AlertTriangle size={15} />
                                        <div>
                                            <strong>{p.customerName}</strong>
                                            <div style={{ fontSize: '0.72rem', color: '#888' }}>
                                                Vade: {p.dueDate ? new Date(p.dueDate).toLocaleDateString('tr-TR') : '-'}
                                            </div>
                                        </div>
                                        <span className="alert-amount" style={{ color: '#ef4444' }}>{fmt(p.amount)}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Recent Customers */}
                <div className="admin-table-wrapper">
                    <div className="admin-table-header">
                        <h3><Users size={15} style={{ marginRight: 5, verticalAlign: 'middle' }} /> Son Müşteriler</h3>
                    </div>
                    <table className="admin-table">
                        <thead><tr><th>Firma</th><th>Sektör</th><th>Durum</th></tr></thead>
                        <tbody>
                            {customers.slice(0, 5).map(c => (
                                <tr key={c.id}>
                                    <td><strong>{c.companyName}</strong></td>
                                    <td>{c.sector || '-'}</td>
                                    <td>
                                        <span className={`admin-badge ${c.status === 'Aktif' ? 'admin-badge-success' : c.status === 'Potansiyel' ? 'admin-badge-warning' : 'admin-badge-neutral'}`}>
                                            {c.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {customers.length === 0 && <tr><td colSpan={3} style={{ textAlign: 'center', color: '#555' }}>Henüz müşteri yok</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default DashboardView;
