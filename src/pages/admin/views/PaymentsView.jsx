import React, { useState, useMemo } from 'react';
import { Plus, X, Search, Trash2, Edit3, Check, AlertTriangle } from 'lucide-react';
import { useFirestoreCRUD, useFirestoreList, showToast } from '../../../hooks/useFirestoreCRUD';

const STATUSES = ['Bekliyor', 'Ödendi', 'Gecikti'];
const METHODS = ['Havale/EFT', 'Kredi Kartı', 'Nakit', 'Diğer'];
const STATUS_COLORS = { Bekliyor: 'admin-badge-warning', 'Ödendi': 'admin-badge-success', Gecikti: 'admin-badge-danger' };

const PaymentsView = () => {
    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState(null);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [form, setForm] = useState({ customerId: '', customerName: '', projectId: '', contractId: '', amount: '', currency: 'TRY', method: 'Havale/EFT', dueDate: '', paidDate: '', status: 'Bekliyor', notes: '' });

    const filters = statusFilter !== 'all' ? [{ field: 'status', op: '==', value: statusFilter }] : [];
    const { items: payments, loading, add, update, remove } = useFirestoreCRUD('payments', { filters, pageSize: 50 });
    const customers = useFirestoreList('customers', 'companyName');

    const displayed = search ? payments.filter(p => p.customerName?.toLowerCase().includes(search.toLowerCase())) : payments;

    const summary = useMemo(() => {
        const total = payments.reduce((s, p) => s + (Number(p.amount) || 0), 0);
        const paid = payments.filter(p => p.status === 'Ödendi').reduce((s, p) => s + (Number(p.amount) || 0), 0);
        const pending = payments.filter(p => p.status === 'Bekliyor').reduce((s, p) => s + (Number(p.amount) || 0), 0);
        const overdue = payments.filter(p => p.status === 'Gecikti').reduce((s, p) => s + (Number(p.amount) || 0), 0);
        return { total, paid, pending, overdue };
    }, [payments]);

    const fmt = (n, c = 'TRY') => {
        const sym = { TRY: '₺', EUR: '€', USD: '$' };
        return `${sym[c] || c}${Number(n || 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}`;
    };

    const openNew = () => { setForm({ customerId: '', customerName: '', projectId: '', contractId: '', amount: '', currency: 'TRY', method: 'Havale/EFT', dueDate: '', paidDate: '', status: 'Bekliyor', notes: '' }); setEditId(null); setShowModal(true); };

    const openEdit = (p) => {
        setForm({ customerId: p.customerId || '', customerName: p.customerName || '', projectId: p.projectId || '', contractId: p.contractId || '', amount: p.amount || '', currency: p.currency || 'TRY', method: p.method || 'Havale/EFT', dueDate: p.dueDate || '', paidDate: p.paidDate || '', status: p.status || 'Bekliyor', notes: p.notes || '' });
        setEditId(p.id); setShowModal(true);
    };

    const selectCustomer = (e) => {
        const c = customers.find(x => x.id === e.target.value);
        setForm(f => ({ ...f, customerId: c?.id || '', customerName: c?.companyName || '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = { ...form, amount: Number(form.amount) || 0 };
            if (editId) { await update(editId, data); showToast('Ödeme güncellendi'); }
            else { await add(data); showToast('Ödeme kaydedildi'); }
            setShowModal(false);
        } catch { showToast('Hata oluştu', 'error'); }
    };

    const markPaid = async (id) => {
        try {
            await update(id, { status: 'Ödendi', paidDate: new Date().toISOString().split('T')[0] });
            showToast('Ödeme tamamlandı');
        } catch { showToast('Hata', 'error'); }
    };

    const handleDelete = async (id) => {
        if (!confirm('Bu ödeme kaydını silmek istediğinize emin misiniz?')) return;
        try { await remove(id); showToast('Ödeme silindi'); } catch { showToast('Hata', 'error'); }
    };

    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

    return (
        <>
            <div className="admin-header">
                <div><h1>Ödemeler & Tahsilat</h1><p className="admin-header-subtitle">{displayed.length} kayıt</p></div>
                <button className="admin-btn admin-btn-primary" onClick={openNew}><Plus size={15} /> Yeni Ödeme</button>
            </div>

            {/* Summary cards */}
            <div className="admin-stat-grid">
                <div className="admin-stat-card"><div className="stat-label">Toplam</div><div className="stat-value">{fmt(summary.total)}</div></div>
                <div className="admin-stat-card"><div className="stat-label">Tahsil Edilen</div><div className="stat-value success">{fmt(summary.paid)}</div></div>
                <div className="admin-stat-card"><div className="stat-label">Bekleyen</div><div className="stat-value warning">{fmt(summary.pending)}</div></div>
                <div className="admin-stat-card"><div className="stat-label">Geciken</div><div className="stat-value danger">{fmt(summary.overdue)}</div></div>
            </div>

            <div className="admin-toolbar">
                <div className="admin-search-bar"><Search size={15} color="#555" /><input placeholder="Ödeme ara..." value={search} onChange={e => setSearch(e.target.value)} /></div>
                <select className="admin-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                    <option value="all">Tüm Durumlar</option>
                    {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
            </div>

            {loading ? <div className="admin-loading"><div className="admin-spinner" /> Yükleniyor...</div> : displayed.length === 0 ? (
                <div className="admin-empty"><div className="admin-empty-icon">💳</div><p>Henüz ödeme kaydı yok</p></div>
            ) : (
                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead><tr><th>Müşteri</th><th>Tutar</th><th>Yöntem</th><th>Vade</th><th>Ödeme Tarihi</th><th>Durum</th><th style={{ width: 140 }}></th></tr></thead>
                        <tbody>
                            {displayed.map(p => (
                                <tr key={p.id}>
                                    <td><strong>{p.customerName || '-'}</strong></td>
                                    <td style={{ fontWeight: 600 }}>{fmt(p.amount, p.currency)}</td>
                                    <td><span className="admin-badge admin-badge-neutral">{p.method || '-'}</span></td>
                                    <td style={{ fontSize: '0.8rem', color: '#888' }}>{p.dueDate || '-'}</td>
                                    <td style={{ fontSize: '0.8rem', color: '#888' }}>{p.paidDate || '-'}</td>
                                    <td><span className={`admin-badge ${STATUS_COLORS[p.status] || 'admin-badge-neutral'}`}>{p.status === 'Gecikti' && <AlertTriangle size={11} style={{ marginRight: 3 }} />}{p.status}</span></td>
                                    <td>
                                        <div style={{ display: 'flex', gap: 4 }}>
                                            {p.status !== 'Ödendi' && (
                                                <button className="admin-btn admin-btn-sm admin-btn-success" onClick={() => markPaid(p.id)} title="Ödendi"><Check size={13} /></button>
                                            )}
                                            <button className="admin-btn admin-btn-sm admin-btn-ghost" onClick={() => openEdit(p)}><Edit3 size={14} /></button>
                                            <button className="admin-btn admin-btn-sm admin-btn-danger" onClick={() => handleDelete(p.id)}><Trash2 size={13} /></button>
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
                        <div className="admin-modal-header"><h3>{editId ? 'Ödeme Düzenle' : 'Yeni Ödeme'}</h3><button className="admin-btn-icon admin-btn-ghost" onClick={() => setShowModal(false)}><X size={18} /></button></div>
                        <form onSubmit={handleSubmit}>
                            <div className="admin-modal-body">
                                <div className="admin-form-group"><label className="admin-label">Müşteri *</label>
                                    <select className="admin-select" required value={form.customerId} onChange={selectCustomer}>
                                        <option value="">Seçiniz</option>
                                        {customers.map(c => <option key={c.id} value={c.id}>{c.companyName}</option>)}
                                    </select>
                                </div>
                                <div className="admin-form-row">
                                    <div className="admin-form-group"><label className="admin-label">Tutar *</label><input className="admin-input" type="number" required value={form.amount} onChange={e => set('amount', e.target.value)} /></div>
                                    <div className="admin-form-group"><label className="admin-label">Para Birimi</label>
                                        <select className="admin-select" value={form.currency} onChange={e => set('currency', e.target.value)}><option value="TRY">₺ TRY</option><option value="EUR">€ EUR</option><option value="USD">$ USD</option></select>
                                    </div>
                                </div>
                                <div className="admin-form-row">
                                    <div className="admin-form-group"><label className="admin-label">Yöntem</label>
                                        <select className="admin-select" value={form.method} onChange={e => set('method', e.target.value)}>
                                            {METHODS.map(m => <option key={m} value={m}>{m}</option>)}
                                        </select>
                                    </div>
                                    <div className="admin-form-group"><label className="admin-label">Durum</label>
                                        <select className="admin-select" value={form.status} onChange={e => set('status', e.target.value)}>
                                            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="admin-form-row">
                                    <div className="admin-form-group"><label className="admin-label">Vade Tarihi</label><input className="admin-input" type="date" value={form.dueDate} onChange={e => set('dueDate', e.target.value)} /></div>
                                    <div className="admin-form-group"><label className="admin-label">Ödeme Tarihi</label><input className="admin-input" type="date" value={form.paidDate} onChange={e => set('paidDate', e.target.value)} /></div>
                                </div>
                                <div className="admin-form-group"><label className="admin-label">Notlar</label><textarea className="admin-textarea" value={form.notes} onChange={e => set('notes', e.target.value)} /></div>
                            </div>
                            <div className="admin-modal-footer">
                                <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setShowModal(false)}>İptal</button>
                                <button type="submit" className="admin-btn admin-btn-primary">{editId ? 'Güncelle' : 'Kaydet'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default PaymentsView;
