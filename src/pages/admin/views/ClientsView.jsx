import React, { useState } from 'react';
import { Plus, Search, X, Trash2, Edit3 } from 'lucide-react';
import { useFirestoreCRUD, showToast } from '../../../hooks/useFirestoreCRUD';

const EMPTY_FORM = { companyName: '', contactName: '', phone: '', email: '', address: '', website: '', sector: '', status: 'Aktif', type: 'Kurumsal', taxOffice: '', taxNumber: '', tags: '', notes: '' };

const ClientsView = () => {
    const [statusFilter, setStatusFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState(EMPTY_FORM);

    const filters = statusFilter !== 'all' ? [{ field: 'status', op: '==', value: statusFilter }] : [];
    const { items: customers, loading, add, update, remove } = useFirestoreCRUD('customers', { filters, pageSize: 50 });

    const displayed = search
        ? customers.filter(c => c.companyName?.toLowerCase().includes(search.toLowerCase()) || c.contactName?.toLowerCase().includes(search.toLowerCase()))
        : customers;

    const openNew = () => { setForm(EMPTY_FORM); setEditId(null); setShowModal(true); };
    const openEdit = (c) => {
        setForm({ companyName: c.companyName || '', contactName: c.contactName || '', phone: c.phone || '', email: c.email || '', address: c.address || '', website: c.website || '', sector: c.sector || '', status: c.status || 'Aktif', type: c.type || 'Kurumsal', taxOffice: c.taxOffice || '', taxNumber: c.taxNumber || '', tags: c.tags || '', notes: c.notes || '' });
        setEditId(c.id); setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) { await update(editId, form); showToast('Müşteri güncellendi'); }
            else { await add(form); showToast('Müşteri eklendi'); }
            setShowModal(false);
        } catch { showToast('Hata oluştu', 'error'); }
    };

    const handleDelete = async (id) => {
        if (!confirm('Bu müşteriyi silmek istediğinize emin misiniz?')) return;
        try { await remove(id); showToast('Müşteri silindi'); } catch { showToast('Hata', 'error'); }
    };

    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

    return (
        <>
            <div className="admin-header">
                <div>
                    <h1>Müşteriler</h1>
                    <p className="admin-header-subtitle">{displayed.length} müşteri</p>
                </div>
                <button className="admin-btn admin-btn-primary" onClick={openNew}><Plus size={15} /> Yeni Müşteri</button>
            </div>

            <div className="admin-toolbar">
                <div className="admin-search-bar">
                    <Search size={15} color="#555" />
                    <input placeholder="Müşteri ara..." value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <select className="admin-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                    <option value="all">Tüm Durumlar</option>
                    <option value="Aktif">Aktif</option>
                    <option value="Pasif">Pasif</option>
                    <option value="Potansiyel">Potansiyel</option>
                </select>
            </div>

            {loading ? (
                <div className="admin-loading"><div className="admin-spinner" /> Yükleniyor...</div>
            ) : displayed.length === 0 ? (
                <div className="admin-empty"><div className="admin-empty-icon">👥</div><p>Henüz müşteri yok</p></div>
            ) : (
                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead><tr><th>Firma</th><th>Yetkili</th><th>Telefon</th><th>Tür</th><th>Sektör</th><th>Durum</th><th style={{ width: 100 }}></th></tr></thead>
                        <tbody>
                            {displayed.map(c => (
                                <tr key={c.id}>
                                    <td><strong>{c.companyName}</strong></td>
                                    <td>{c.contactName || '-'}</td>
                                    <td>{c.phone || '-'}</td>
                                    <td><span className="admin-badge admin-badge-neutral">{c.type || 'Kurumsal'}</span></td>
                                    <td>{c.sector || '-'}</td>
                                    <td>
                                        <span className={`admin-badge ${c.status === 'Aktif' ? 'admin-badge-success' : c.status === 'Potansiyel' ? 'admin-badge-warning' : 'admin-badge-neutral'}`}>{c.status}</span>
                                    </td>
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
                        <div className="admin-modal-header">
                            <h3>{editId ? 'Müşteri Düzenle' : 'Yeni Müşteri'}</h3>
                            <button className="admin-btn-icon admin-btn-ghost" onClick={() => setShowModal(false)}><X size={18} /></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="admin-modal-body">
                                <div className="admin-form-row">
                                    <div className="admin-form-group"><label className="admin-label">Firma Adı *</label><input className="admin-input" required value={form.companyName} onChange={e => set('companyName', e.target.value)} /></div>
                                    <div className="admin-form-group"><label className="admin-label">Tür</label>
                                        <select className="admin-select" value={form.type} onChange={e => set('type', e.target.value)}><option value="Kurumsal">Kurumsal</option><option value="Bireysel">Bireysel</option></select>
                                    </div>
                                </div>
                                <div className="admin-form-row">
                                    <div className="admin-form-group"><label className="admin-label">Yetkili</label><input className="admin-input" value={form.contactName} onChange={e => set('contactName', e.target.value)} /></div>
                                    <div className="admin-form-group"><label className="admin-label">Durum</label>
                                        <select className="admin-select" value={form.status} onChange={e => set('status', e.target.value)}><option value="Aktif">Aktif</option><option value="Pasif">Pasif</option><option value="Potansiyel">Potansiyel</option></select>
                                    </div>
                                </div>
                                <div className="admin-form-row">
                                    <div className="admin-form-group"><label className="admin-label">Telefon</label><input className="admin-input" type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} /></div>
                                    <div className="admin-form-group"><label className="admin-label">E-posta</label><input className="admin-input" type="email" value={form.email} onChange={e => set('email', e.target.value)} /></div>
                                </div>
                                <div className="admin-form-group"><label className="admin-label">Adres</label><input className="admin-input" value={form.address} onChange={e => set('address', e.target.value)} /></div>
                                <div className="admin-form-row">
                                    <div className="admin-form-group"><label className="admin-label">Web Sitesi</label><input className="admin-input" value={form.website} onChange={e => set('website', e.target.value)} /></div>
                                    <div className="admin-form-group"><label className="admin-label">Sektör</label><input className="admin-input" value={form.sector} onChange={e => set('sector', e.target.value)} /></div>
                                </div>
                                <div className="admin-form-row">
                                    <div className="admin-form-group"><label className="admin-label">Vergi Dairesi</label><input className="admin-input" value={form.taxOffice} onChange={e => set('taxOffice', e.target.value)} /></div>
                                    <div className="admin-form-group"><label className="admin-label">Vergi No</label><input className="admin-input" value={form.taxNumber} onChange={e => set('taxNumber', e.target.value)} /></div>
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

export default ClientsView;
