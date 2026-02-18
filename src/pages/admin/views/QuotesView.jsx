import React, { useEffect, useState } from 'react';
import { Plus, Download, Copy, FileSignature, X, Trash2 } from 'lucide-react';

const QuotesView = ({ api, onViewClient }) => {
    const [quotes, setQuotes] = useState([]);
    const [clients, setClients] = useState([]);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({ clientId: '', items: [], paymentTerms: '', validUntil: '', currency: 'TRY' });

    const fetchData = () => {
        Promise.all([api.get('/quotes'), api.get('/clients'), api.get('/services')])
            .then(([q, c, s]) => { setQuotes(q); setClients(c); setServices(s); })
            .catch(console.error)
            .finally(() => setLoading(false));
    };

    useEffect(() => { fetchData(); }, []);

    const addItem = () => {
        setForm({ ...form, items: [...form.items, { serviceId: '', serviceName: '', description: '', quantity: 1, unitPrice: 0, kdvRate: 20 }] });
    };

    const updateItem = (idx, field, value) => {
        const items = [...form.items];
        items[idx] = { ...items[idx], [field]: value };
        if (field === 'serviceId') {
            const svc = services.find(s => s.id === value);
            if (svc) {
                items[idx].serviceName = svc.name;
                items[idx].unitPrice = svc.unitPrice;
                items[idx].kdvRate = svc.kdvRate;
                items[idx].description = svc.description;
            }
        }
        setForm({ ...form, items });
    };

    const removeItem = (idx) => {
        setForm({ ...form, items: form.items.filter((_, i) => i !== idx) });
    };

    const subtotal = form.items.reduce((s, i) => s + (Number(i.quantity) || 1) * (Number(i.unitPrice) || 0), 0);
    const kdvTotal = form.items.reduce((s, i) => s + ((Number(i.quantity) || 1) * (Number(i.unitPrice) || 0) * (Number(i.kdvRate) || 20) / 100), 0);
    const grandTotal = subtotal + kdvTotal;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const client = clients.find(c => c.id === form.clientId);
        try {
            await api.post('/quotes', { ...form, clientName: client?.companyName || '' });
            setShowModal(false);
            setForm({ clientId: '', items: [], paymentTerms: '', validUntil: '', currency: 'TRY' });
            fetchData();
        } catch (err) { alert('Hata: ' + err.message); }
    };

    const handleDownload = async (quote, format) => {
        try {
            await api.downloadFile(`/documents/quote/${quote.id}?format=${format}`, `ZMK_Teklif_${quote.quoteNumber}.${format}`);
        } catch (err) { alert('İndirme hatası: ' + err.message); }
    };

    const handleDuplicate = async (id) => {
        try { await api.post(`/quotes/${id}/duplicate`); fetchData(); } catch (err) { alert('Hata: ' + err.message); }
    };

    const handleConvert = async (id) => {
        if (!confirm('Bu teklifi sözleşmeye dönüştürmek istediğinize emin misiniz?')) return;
        try { await api.post(`/quotes/${id}/convert`, {}); fetchData(); } catch (err) { alert('Hata: ' + err.message); }
    };

    const formatCurrency = (amount, currency = 'TRY') => {
        const symbols = { TRY: '₺', EUR: '€', USD: '$' };
        return `${symbols[currency] || currency}${Number(amount).toLocaleString('tr-TR')}`;
    };

    const statusColors = { 'Taslak': 'admin-badge-neutral', 'Gönderildi': 'admin-badge-info', 'Kabul Edildi': 'admin-badge-success', 'Reddedildi': 'admin-badge-danger' };

    return (
        <>
            <div className="admin-header">
                <div><h1>Teklifler</h1><p className="admin-header-subtitle">{quotes.length} teklif</p></div>
                <button className="admin-btn admin-btn-primary" onClick={() => setShowModal(true)}><Plus size={16} /> Yeni Teklif</button>
            </div>

            {loading ? (
                <div className="admin-loading"><div className="admin-spinner" /> Yükleniyor...</div>
            ) : quotes.length === 0 ? (
                <div className="admin-empty"><div className="admin-empty-icon">📄</div><p>Henüz teklif yok</p></div>
            ) : (
                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead><tr><th>Teklif No</th><th>Müşteri</th><th>Tutar</th><th>Durum</th><th>Tarih</th><th style={{ width: 220 }}>İşlemler</th></tr></thead>
                        <tbody>
                            {quotes.map(q => (
                                <tr key={q.id}>
                                    <td style={{ color: '#dc2626', fontWeight: 600 }}>{q.quoteNumber}</td>
                                    <td>{q.clientName}</td>
                                    <td style={{ fontWeight: 600 }}>{formatCurrency(q.grandTotal, q.currency)}</td>
                                    <td><span className={`admin-badge ${statusColors[q.status] || 'admin-badge-neutral'}`}>{q.status}</span></td>
                                    <td style={{ color: '#888', fontSize: '0.8rem' }}>{new Date(q.createdAt).toLocaleDateString('tr-TR')}</td>
                                    <td>
                                        <div className="admin-download-group">
                                            <button className="admin-btn admin-btn-sm admin-btn-primary" onClick={() => handleDownload(q, 'pdf')}>PDF</button>
                                            <button className="admin-btn admin-btn-sm admin-btn-secondary" onClick={() => handleDownload(q, 'docx')}>DOCX</button>
                                            <button className="admin-btn admin-btn-sm admin-btn-ghost" title="Kopyala" onClick={() => handleDuplicate(q.id)}><Copy size={13} /></button>
                                            {!q.convertedToContract && (
                                                <button className="admin-btn admin-btn-sm admin-btn-success" title="Sözleşmeye Dönüştür" onClick={() => handleConvert(q.id)}><FileSignature size={13} /></button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Quote Builder Modal */}
            {showModal && (
                <div className="admin-modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
                    <div className="admin-modal admin-modal-wide">
                        <div className="admin-modal-header">
                            <h3>Yeni Teklif Oluştur</h3>
                            <button className="admin-btn-icon admin-btn-ghost" onClick={() => setShowModal(false)}><X size={18} /></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="admin-modal-body">
                                <div className="admin-form-row">
                                    <div className="admin-form-group">
                                        <label className="admin-label">Müşteri *</label>
                                        <select className="admin-select" required value={form.clientId} onChange={(e) => setForm({ ...form, clientId: e.target.value })}>
                                            <option value="">Seçin...</option>
                                            {clients.map(c => <option key={c.id} value={c.id}>{c.companyName}</option>)}
                                        </select>
                                    </div>
                                    <div className="admin-form-group">
                                        <label className="admin-label">Para Birimi</label>
                                        <select className="admin-select" value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value })}>
                                            <option value="TRY">₺ TRY</option><option value="EUR">€ EUR</option><option value="USD">$ USD</option>
                                        </select>
                                    </div>
                                </div>

                                <div style={{ marginBottom: '16px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                        <label className="admin-label" style={{ margin: 0 }}>HİZMET KALEMLERİ</label>
                                        <button type="button" className="admin-btn admin-btn-sm admin-btn-secondary" onClick={addItem}><Plus size={13} /> Kalem Ekle</button>
                                    </div>
                                    {form.items.map((item, idx) => (
                                        <div key={idx} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 80px 100px 40px', gap: '8px', alignItems: 'end', marginBottom: '8px' }}>
                                            <div>
                                                {idx === 0 && <label className="admin-label" style={{ fontSize: '0.7rem' }}>Hizmet</label>}
                                                <select className="admin-select" value={item.serviceId} onChange={(e) => updateItem(idx, 'serviceId', e.target.value)}>
                                                    <option value="">Seçin...</option>
                                                    {services.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                                                </select>
                                            </div>
                                            <div>
                                                {idx === 0 && <label className="admin-label" style={{ fontSize: '0.7rem' }}>Birim Fiyat</label>}
                                                <input className="admin-input" type="number" value={item.unitPrice} onChange={(e) => updateItem(idx, 'unitPrice', e.target.value)} />
                                            </div>
                                            <div>
                                                {idx === 0 && <label className="admin-label" style={{ fontSize: '0.7rem' }}>Adet</label>}
                                                <input className="admin-input" type="number" min="1" value={item.quantity} onChange={(e) => updateItem(idx, 'quantity', e.target.value)} />
                                            </div>
                                            <div style={{ textAlign: 'right', padding: '10px 0', fontWeight: 600, fontSize: '0.88rem' }}>
                                                {formatCurrency((Number(item.quantity) || 1) * (Number(item.unitPrice) || 0), form.currency)}
                                            </div>
                                            <button type="button" className="admin-btn-icon admin-btn-ghost" onClick={() => removeItem(idx)}><Trash2 size={14} color="#ef4444" /></button>
                                        </div>
                                    ))}
                                </div>

                                {/* Totals */}
                                {form.items.length > 0 && (
                                    <div style={{ borderTop: '1px solid var(--admin-border)', paddingTop: '12px', marginBottom: '16px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '24px', fontSize: '0.9rem' }}>
                                            <span style={{ color: '#888' }}>Ara Toplam: <strong style={{ color: '#fff' }}>{formatCurrency(subtotal, form.currency)}</strong></span>
                                            <span style={{ color: '#888' }}>KDV: <strong style={{ color: '#fff' }}>{formatCurrency(kdvTotal, form.currency)}</strong></span>
                                            <span style={{ color: '#dc2626', fontWeight: 700, fontSize: '1rem' }}>TOPLAM: {formatCurrency(grandTotal, form.currency)}</span>
                                        </div>
                                    </div>
                                )}

                                <div className="admin-form-row">
                                    <div className="admin-form-group">
                                        <label className="admin-label">Ödeme Koşulları</label>
                                        <input className="admin-input" value={form.paymentTerms} onChange={(e) => setForm({ ...form, paymentTerms: e.target.value })} placeholder="Ör: %50 peşin, %50 teslimde" />
                                    </div>
                                    <div className="admin-form-group">
                                        <label className="admin-label">Geçerlilik Tarihi</label>
                                        <input className="admin-input" type="date" value={form.validUntil} onChange={(e) => setForm({ ...form, validUntil: e.target.value })} />
                                    </div>
                                </div>
                            </div>
                            <div className="admin-modal-footer">
                                <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setShowModal(false)}>İptal</button>
                                <button type="submit" className="admin-btn admin-btn-primary" disabled={form.items.length === 0}>Teklif Oluştur</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default QuotesView;
