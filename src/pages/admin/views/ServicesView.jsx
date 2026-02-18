import React, { useState } from 'react';
import { Plus, Edit3, Trash2, X, Search } from 'lucide-react';
import { useFirestoreCRUD, showToast } from '../../../hooks/useFirestoreCRUD';

const EMPTY = { name: '', description: '', category: 'Web Geliştirme', priceType: 'Tek Seferlik', price: '', currency: 'TRY', scope: '', sla: '' };
const CATEGORIES = ['Web Geliştirme', 'Mobil Uygulama', 'SEO', 'Sosyal Medya', 'Logo & Tasarım', 'Video & Animasyon', 'E-Ticaret', 'Danışmanlık', 'Diğer'];

const ServicesView = () => {
    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState(EMPTY);
    const [search, setSearch] = useState('');
    const [catFilter, setCatFilter] = useState('all');

    const filters = catFilter !== 'all' ? [{ field: 'category', op: '==', value: catFilter }] : [];
    const { items: services, loading, add, update, remove } = useFirestoreCRUD('catalog_services', { filters, pageSize: 50 });

    const displayed = search ? services.filter(s => s.name?.toLowerCase().includes(search.toLowerCase())) : services;

    const openNew = () => { setForm(EMPTY); setEditId(null); setShowModal(true); };
    const openEdit = (s) => {
        setForm({ name: s.name || '', description: s.description || '', category: s.category || 'Web Geliştirme', priceType: s.priceType || 'Tek Seferlik', price: s.price || '', currency: s.currency || 'TRY', scope: s.scope || '', sla: s.sla || '' });
        setEditId(s.id); setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = { ...form, price: Number(form.price) || 0 };
            if (editId) { await update(editId, data); showToast('Hizmet güncellendi'); }
            else { await add(data); showToast('Hizmet eklendi'); }
            setShowModal(false);
        } catch { showToast('Hata oluştu', 'error'); }
    };

    const handleDelete = async (id) => {
        if (!confirm('Bu hizmeti silmek istediğinize emin misiniz?')) return;
        try { await remove(id); showToast('Hizmet silindi'); } catch { showToast('Hata', 'error'); }
    };

    const fmtPrice = (p, c = 'TRY') => {
        const sym = { TRY: '₺', EUR: '€', USD: '$' };
        return `${sym[c] || c}${Number(p || 0).toLocaleString('tr-TR')}`;
    };

    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

    return (
        <>
            <div className="admin-header">
                <div><h1>Hizmet Kataloğu</h1><p className="admin-header-subtitle">{displayed.length} hizmet</p></div>
                <button className="admin-btn admin-btn-primary" onClick={openNew}><Plus size={15} /> Yeni Hizmet</button>
            </div>

            <div className="admin-toolbar">
                <div className="admin-search-bar"><Search size={15} color="#555" /><input placeholder="Hizmet ara..." value={search} onChange={e => setSearch(e.target.value)} /></div>
                <select className="admin-select" value={catFilter} onChange={e => setCatFilter(e.target.value)}>
                    <option value="all">Tüm Kategoriler</option>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>

            {loading ? <div className="admin-loading"><div className="admin-spinner" /> Yükleniyor...</div> : displayed.length === 0 ? (
                <div className="admin-empty"><div className="admin-empty-icon">📦</div><p>Henüz hizmet eklenmemiş</p></div>
            ) : (
                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead><tr><th>Hizmet</th><th>Kategori</th><th>Fiyat Tipi</th><th>Fiyat</th><th style={{ width: 100 }}></th></tr></thead>
                        <tbody>
                            {displayed.map(s => (
                                <tr key={s.id}>
                                    <td><strong>{s.name}</strong>{s.description && <div style={{ fontSize: '0.75rem', color: '#666', marginTop: 2 }}>{s.description.substring(0, 60)}{s.description.length > 60 ? '...' : ''}</div>}</td>
                                    <td><span className="admin-badge admin-badge-info">{s.category}</span></td>
                                    <td><span className="admin-badge admin-badge-neutral">{s.priceType}</span></td>
                                    <td style={{ fontWeight: 600 }}>{fmtPrice(s.price, s.currency)}</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: 4 }}>
                                            <button className="admin-btn admin-btn-sm admin-btn-ghost" onClick={() => openEdit(s)}><Edit3 size={14} /></button>
                                            <button className="admin-btn admin-btn-sm admin-btn-danger" onClick={() => handleDelete(s.id)}><Trash2 size={14} /></button>
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
                        <div className="admin-modal-header"><h3>{editId ? 'Hizmet Düzenle' : 'Yeni Hizmet'}</h3><button className="admin-btn-icon admin-btn-ghost" onClick={() => setShowModal(false)}><X size={18} /></button></div>
                        <form onSubmit={handleSubmit}>
                            <div className="admin-modal-body">
                                <div className="admin-form-group"><label className="admin-label">Hizmet Adı *</label><input className="admin-input" required value={form.name} onChange={e => set('name', e.target.value)} /></div>
                                <div className="admin-form-group"><label className="admin-label">Açıklama</label><textarea className="admin-textarea" value={form.description} onChange={e => set('description', e.target.value)} /></div>
                                <div className="admin-form-row">
                                    <div className="admin-form-group"><label className="admin-label">Kategori</label>
                                        <select className="admin-select" value={form.category} onChange={e => set('category', e.target.value)}>
                                            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </div>
                                    <div className="admin-form-group"><label className="admin-label">Fiyat Tipi</label>
                                        <select className="admin-select" value={form.priceType} onChange={e => set('priceType', e.target.value)}>
                                            <option value="Tek Seferlik">Tek Seferlik</option><option value="Aylık">Aylık</option><option value="Yıllık">Yıllık</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="admin-form-row">
                                    <div className="admin-form-group"><label className="admin-label">Fiyat</label><input className="admin-input" type="number" value={form.price} onChange={e => set('price', e.target.value)} /></div>
                                    <div className="admin-form-group"><label className="admin-label">Para Birimi</label>
                                        <select className="admin-select" value={form.currency} onChange={e => set('currency', e.target.value)}>
                                            <option value="TRY">₺ TRY</option><option value="EUR">€ EUR</option><option value="USD">$ USD</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="admin-form-group"><label className="admin-label">Teslim Kapsamı</label><textarea className="admin-textarea" value={form.scope} onChange={e => set('scope', e.target.value)} placeholder="Bu hizmet kapsamında neler sunulacak..." /></div>
                                <div className="admin-form-group"><label className="admin-label">SLA / Teslimat Süresi</label><input className="admin-input" value={form.sla} onChange={e => set('sla', e.target.value)} placeholder="Ör: 15 iş günü" /></div>
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

export default ServicesView;
