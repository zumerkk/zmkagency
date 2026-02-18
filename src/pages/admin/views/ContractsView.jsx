import React, { useEffect, useState } from 'react';
import { Download, Copy } from 'lucide-react';

const ContractsView = ({ api }) => {
    const [contracts, setContracts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/contracts').then(setContracts).catch(console.error).finally(() => setLoading(false));
    }, []);

    const fetchContracts = () => { api.get('/contracts').then(setContracts).catch(console.error); };

    const handleDownload = async (contract, format) => {
        try {
            await api.downloadFile(`/documents/contract/${contract.id}?format=${format}`, `ZMK_Sozlesme_${contract.contractNumber}_v${contract.version}.${format}`);
        } catch (err) { alert('İndirme hatası: ' + err.message); }
    };

    const handleDuplicate = async (id) => {
        try { await api.post(`/contracts/${id}/duplicate`); fetchContracts(); } catch (err) { alert('Hata: ' + err.message); }
    };

    const generateMailDraft = (contract) => {
        const subject = encodeURIComponent(`ZMK Agency Sözleşme — ${contract.contractNumber}`);
        const body = encodeURIComponent(`Sayın ${contract.clientName} yetkilisi,\n\n${contract.contractNumber} numaralı sözleşmeniz ekte sunulmuştur.\n\nİncelemeniz ve onayınız rica olunur.\n\nSaygılarımızla,\nZMK AGENCY`);
        window.open(`mailto:?subject=${subject}&body=${body}`);
    };

    const formatCurrency = (amount, currency = 'TRY') => {
        const symbols = { TRY: '₺', EUR: '€', USD: '$' };
        return `${symbols[currency] || currency}${Number(amount).toLocaleString('tr-TR')}`;
    };

    const statusColors = { 'Taslak': 'admin-badge-neutral', 'Aktif': 'admin-badge-success', 'Tamamlandı': 'admin-badge-info', 'İptal': 'admin-badge-danger' };

    return (
        <>
            <div className="admin-header">
                <div><h1>Sözleşmeler</h1><p className="admin-header-subtitle">{contracts.length} sözleşme</p></div>
            </div>

            {loading ? (
                <div className="admin-loading"><div className="admin-spinner" /> Yükleniyor...</div>
            ) : contracts.length === 0 ? (
                <div className="admin-empty">
                    <div className="admin-empty-icon">📜</div>
                    <p>Henüz sözleşme yok</p>
                    <p style={{ fontSize: '0.8rem', color: '#555', marginTop: '4px' }}>Teklifler sayfasından bir teklifi sözleşmeye dönüştürebilirsiniz.</p>
                </div>
            ) : (
                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead><tr><th>Sözleşme No</th><th>Müşteri</th><th>Tutar</th><th>Versiyon</th><th>Durum</th><th>Tarih</th><th style={{ width: 250 }}>İşlemler</th></tr></thead>
                        <tbody>
                            {contracts.map(c => (
                                <tr key={c.id}>
                                    <td style={{ color: '#dc2626', fontWeight: 600 }}>{c.contractNumber}</td>
                                    <td>{c.clientName}</td>
                                    <td style={{ fontWeight: 600 }}>{formatCurrency(c.grandTotal, c.currency)}</td>
                                    <td><span className="admin-badge admin-badge-neutral">v{c.version}</span></td>
                                    <td><span className={`admin-badge ${statusColors[c.status] || 'admin-badge-neutral'}`}>{c.status}</span></td>
                                    <td style={{ color: '#888', fontSize: '0.8rem' }}>{new Date(c.createdAt).toLocaleDateString('tr-TR')}</td>
                                    <td>
                                        <div className="admin-download-group">
                                            <button className="admin-btn admin-btn-sm admin-btn-primary" onClick={() => handleDownload(c, 'pdf')}>PDF</button>
                                            <button className="admin-btn admin-btn-sm admin-btn-secondary" onClick={() => handleDownload(c, 'docx')}>DOCX</button>
                                            <button className="admin-btn admin-btn-sm admin-btn-ghost" title="Kopyala" onClick={() => handleDuplicate(c.id)}><Copy size={13} /></button>
                                            <button className="admin-btn admin-btn-sm admin-btn-ghost" title="Mail Taslağı" onClick={() => generateMailDraft(c)}>📧</button>
                                        </div>
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

export default ContractsView;
