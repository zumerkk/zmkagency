import React, { useEffect, useState } from 'react';
import { Save } from 'lucide-react';

const TemplatesView = ({ api }) => {
    const [settings, setSettings] = useState({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeSection, setActiveSection] = useState('general');

    // Local form states
    const [general, setGeneral] = useState({
        companyName: 'ZMK AGENCY',
        companyAddress: '',
        companyPhone: '',
        companyEmail: 'info@zmkagency.com',
        companyWebsite: 'zmkagency.com',
        defaultKdvRate: 20,
        defaultCurrency: 'TRY',
        quotePrefix: 'ZMK',
        contractPrefix: 'ZMK-SZL',
    });

    const [contractTemplate, setContractTemplate] = useState({
        clauses: [],
    });

    useEffect(() => {
        api.get('/templates').then(data => {
            setSettings(data);
            if (data.general) setGeneral(data.general);
            if (data.contract_template) setContractTemplate(data.contract_template);
        }).catch(console.error).finally(() => setLoading(false));
    }, []);

    const saveGeneral = async () => {
        setSaving(true);
        try {
            await api.put('/templates/general', general);
            alert('Ayarlar kaydedildi!');
        } catch (err) { alert('Hata: ' + err.message); }
        setSaving(false);
    };

    const saveContractTemplate = async () => {
        setSaving(true);
        try {
            await api.put('/templates/contract_template', contractTemplate);
            alert('Sözleşme şablonu kaydedildi!');
        } catch (err) { alert('Hata: ' + err.message); }
        setSaving(false);
    };

    const updateClause = (idx, value) => {
        const clauses = [...contractTemplate.clauses];
        clauses[idx] = value;
        setContractTemplate({ ...contractTemplate, clauses });
    };

    const addClause = () => {
        setContractTemplate({ ...contractTemplate, clauses: [...contractTemplate.clauses, ''] });
    };

    const removeClause = (idx) => {
        setContractTemplate({ ...contractTemplate, clauses: contractTemplate.clauses.filter((_, i) => i !== idx) });
    };

    if (loading) return <div className="admin-loading"><div className="admin-spinner" /> Yükleniyor...</div>;

    const tabs = [
        { id: 'general', label: 'Genel Ayarlar' },
        { id: 'contract', label: 'Sözleşme Şablonu' },
    ];

    return (
        <>
            <div className="admin-header">
                <div><h1>Şablonlar & Ayarlar</h1><p className="admin-header-subtitle">Sistem konfigürasyonu</p></div>
            </div>

            <div className="admin-toolbar">
                {tabs.map(tab => (
                    <button key={tab.id} className={`admin-btn ${activeSection === tab.id ? 'admin-btn-primary' : 'admin-btn-secondary'}`} onClick={() => setActiveSection(tab.id)}>
                        {tab.label}
                    </button>
                ))}
            </div>

            {activeSection === 'general' && (
                <div className="admin-table-wrapper" style={{ padding: '24px' }}>
                    <h3 style={{ marginBottom: '20px' }}>Firma Bilgileri</h3>
                    <div className="admin-form-row">
                        <div className="admin-form-group">
                            <label className="admin-label">Firma Adı</label>
                            <input className="admin-input" value={general.companyName} onChange={(e) => setGeneral({ ...general, companyName: e.target.value })} />
                        </div>
                        <div className="admin-form-group">
                            <label className="admin-label">E-posta</label>
                            <input className="admin-input" value={general.companyEmail} onChange={(e) => setGeneral({ ...general, companyEmail: e.target.value })} />
                        </div>
                    </div>
                    <div className="admin-form-row">
                        <div className="admin-form-group">
                            <label className="admin-label">Telefon</label>
                            <input className="admin-input" value={general.companyPhone} onChange={(e) => setGeneral({ ...general, companyPhone: e.target.value })} />
                        </div>
                        <div className="admin-form-group">
                            <label className="admin-label">Web Sitesi</label>
                            <input className="admin-input" value={general.companyWebsite} onChange={(e) => setGeneral({ ...general, companyWebsite: e.target.value })} />
                        </div>
                    </div>
                    <div className="admin-form-group">
                        <label className="admin-label">Adres</label>
                        <input className="admin-input" value={general.companyAddress} onChange={(e) => setGeneral({ ...general, companyAddress: e.target.value })} />
                    </div>

                    <h3 style={{ marginTop: '28px', marginBottom: '16px' }}>Varsayılanlar</h3>
                    <div className="admin-form-row">
                        <div className="admin-form-group">
                            <label className="admin-label">KDV Oranı (%)</label>
                            <input className="admin-input" type="number" value={general.defaultKdvRate} onChange={(e) => setGeneral({ ...general, defaultKdvRate: Number(e.target.value) })} />
                        </div>
                        <div className="admin-form-group">
                            <label className="admin-label">Varsayılan Para Birimi</label>
                            <select className="admin-select" value={general.defaultCurrency} onChange={(e) => setGeneral({ ...general, defaultCurrency: e.target.value })}>
                                <option value="TRY">₺ TRY</option><option value="EUR">€ EUR</option><option value="USD">$ USD</option>
                            </select>
                        </div>
                    </div>
                    <div className="admin-form-row">
                        <div className="admin-form-group">
                            <label className="admin-label">Teklif No Ön Eki</label>
                            <input className="admin-input" value={general.quotePrefix} onChange={(e) => setGeneral({ ...general, quotePrefix: e.target.value })} />
                        </div>
                        <div className="admin-form-group">
                            <label className="admin-label">Sözleşme No Ön Eki</label>
                            <input className="admin-input" value={general.contractPrefix} onChange={(e) => setGeneral({ ...general, contractPrefix: e.target.value })} />
                        </div>
                    </div>

                    <div style={{ marginTop: '20px' }}>
                        <button className="admin-btn admin-btn-primary" onClick={saveGeneral} disabled={saving}>
                            <Save size={14} /> {saving ? 'Kaydediliyor...' : 'Kaydet'}
                        </button>
                    </div>
                </div>
            )}

            {activeSection === 'contract' && (
                <div className="admin-table-wrapper" style={{ padding: '24px' }}>
                    <h3 style={{ marginBottom: '8px' }}>Sözleşme Maddeleri</h3>
                    <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '16px' }}>
                        Placeholder'lar: {'{{COMPANY_NAME}}'}, {'{{CLIENT_NAME}}'}, {'{{TOTAL}}'}, {'{{DURATION}}'}, {'{{SERVICES_TABLE}}'}
                    </p>

                    {(contractTemplate.clauses || []).map((clause, idx) => (
                        <div key={idx} className="admin-form-group">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <label className="admin-label">Madde {idx + 1}</label>
                                <button type="button" className="admin-btn admin-btn-sm admin-btn-ghost" onClick={() => removeClause(idx)} style={{ color: '#ef4444', fontSize: '0.75rem' }}>Kaldır</button>
                            </div>
                            <textarea className="admin-textarea" value={clause} onChange={(e) => updateClause(idx, e.target.value)} style={{ minHeight: '60px' }} />
                        </div>
                    ))}

                    <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                        <button type="button" className="admin-btn admin-btn-secondary" onClick={addClause}>+ Madde Ekle</button>
                        <button className="admin-btn admin-btn-primary" onClick={saveContractTemplate} disabled={saving}>
                            <Save size={14} /> {saving ? 'Kaydediliyor...' : 'Şablonu Kaydet'}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default TemplatesView;
