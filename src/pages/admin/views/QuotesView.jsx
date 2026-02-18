import React, { useState, useMemo } from 'react';
import { Plus, X, Trash2, Search, FileSignature } from 'lucide-react';
import { useFirestoreCRUD, useFirestoreList, showToast } from '../../../hooks/useFirestoreCRUD';
import { db } from '../../../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const STATUSES = ['Taslak', 'Gönderildi', 'Onaylandı', 'Reddedildi'];
const STATUS_COLORS = { Taslak: 'admin-badge-neutral', 'Gönderildi': 'admin-badge-info', 'Onaylandı': 'admin-badge-success', Reddedildi: 'admin-badge-danger' };

const QuotesView = () => {
    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState(null);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [form, setForm] = useState({ customerId: '', customerName: '', status: 'Taslak', currency: 'TRY', discount: 0, taxRate: 18, paymentPlan: 'Peşin', notes: '' });
    const [items, setItems] = useState([{ serviceId: '', name: '', quantity: 1, unitPrice: 0 }]);

    const filters = statusFilter !== 'all' ? [{ field: 'status', op: '==', value: statusFilter }] : [];
    const { items: quotes, loading, add, update, remove } = useFirestoreCRUD('quotes', { filters, pageSize: 50 });
    const customers = useFirestoreList('customers', 'companyName');
    const catalogServices = useFirestoreList('catalog_services', 'name');

    const displayed = search ? quotes.filter(q => q.customerName?.toLowerCase().includes(search.toLowerCase()) || q.quoteNumber?.toLowerCase().includes(search.toLowerCase())) : quotes;

    const totals = useMemo(() => {
        const subtotal = items.reduce((s, i) => s + (Number(i.quantity) || 0) * (Number(i.unitPrice) || 0), 0);
        const disc = subtotal * (Number(form.discount) || 0) / 100;
        const afterDisc = subtotal - disc;
        const tax = afterDisc * (Number(form.taxRate) || 0) / 100;
        return { subtotal, discount: disc, tax, grandTotal: afterDisc + tax };
    }, [items, form.discount, form.taxRate]);

    const fmt = (n, c = 'TRY') => {
        const sym = { TRY: '₺', EUR: '€', USD: '$' };
        return `${sym[c] || c}${Number(n || 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}`;
    };

    const genQuoteNum = () => `ZMK-${Date.now().toString(36).toUpperCase()}`;

    const openNew = () => {
        setForm({ customerId: '', customerName: '', status: 'Taslak', currency: 'TRY', discount: 0, taxRate: 18, paymentPlan: 'Peşin', notes: '' });
        setItems([{ serviceId: '', name: '', quantity: 1, unitPrice: 0 }]);
        setEditId(null);
        setShowModal(true);
    };

    const openEdit = (q) => {
        setForm({ customerId: q.customerId || '', customerName: q.customerName || '', status: q.status || 'Taslak', currency: q.currency || 'TRY', discount: q.discount || 0, taxRate: q.taxRate || 18, paymentPlan: q.paymentPlan || 'Peşin', notes: q.notes || '' });
        setItems(q.items?.length ? q.items : [{ serviceId: '', name: '', quantity: 1, unitPrice: 0 }]);
        setEditId(q.id);
        setShowModal(true);
    };

    const addItem = () => setItems(prev => [...prev, { serviceId: '', name: '', quantity: 1, unitPrice: 0 }]);
    const removeItem = (idx) => setItems(prev => prev.filter((_, i) => i !== idx));
    const updateItem = (idx, field, value) => {
        setItems(prev => prev.map((item, i) => {
            if (i !== idx) return item;
            const updated = { ...item, [field]: value };
            if (field === 'serviceId') {
                const svc = catalogServices.find(s => s.id === value);
                if (svc) { updated.name = svc.name; updated.unitPrice = svc.price || 0; }
            }
            return updated;
        }));
    };

    const selectCustomer = (e) => {
        const c = customers.find(x => x.id === e.target.value);
        setForm(f => ({ ...f, customerId: c?.id || '', customerName: c?.companyName || '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = { ...form, items, ...totals, quoteNumber: editId ? undefined : genQuoteNum() };
            if (data.quoteNumber === undefined) delete data.quoteNumber;
            if (editId) { await update(editId, data); showToast('Teklif güncellendi'); }
            else { await add(data); showToast('Teklif oluşturuldu'); }
            setShowModal(false);
        } catch { showToast('Hata oluştu', 'error'); }
    };

    const handleDelete = async (id) => {
        if (!confirm('Bu teklifi silmek istediğinize emin misiniz?')) return;
        try { await remove(id); showToast('Teklif silindi'); } catch { showToast('Hata', 'error'); }
    };

    const handleConvertToContract = async (quote) => {
        try {
            await addDoc(collection(db, 'contracts'), {
                quoteId: quote.id,
                customerId: quote.customerId,
                customerName: quote.customerName,
                contractNumber: `SZ-${Date.now().toString(36).toUpperCase()}`,
                scope: (quote.items || []).map(i => i.name).join(', '),
                amount: quote.grandTotal,
                currency: quote.currency || 'TRY',
                paymentPlan: quote.paymentPlan || 'Peşin',
                status: 'Taslak',
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            });
            await update(quote.id, { status: 'Onaylandı' });
            showToast('Sözleşme oluşturuldu');
        } catch { showToast('Hata oluştu', 'error'); }
    };

    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

    return (
        <>
            <div className="admin-header">
                <div><h1>Teklifler</h1><p className="admin-header-subtitle">{displayed.length} teklif</p></div>
                <button className="admin-btn admin-btn-primary" onClick={openNew}><Plus size={15} /> Yeni Teklif</button>
            </div>

            <div className="admin-toolbar">
                <div className="admin-search-bar"><Search size={15} color="#555" /><input placeholder="Teklif ara..." value={search} onChange={e => setSearch(e.target.value)} /></div>
                <select className="admin-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                    <option value="all">Tüm Durumlar</option>
                    {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
            </div>

            {loading ? <div className="admin-loading"><div className="admin-spinner" /> Yükleniyor...</div> : displayed.length === 0 ? (
                <div className="admin-empty"><div className="admin-empty-icon">📄</div><p>Henüz teklif yok</p></div>
            ) : (
                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead><tr><th>Teklif No</th><th>Müşteri</th><th>Tutar</th><th>Ödeme</th><th>Durum</th><th>Tarih</th><th style={{ width: 160 }}></th></tr></thead>
                        <tbody>
                            {displayed.map(q => (
                                <tr key={q.id}>
                                    <td style={{ color: 'var(--admin-accent)', fontWeight: 600 }}>{q.quoteNumber}</td>
                                    <td>{q.customerName || '-'}</td>
                                    <td style={{ fontWeight: 600 }}>{fmt(q.grandTotal, q.currency)}</td>
                                    <td><span className="admin-badge admin-badge-neutral">{q.paymentPlan || 'Peşin'}</span></td>
                                    <td><span className={`admin-badge ${STATUS_COLORS[q.status] || 'admin-badge-neutral'}`}>{q.status}</span></td>
                                    <td style={{ fontSize: '0.78rem', color: '#888' }}>{q.createdAt?.toDate ? q.createdAt.toDate().toLocaleDateString('tr-TR') : '-'}</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: 4 }}>
                                            <button className="admin-btn admin-btn-sm admin-btn-ghost" onClick={() => openEdit(q)}>Düzenle</button>
                                            {(q.status === 'Gönderildi' || q.status === 'Taslak') && (
                                                <button className="admin-btn admin-btn-sm admin-btn-success" onClick={() => handleConvertToContract(q)} title="Sözleşmeye Dönüştür"><FileSignature size={13} /></button>
                                            )}
                                            <button className="admin-btn admin-btn-sm admin-btn-danger" onClick={() => handleDelete(q.id)}><Trash2 size={13} /></button>
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
                    <div className="admin-modal admin-modal-wide">
                        <div className="admin-modal-header"><h3>{editId ? 'Teklif Düzenle' : 'Yeni Teklif'}</h3><button className="admin-btn-icon admin-btn-ghost" onClick={() => setShowModal(false)}><X size={18} /></button></div>
                        <form onSubmit={handleSubmit}>
                            <div className="admin-modal-body">
                                <div className="admin-form-row">
                                    <div className="admin-form-group"><label className="admin-label">Müşteri *</label>
                                        <select className="admin-select" required value={form.customerId} onChange={selectCustomer}>
                                            <option value="">Seçiniz</option>
                                            {customers.map(c => <option key={c.id} value={c.id}>{c.companyName}</option>)}
                                        </select>
                                    </div>
                                    <div className="admin-form-group"><label className="admin-label">Para Birimi</label>
                                        <select className="admin-select" value={form.currency} onChange={e => set('currency', e.target.value)}>
                                            <option value="TRY">₺ TRY</option><option value="EUR">€ EUR</option><option value="USD">$ USD</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Service Items */}
                                <div className="admin-form-group">
                                    <label className="admin-label">Hizmet Kalemleri</label>
                                    <table className="admin-items-table">
                                        <thead><tr><th>Hizmet</th><th style={{ width: 70 }}>Adet</th><th style={{ width: 120 }}>Birim Fiyat</th><th style={{ width: 100 }}>Toplam</th><th style={{ width: 40 }}></th></tr></thead>
                                        <tbody>
                                            {items.map((item, idx) => (
                                                <tr key={idx}>
                                                    <td>
                                                        <select value={item.serviceId} onChange={e => updateItem(idx, 'serviceId', e.target.value)}>
                                                            <option value="">Manuel giriş</option>
                                                            {catalogServices.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                                                        </select>
                                                        {!item.serviceId && <input placeholder="Hizmet adı" value={item.name} onChange={e => updateItem(idx, 'name', e.target.value)} style={{ marginTop: 4 }} />}
                                                    </td>
                                                    <td><input type="number" min="1" value={item.quantity} onChange={e => updateItem(idx, 'quantity', e.target.value)} /></td>
                                                    <td><input type="number" value={item.unitPrice} onChange={e => updateItem(idx, 'unitPrice', e.target.value)} /></td>
                                                    <td style={{ fontWeight: 600, padding: '6px 10px' }}>{fmt((item.quantity || 0) * (item.unitPrice || 0), form.currency)}</td>
                                                    <td><button type="button" className="admin-btn-icon admin-btn-ghost" onClick={() => removeItem(idx)}><X size={14} /></button></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <button type="button" className="admin-btn admin-btn-sm admin-btn-secondary" onClick={addItem} style={{ marginTop: 6 }}><Plus size={13} /> Kalem Ekle</button>
                                </div>

                                {/* Pricing */}
                                <div className="admin-form-row-3">
                                    <div className="admin-form-group"><label className="admin-label">İndirim (%)</label><input className="admin-input" type="number" min="0" max="100" value={form.discount} onChange={e => set('discount', e.target.value)} /></div>
                                    <div className="admin-form-group"><label className="admin-label">KDV (%)</label><input className="admin-input" type="number" value={form.taxRate} onChange={e => set('taxRate', e.target.value)} /></div>
                                    <div className="admin-form-group"><label className="admin-label">Ödeme Planı</label>
                                        <select className="admin-select" value={form.paymentPlan} onChange={e => set('paymentPlan', e.target.value)}>
                                            <option value="Peşin">Peşin</option><option value="2 Taksit">2 Taksit</option><option value="3 Taksit">3 Taksit</option><option value="Aylık">Aylık</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Totals Summary */}
                                <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 'var(--admin-radius-sm)', padding: '14px 18px', marginTop: 8 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', color: '#888', marginBottom: 4 }}><span>Ara Toplam</span><span>{fmt(totals.subtotal, form.currency)}</span></div>
                                    {Number(form.discount) > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', color: '#ef4444', marginBottom: 4 }}><span>İndirim ({form.discount}%)</span><span>-{fmt(totals.discount, form.currency)}</span></div>}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', color: '#888', marginBottom: 8 }}><span>KDV ({form.taxRate}%)</span><span>+{fmt(totals.tax, form.currency)}</span></div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 700, borderTop: '1px solid var(--admin-border)', paddingTop: 8 }}><span>Genel Toplam</span><span style={{ color: 'var(--admin-accent)' }}>{fmt(totals.grandTotal, form.currency)}</span></div>
                                </div>

                                <div className="admin-form-group" style={{ marginTop: 14 }}><label className="admin-label">Notlar</label><textarea className="admin-textarea" value={form.notes} onChange={e => set('notes', e.target.value)} /></div>
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

export default QuotesView;
