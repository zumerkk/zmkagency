import React, { useEffect, useState } from 'react';
import { Plus, Edit3, Trash2, X } from 'lucide-react';

const ServicesView = ({ api }) => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({ name: '', description: '', scope: '', duration: '', unitPrice: '', currency: 'TRY', kdvRate: 20, category: 'Genel', order: 0 });

    const fetchServices = () => {
        setLoading(true);
        api.get('/services').then(setServices).catch(console.error).finally(() => setLoading(false));
    };

    useEffect(() => { fetchServices(); }, []);

    const openEdit = (svc) => {
        setEditing(svc);
        setForm({ name: svc.name, description: svc.description, scope: svc.scope, duration: svc.duration, unitPrice: svc.unitPrice, currency: svc.currency, kdvRate: svc.kdvRate, category: svc.category, order: svc.order || 0 });
        setShowModal(true);
    };

    const openNew = () => {
        setEditing(null);
        setForm({ name: '', description: '', scope: '', duration: '', unitPrice: '', currency: 'TRY', kdvRate: 20, category: 'Genel', order: services.length + 1 });
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editing) {
                await api.put(`/services/${editing.id}`, form);
            } else {
                await api.post('/services', form);
            }
            setShowModal(false);
            fetchServices();
        } catch (err) {
            alert('Hata: ' + err.message);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Bu hizmeti silmek istediğinize emin misiniz?')) return;
        try {
            await api.del(`/services/${id}`);
            fetchServices();
        } catch (err) {
            alert('Hata: ' + err.message);
        }
    };

    const formatPrice = (price, currency) => {
        const symbols = { TRY: '₺', EUR: '€', USD: '$' };
        return `${symbols[currency] || currency}${Number(price).toLocaleString('tr-TR')}`;
    };

    return (
        <>
            <div className="admin-header">
                <div>
                    <h1>Hizmet Kataloğu</h1>
                    <p className="admin-header-subtitle">{services.length} hizmet tanımlı</p>
                </div>
                <button className="admin-btn admin-btn-primary" onClick={openNew}><Plus size={16} /> Yeni Hizmet</button>
            </div>

            {loading ? (
                <div className="admin-loading"><div className="admin-spinner" /> Yükleniyor...</div>
            ) : (
                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr><th>Hizmet</th><th>Kategori</th><th>Süre</th><th>Birim Fiyat</th><th>KDV</th><th style={{ width: 80 }}></th></tr>
                        </thead>
                        <tbody>
                            {services.map(svc => (
                                <tr key={svc.id}>
                                    <td>
                                        <strong>{svc.name}</strong>
                                        {svc.description && <div style={{ fontSize: '0.75rem', color: '#888', marginTop: '2px' }}>{svc.description}</div>}
                                    </td>
                                    <td><span className="admin-badge admin-badge-neutral">{svc.category}</span></td>
                                    <td>{svc.duration || '-'}</td>
                                    <td style={{ fontWeight: 600, color: '#dc2626' }}>{formatPrice(svc.unitPrice, svc.currency)}</td>
                                    <td>%{svc.kdvRate}</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '4px' }}>
                                            <button className="admin-btn-icon admin-btn-ghost" onClick={() => openEdit(svc)}><Edit3 size={14} /></button>
                                            <button className="admin-btn-icon admin-btn-ghost" onClick={() => handleDelete(svc.id)}><Trash2 size={14} color="#ef4444" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {showModal && (
                <div className="admin-modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
                    <div className="admin-modal">
                        <div className="admin-modal-header">
                            <h3>{editing ? 'Hizmet Düzenle' : 'Yeni Hizmet'}</h3>
                            <button className="admin-btn-icon admin-btn-ghost" onClick={() => setShowModal(false)}><X size={18} /></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="admin-modal-body">
                                <div className="admin-form-group">
                                    <label className="admin-label">Hizmet Adı *</label>
                                    <input className="admin-input" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                                </div>
                                <div className="admin-form-group">
                                    <label className="admin-label">Açıklama</label>
                                    <textarea className="admin-textarea" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                                </div>
                                <div className="admin-form-group">
                                    <label className="admin-label">Teslim Kapsamı</label>
                                    <textarea className="admin-textarea" value={form.scope} onChange={(e) => setForm({ ...form, scope: e.target.value })} />
                                </div>
                                <div className="admin-form-row">
                                    <div className="admin-form-group">
                                        <label className="admin-label">Süre</label>
                                        <input className="admin-input" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} placeholder="Ör: 15-25 iş günü" />
                                    </div>
                                    <div className="admin-form-group">
                                        <label className="admin-label">Kategori</label>
                                        <select className="admin-select" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                                            <option>Genel</option><option>Web</option><option>Reklam</option><option>SEO</option><option>İçerik</option><option>Danışmanlık</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="admin-form-row">
                                    <div className="admin-form-group">
                                        <label className="admin-label">Birim Fiyat *</label>
                                        <input className="admin-input" type="number" required value={form.unitPrice} onChange={(e) => setForm({ ...form, unitPrice: e.target.value })} />
                                    </div>
                                    <div className="admin-form-group">
                                        <label className="admin-label">Para Birimi</label>
                                        <select className="admin-select" value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value })}>
                                            <option value="TRY">₺ TRY</option><option value="EUR">€ EUR</option><option value="USD">$ USD</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="admin-form-group" style={{ maxWidth: '200px' }}>
                                    <label className="admin-label">KDV Oranı (%)</label>
                                    <input className="admin-input" type="number" value={form.kdvRate} onChange={(e) => setForm({ ...form, kdvRate: Number(e.target.value) })} />
                                </div>
                            </div>
                            <div className="admin-modal-footer">
                                <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setShowModal(false)}>İptal</button>
                                <button type="submit" className="admin-btn admin-btn-primary">{editing ? 'Güncelle' : 'Kaydet'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default ServicesView;
