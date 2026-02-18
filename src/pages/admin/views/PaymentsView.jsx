import React, { useEffect, useState } from 'react';
import { Plus, Download, X, Check, AlertTriangle } from 'lucide-react';

const PaymentsView = ({ api }) => {
    const [plans, setPlans] = useState([]);
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showPayModal, setShowPayModal] = useState(null); // { planId, installmentNumber }
    const [payAmount, setPayAmount] = useState('');
    const [payDate, setPayDate] = useState('');
    const [form, setForm] = useState({ clientId: '', totalAmount: '', installmentCount: 1, paymentType: 'Taksit', referenceNumber: '', currency: 'TRY' });

    const fetchData = () => {
        Promise.all([api.get('/payments'), api.get('/clients')])
            .then(([p, c]) => { setPlans(p); setClients(c); })
            .catch(console.error)
            .finally(() => setLoading(false));
    };

    useEffect(() => { fetchData(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const client = clients.find(c => c.id === form.clientId);
        try {
            await api.post('/payments', { ...form, clientName: client?.companyName || '' });
            setShowModal(false);
            setForm({ clientId: '', totalAmount: '', installmentCount: 1, paymentType: 'Taksit', referenceNumber: '', currency: 'TRY' });
            fetchData();
        } catch (err) { alert('Hata: ' + err.message); }
    };

    const handlePay = async () => {
        if (!showPayModal) return;
        try {
            await api.post(`/payments/${showPayModal.planId}/pay`, {
                installmentNumber: showPayModal.installmentNumber,
                amount: payAmount || showPayModal.amount,
                date: payDate || new Date().toISOString().split('T')[0],
            });
            setShowPayModal(null);
            setPayAmount('');
            setPayDate('');
            fetchData();
        } catch (err) { alert('Hata: ' + err.message); }
    };

    const handleDownloadExcel = async () => {
        try {
            const now = new Date();
            const filename = `ZMK_Odemeler_${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}.xlsx`;
            await api.downloadFile('/documents/payments?format=xlsx', filename);
        } catch (err) { alert('İndirme hatası: ' + err.message); }
    };

    const formatCurrency = (amount, currency = 'TRY') => {
        const symbols = { TRY: '₺', EUR: '€', USD: '$' };
        return `${symbols[currency] || currency}${Number(amount).toLocaleString('tr-TR')}`;
    };

    const now = new Date();

    return (
        <>
            <div className="admin-header">
                <div><h1>Ödemeler & Tahsilat</h1><p className="admin-header-subtitle">{plans.length} ödeme planı</p></div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="admin-btn admin-btn-secondary" onClick={handleDownloadExcel}><Download size={16} /> Excel İndir</button>
                    <button className="admin-btn admin-btn-primary" onClick={() => setShowModal(true)}><Plus size={16} /> Yeni Plan</button>
                </div>
            </div>

            {loading ? (
                <div className="admin-loading"><div className="admin-spinner" /> Yükleniyor...</div>
            ) : plans.length === 0 ? (
                <div className="admin-empty"><div className="admin-empty-icon">💰</div><p>Henüz ödeme planı yok</p></div>
            ) : (
                <div style={{ display: 'grid', gap: '16px' }}>
                    {plans.map(plan => (
                        <div key={plan.id} className="admin-table-wrapper">
                            <div className="admin-table-header">
                                <div>
                                    <h3 style={{ marginBottom: '2px' }}>{plan.clientName}</h3>
                                    <span style={{ fontSize: '0.75rem', color: '#888' }}>{plan.referenceNumber} • {plan.paymentType} • {formatCurrency(plan.totalAmount, plan.currency)}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ textAlign: 'right', fontSize: '0.8rem' }}>
                                        <div style={{ color: '#22c55e' }}>Ödenen: {formatCurrency(plan.paidTotal, plan.currency)}</div>
                                        <div style={{ color: plan.remainingTotal > 0 ? '#f59e0b' : '#22c55e' }}>Kalan: {formatCurrency(plan.remainingTotal, plan.currency)}</div>
                                    </div>
                                    <span className={`admin-badge ${plan.status === 'Tamamlandı' ? 'admin-badge-success' : 'admin-badge-warning'}`}>{plan.status}</span>
                                </div>
                            </div>
                            <table className="admin-table">
                                <thead><tr><th>Taksit</th><th>Tutar</th><th>Vade</th><th>Ödendi?</th><th>Ödeme Tarihi</th><th style={{ width: 100 }}></th></tr></thead>
                                <tbody>
                                    {(plan.installments || []).map(inst => {
                                        const isOverdue = !inst.paid && new Date(inst.dueDate) < now;
                                        return (
                                            <tr key={inst.number} style={{ background: isOverdue ? 'rgba(239,68,68,0.05)' : 'transparent' }}>
                                                <td>#{inst.number}</td>
                                                <td style={{ fontWeight: 600 }}>{formatCurrency(inst.amount, plan.currency)}</td>
                                                <td>
                                                    {new Date(inst.dueDate).toLocaleDateString('tr-TR')}
                                                    {isOverdue && <AlertTriangle size={13} style={{ marginLeft: '6px', color: '#ef4444', verticalAlign: 'middle' }} />}
                                                </td>
                                                <td>
                                                    {inst.paid ? (
                                                        <span className="admin-badge admin-badge-success"><Check size={12} /> Ödendi</span>
                                                    ) : isOverdue ? (
                                                        <span className="admin-badge admin-badge-danger">GECİKMİŞ</span>
                                                    ) : (
                                                        <span className="admin-badge admin-badge-neutral">Bekliyor</span>
                                                    )}
                                                </td>
                                                <td style={{ color: '#888' }}>{inst.paidDate ? new Date(inst.paidDate).toLocaleDateString('tr-TR') : '-'}</td>
                                                <td>
                                                    {!inst.paid && (
                                                        <button className="admin-btn admin-btn-sm admin-btn-success" onClick={() => { setShowPayModal({ planId: plan.id, installmentNumber: inst.number, amount: inst.amount }); setPayAmount(String(inst.amount)); }}>
                                                            Tahsil
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            )}

            {/* New Payment Plan Modal */}
            {showModal && (
                <div className="admin-modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
                    <div className="admin-modal">
                        <div className="admin-modal-header">
                            <h3>Yeni Ödeme Planı</h3>
                            <button className="admin-btn-icon admin-btn-ghost" onClick={() => setShowModal(false)}><X size={18} /></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="admin-modal-body">
                                <div className="admin-form-group">
                                    <label className="admin-label">Müşteri *</label>
                                    <select className="admin-select" required value={form.clientId} onChange={(e) => setForm({ ...form, clientId: e.target.value })}>
                                        <option value="">Seçin...</option>
                                        {clients.map(c => <option key={c.id} value={c.id}>{c.companyName}</option>)}
                                    </select>
                                </div>
                                <div className="admin-form-row">
                                    <div className="admin-form-group">
                                        <label className="admin-label">Toplam Tutar *</label>
                                        <input className="admin-input" type="number" required value={form.totalAmount} onChange={(e) => setForm({ ...form, totalAmount: e.target.value })} />
                                    </div>
                                    <div className="admin-form-group">
                                        <label className="admin-label">Para Birimi</label>
                                        <select className="admin-select" value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value })}>
                                            <option value="TRY">₺ TRY</option><option value="EUR">€ EUR</option><option value="USD">$ USD</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="admin-form-row">
                                    <div className="admin-form-group">
                                        <label className="admin-label">Ödeme Türü</label>
                                        <select className="admin-select" value={form.paymentType} onChange={(e) => setForm({ ...form, paymentType: e.target.value })}>
                                            <option value="Peşin">Peşin</option><option value="Taksit">Taksit</option><option value="Aylık">Aylık</option>
                                        </select>
                                    </div>
                                    <div className="admin-form-group">
                                        <label className="admin-label">Taksit Sayısı</label>
                                        <input className="admin-input" type="number" min="1" value={form.installmentCount} onChange={(e) => setForm({ ...form, installmentCount: Number(e.target.value) })} />
                                    </div>
                                </div>
                                <div className="admin-form-group">
                                    <label className="admin-label">Referans No</label>
                                    <input className="admin-input" value={form.referenceNumber} onChange={(e) => setForm({ ...form, referenceNumber: e.target.value })} placeholder="Ör: ZMK-2026-0001" />
                                </div>
                            </div>
                            <div className="admin-modal-footer">
                                <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setShowModal(false)}>İptal</button>
                                <button type="submit" className="admin-btn admin-btn-primary">Oluştur</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Payment Record Modal */}
            {showPayModal && (
                <div className="admin-modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowPayModal(null)}>
                    <div className="admin-modal" style={{ maxWidth: '400px' }}>
                        <div className="admin-modal-header">
                            <h3>Tahsilat Kaydet</h3>
                            <button className="admin-btn-icon admin-btn-ghost" onClick={() => setShowPayModal(null)}><X size={18} /></button>
                        </div>
                        <div className="admin-modal-body">
                            <div className="admin-form-group">
                                <label className="admin-label">Tutar</label>
                                <input className="admin-input" type="number" value={payAmount} onChange={(e) => setPayAmount(e.target.value)} />
                            </div>
                            <div className="admin-form-group">
                                <label className="admin-label">Ödeme Tarihi</label>
                                <input className="admin-input" type="date" value={payDate || new Date().toISOString().split('T')[0]} onChange={(e) => setPayDate(e.target.value)} />
                            </div>
                        </div>
                        <div className="admin-modal-footer">
                            <button className="admin-btn admin-btn-secondary" onClick={() => setShowPayModal(null)}>İptal</button>
                            <button className="admin-btn admin-btn-success" onClick={handlePay}><Check size={14} /> Tahsil Et</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PaymentsView;
