import React, { useState } from 'react';
import { Search, Edit3, Trash2, X } from 'lucide-react';
import { useFirestoreCRUD, showToast } from '../../../hooks/useFirestoreCRUD';

const STATUSES = ['Taslak', 'İmzalandı', 'Süresi Doldu', 'İptal'];
const STATUS_COLORS = { Taslak: 'admin-badge-neutral', 'İmzalandı': 'admin-badge-success', 'Süresi Doldu': 'admin-badge-warning', 'İptal': 'admin-badge-danger' };

const ContractsView = () => {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState({ customerName: '', contractNumber: '', scope: '', amount: '', currency: 'TRY', paymentPlan: 'Peşin', status: 'Taslak', notes: '' });

    const filters = statusFilter !== 'all' ? [{ field: 'status', op: '==', value: statusFilter }] : [];
    const { items: contracts, loading, update, remove } = useFirestoreCRUD('contracts', { filters, pageSize: 50 });

    const displayed = search ? contracts.filter(c => c.customerName?.toLowerCase().includes(search.toLowerCase()) || c.contractNumber?.toLowerCase().includes(search.toLowerCase())) : contracts;

    const fmt = (n, c = 'TRY') => {
        const sym = { TRY: '₺', EUR: '€', USD: '$' };
        return `${sym[c] || c}${Number(n || 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}`;
    };

    const openEdit = (c) => {
        setForm({ customerName: c.customerName || '', contractNumber: c.contractNumber || '', scope: c.scope || '', amount: c.amount || '', currency: c.currency || 'TRY', paymentPlan: c.paymentPlan || 'Peşin', status: c.status || 'Taslak', notes: c.notes || '' });
        setEditId(c.id); setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await update(editId, { ...form, amount: Number(form.amount) || 0 });
            showToast('Sözleşme güncellendi');
            setShowModal(false);
        } catch { showToast('Hata oluştu', 'error'); }
    };

    const handleDelete = async (id) => {
        if (!confirm('Bu sözleşmeyi silmek istediğinize emin misiniz?')) return;
        try { await remove(id); showToast('Sözleşme silindi'); } catch { showToast('Hata', 'error'); }
    };

    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

    return (
        <>
            <div className="admin-header">
                <div><h1>Sözleşmeler</h1><p className="admin-header-subtitle">{displayed.length} sözleşme</p></div>
            </div>

            <div className="admin-toolbar">
                <div className="admin-search-bar"><Search size={15} color="#555" /><input placeholder="Sözleşme ara..." value={search} onChange={e => setSearch(e.target.value)} /></div>
                <select className="admin-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                    <option value="all">Tüm Durumlar</option>
                    {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
            </div>

            {loading ? <div className="admin-loading"><div className="admin-spinner" /> Yükleniyor...</div> : displayed.length === 0 ? (
                <div className="admin-empty">
                    <div className="admin-empty-icon">📜</div>
                    <p>Henüz sözleşme yok</p>
                    <p style={{ fontSize: '0.78rem', color: '#555', marginTop: 4 }}>Teklifler sayfasından bir teklifi sözleşmeye dönüştürebilirsiniz.</p>
                </div>
            ) : (
                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead><tr><th>Sözleşme No</th><th>Müşteri</th><th>Kapsam</th><th>Tutar</th><th>Ödeme</th><th>Durum</th><th>Tarih</th><th style={{ width: 100 }}></th></tr></thead>
                        <tbody>
                            {displayed.map(c => (
                                <tr key={c.id}>
                                    <td style={{ color: 'var(--admin-accent)', fontWeight: 600 }}>{c.contractNumber}</td>
                                    <td>{c.customerName}</td>
                                    <td style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.scope || '-'}</td>
                                    <td style={{ fontWeight: 600 }}>{fmt(c.amount, c.currency)}</td>
                                    <td><span className="admin-badge admin-badge-neutral">{c.paymentPlan || '-'}</span></td>
                                    <td><span className={`admin-badge ${STATUS_COLORS[c.status] || 'admin-badge-neutral'}`}>{c.status}</span></td>
                                    <td style={{ fontSize: '0.78rem', color: '#888' }}>{c.createdAt?.toDate ? c.createdAt.toDate().toLocaleDateString('tr-TR') : '-'}</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: 4 }}>
                                            <button className="admin-btn admin-btn-sm admin-btn-ghost" onClick={() => openEdit(c)}><Edit3 size={14} /></button>
                                            <button className="admin-btn admin-btn-sm admin-btn-danger" onClick={() => handleDelete(c.id)}><Trash2 size={14} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {showModal && (
                <div className="admin-modal-overlay" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
                    <div className="admin-modal">
                        <div className="admin-modal-header"><h3>Sözleşme Düzenle</h3><button className="admin-btn-icon admin-btn-ghost" onClick={() => setShowModal(false)}><X size={18} /></button></div>
                        <form onSubmit={handleSubmit}>
                            <div className="admin-modal-body">
                                <div className="admin-form-group"><label className="admin-label">Sözleşme No</label><input className="admin-input" value={form.contractNumber} disabled style={{ opacity: 0.6 }} /></div>
                                <div className="admin-form-group"><label className="admin-label">Müşteri</label><input className="admin-input" value={form.customerName} disabled style={{ opacity: 0.6 }} /></div>
                                <div className="admin-form-group"><label className="admin-label">Kapsam</label><textarea className="admin-textarea" value={form.scope} onChange={e => set('scope', e.target.value)} /></div>
                                <div className="admin-form-row">
                                    <div className="admin-form-group"><label className="admin-label">Tutar</label><input className="admin-input" type="number" value={form.amount} onChange={e => set('amount', e.target.value)} /></div>
                                    <div className="admin-form-group"><label className="admin-label">Para Birimi</label>
                                        <select className="admin-select" value={form.currency} onChange={e => set('currency', e.target.value)}><option value="TRY">₺ TRY</option><option value="EUR">€ EUR</option><option value="USD">$ USD</option></select>
                                    </div>
                                </div>
                                <div className="admin-form-row">
                                    <div className="admin-form-group"><label className="admin-label">Ödeme Planı</label>
                                        <select className="admin-select" value={form.paymentPlan} onChange={e => set('paymentPlan', e.target.value)}><option value="Peşin">Peşin</option><option value="2 Taksit">2 Taksit</option><option value="3 Taksit">3 Taksit</option><option value="Aylık">Aylık</option></select>
                                    </div>
                                    <div className="admin-form-group"><label className="admin-label">Durum</label>
                                        <select className="admin-select" value={form.status} onChange={e => set('status', e.target.value)}>
                                            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="admin-form-group"><label className="admin-label">Notlar</label><textarea className="admin-textarea" value={form.notes} onChange={e => set('notes', e.target.value)} /></div>
                            </div>
                            <div className="admin-modal-footer">
                                <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setShowModal(false)}>İptal</button>
                                <button type="submit" className="admin-btn admin-btn-primary">Güncelle</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default ContractsView;
