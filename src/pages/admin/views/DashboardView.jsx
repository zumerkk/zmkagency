import React, { useEffect, useState } from 'react';
import { Users, Briefcase, FileText, CreditCard, AlertTriangle, TrendingUp, Clock } from 'lucide-react';

const DashboardView = ({ api, onViewClient }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/dashboard').then(setData).catch(console.error).finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="admin-loading"><div className="admin-spinner" /> Yükleniyor...</div>;
    if (!data) return <div className="admin-empty">Veriler yüklenemedi.</div>;

    const { stats, overduePayments, upcomingPayments, recentClients, recentQuotes } = data;

    const formatCurrency = (amount) => `₺${Number(amount || 0).toLocaleString('tr-TR', { minimumFractionDigits: 0 })}`;

    return (
        <>
            <div className="admin-header">
                <div>
                    <h1>Gösterge Paneli</h1>
                    <p className="admin-header-subtitle">ZMK Agency Yönetim Merkezi</p>
                </div>
            </div>

            {/* Stats */}
            <div className="admin-stat-grid">
                <div className="admin-stat-card">
                    <div className="stat-label"><Users size={14} style={{ marginRight: 5, verticalAlign: 'middle' }} />Toplam Müşteri</div>
                    <div className="stat-value">{stats.totalClients}</div>
                </div>
                <div className="admin-stat-card">
                    <div className="stat-label"><Briefcase size={14} style={{ marginRight: 5, verticalAlign: 'middle' }} />Aktif Proje</div>
                    <div className="stat-value accent">{stats.activeProjects}</div>
                </div>
                <div className="admin-stat-card">
                    <div className="stat-label"><CreditCard size={14} style={{ marginRight: 5, verticalAlign: 'middle' }} />Bekleyen Tahsilat</div>
                    <div className="stat-value warning">{formatCurrency(stats.totalReceivable)}</div>
                </div>
                <div className="admin-stat-card">
                    <div className="stat-label"><AlertTriangle size={14} style={{ marginRight: 5, verticalAlign: 'middle' }} />Geciken</div>
                    <div className="stat-value danger">{stats.overdueCount}</div>
                </div>
                <div className="admin-stat-card">
                    <div className="stat-label"><TrendingUp size={14} style={{ marginRight: 5, verticalAlign: 'middle' }} />Tahsil Edilen</div>
                    <div className="stat-value success">{formatCurrency(stats.totalReceived)}</div>
                </div>
                <div className="admin-stat-card">
                    <div className="stat-label"><FileText size={14} style={{ marginRight: 5, verticalAlign: 'middle' }} />Bekleyen Teklif</div>
                    <div className="stat-value info">{stats.pendingQuotes}</div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {/* Overdue + Upcoming */}
                <div className="admin-table-wrapper">
                    <div className="admin-table-header">
                        <h3><Clock size={16} style={{ marginRight: 6, verticalAlign: 'middle' }} /> Vade Uyarıları</h3>
                    </div>
                    <div style={{ padding: '16px' }}>
                        {overduePayments.length === 0 && upcomingPayments.length === 0 ? (
                            <div className="admin-empty" style={{ padding: '20px' }}>Yaklaşan vade yok ✓</div>
                        ) : (
                            <div className="admin-alert-list">
                                {overduePayments.map((p, i) => (
                                    <div key={`o-${i}`} className="admin-alert-item danger">
                                        <AlertTriangle size={16} />
                                        <div>
                                            <strong>{p.clientName}</strong>
                                            <div style={{ fontSize: '0.75rem', color: '#888' }}>Vade: {new Date(p.dueDate).toLocaleDateString('tr-TR')}</div>
                                        </div>
                                        <span className="alert-amount" style={{ color: '#ef4444' }}>{formatCurrency(p.amount)}</span>
                                    </div>
                                ))}
                                {upcomingPayments.map((p, i) => (
                                    <div key={`u-${i}`} className="admin-alert-item">
                                        <Clock size={16} />
                                        <div>
                                            <strong>{p.clientName}</strong>
                                            <div style={{ fontSize: '0.75rem', color: '#888' }}>Vade: {new Date(p.dueDate).toLocaleDateString('tr-TR')}</div>
                                        </div>
                                        <span className="alert-amount">{formatCurrency(p.amount)}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Recent Clients */}
                <div className="admin-table-wrapper">
                    <div className="admin-table-header">
                        <h3><Users size={16} style={{ marginRight: 6, verticalAlign: 'middle' }} /> Son Müşteriler</h3>
                    </div>
                    <table className="admin-table">
                        <thead>
                            <tr><th>Firma</th><th>Sektör</th><th>Durum</th></tr>
                        </thead>
                        <tbody>
                            {(recentClients || []).map(c => (
                                <tr key={c.id} className="clickable-row" onClick={() => onViewClient(c.id)}>
                                    <td><strong>{c.companyName}</strong></td>
                                    <td>{c.sector || '-'}</td>
                                    <td>
                                        <span className={`admin-badge ${c.status === 'Aktif' ? 'admin-badge-success' : c.status === 'Potansiyel' ? 'admin-badge-warning' : 'admin-badge-neutral'}`}>
                                            {c.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Recent Quotes */}
            {recentQuotes && recentQuotes.length > 0 && (
                <div className="admin-table-wrapper" style={{ marginTop: '20px' }}>
                    <div className="admin-table-header">
                        <h3><FileText size={16} style={{ marginRight: 6, verticalAlign: 'middle' }} /> Son Teklifler</h3>
                    </div>
                    <table className="admin-table">
                        <thead>
                            <tr><th>Teklif No</th><th>Müşteri</th><th>Tutar</th><th>Durum</th></tr>
                        </thead>
                        <tbody>
                            {recentQuotes.map(q => (
                                <tr key={q.id}>
                                    <td style={{ color: '#dc2626', fontWeight: 600 }}>{q.quoteNumber}</td>
                                    <td>{q.clientName}</td>
                                    <td>{formatCurrency(q.grandTotal)}</td>
                                    <td>
                                        <span className={`admin-badge ${q.status === 'Kabul Edildi' ? 'admin-badge-success' : q.status === 'Reddedildi' ? 'admin-badge-danger' : 'admin-badge-info'}`}>
                                            {q.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default DashboardView;
