import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { db } from '../../../firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { showToast } from '../../../hooks/useFirestoreCRUD';

const SETTINGS_DOC = 'app_settings';

const SettingsView = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [settings, setSettings] = useState({
        companyName: 'ZMK AGENCY',
        companyTitle: 'ZMK Dijital Ajans',
        taxOffice: '',
        taxNumber: '',
        address: '',
        phone: '',
        email: '',
        website: 'zmkagency.com',
        defaultCurrency: 'TRY',
        defaultTaxRate: '18',
        defaultPaymentMethods: 'Havale/EFT, Kredi Kartı, Nakit',
        quotePrefix: 'ZMK-',
        contractPrefix: 'SZ-',
        quoteTemplate: 'Sayın {{müşteri}},\n\nAşağıdaki hizmet teklifimizi incelemenizi rica ederiz.\n\nSaygılarımızla,\nZMK AGENCY',
        contractTemplate: 'İşbu sözleşme, aşağıda bilgileri belirtilen taraflar arasında karşılıklı olarak imzalanmıştır.\n\nTaraf 1: ZMK AGENCY\nTaraf 2: {{müşteri}}\n\nKapsam: {{kapsam}}\nÜcret: {{tutar}}',
    });

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const snap = await getDoc(doc(db, 'settings', SETTINGS_DOC));
            if (snap.exists()) {
                setSettings(prev => ({ ...prev, ...snap.data() }));
            }
        } catch (err) {
            console.error('Settings load error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await setDoc(doc(db, 'settings', SETTINGS_DOC), {
                ...settings,
                updatedAt: serverTimestamp(),
            }, { merge: true });
            showToast('Ayarlar kaydedildi');
        } catch (err) {
            showToast('Kaydetme hatası: ' + err.message, 'error');
        } finally {
            setSaving(false);
        }
    };

    const set = (k, v) => setSettings(s => ({ ...s, [k]: v }));

    if (loading) return <div className="admin-loading"><div className="admin-spinner" /> Yükleniyor...</div>;

    return (
        <>
            <div className="admin-header">
                <div><h1>Ayarlar</h1><p className="admin-header-subtitle">Sistem ayarları ve şablonlar</p></div>
                <button className="admin-btn admin-btn-primary" onClick={handleSave} disabled={saving}>
                    <Save size={15} /> {saving ? 'Kaydediliyor...' : 'Kaydet'}
                </button>
            </div>

            {/* Company Info */}
            <div className="admin-settings-section">
                <h3>Şirket Bilgileri</h3>
                <div className="admin-form-row">
                    <div className="admin-form-group"><label className="admin-label">Şirket Adı</label><input className="admin-input" value={settings.companyName} onChange={e => set('companyName', e.target.value)} /></div>
                    <div className="admin-form-group"><label className="admin-label">Ticari Ünvan</label><input className="admin-input" value={settings.companyTitle} onChange={e => set('companyTitle', e.target.value)} /></div>
                </div>
                <div className="admin-form-row">
                    <div className="admin-form-group"><label className="admin-label">Vergi Dairesi</label><input className="admin-input" value={settings.taxOffice} onChange={e => set('taxOffice', e.target.value)} /></div>
                    <div className="admin-form-group"><label className="admin-label">Vergi No</label><input className="admin-input" value={settings.taxNumber} onChange={e => set('taxNumber', e.target.value)} /></div>
                </div>
                <div className="admin-form-group"><label className="admin-label">Adres</label><textarea className="admin-textarea" value={settings.address} onChange={e => set('address', e.target.value)} /></div>
                <div className="admin-form-row">
                    <div className="admin-form-group"><label className="admin-label">Telefon</label><input className="admin-input" value={settings.phone} onChange={e => set('phone', e.target.value)} /></div>
                    <div className="admin-form-group"><label className="admin-label">E-posta</label><input className="admin-input" value={settings.email} onChange={e => set('email', e.target.value)} /></div>
                </div>
                <div className="admin-form-group"><label className="admin-label">Web Sitesi</label><input className="admin-input" value={settings.website} onChange={e => set('website', e.target.value)} /></div>
            </div>

            {/* Defaults */}
            <div className="admin-settings-section">
                <h3>Varsayılan Değerler</h3>
                <div className="admin-form-row-3">
                    <div className="admin-form-group"><label className="admin-label">Para Birimi</label>
                        <select className="admin-select" value={settings.defaultCurrency} onChange={e => set('defaultCurrency', e.target.value)}>
                            <option value="TRY">₺ TRY</option><option value="EUR">€ EUR</option><option value="USD">$ USD</option>
                        </select>
                    </div>
                    <div className="admin-form-group"><label className="admin-label">KDV Oranı (%)</label><input className="admin-input" type="number" value={settings.defaultTaxRate} onChange={e => set('defaultTaxRate', e.target.value)} /></div>
                    <div className="admin-form-group"><label className="admin-label">Ödeme Yöntemleri</label><input className="admin-input" value={settings.defaultPaymentMethods} onChange={e => set('defaultPaymentMethods', e.target.value)} placeholder="Virgülle ayırın" /></div>
                </div>
                <div className="admin-form-row">
                    <div className="admin-form-group"><label className="admin-label">Teklif No Prefix</label><input className="admin-input" value={settings.quotePrefix} onChange={e => set('quotePrefix', e.target.value)} /></div>
                    <div className="admin-form-group"><label className="admin-label">Sözleşme No Prefix</label><input className="admin-input" value={settings.contractPrefix} onChange={e => set('contractPrefix', e.target.value)} /></div>
                </div>
            </div>

            {/* Templates */}
            <div className="admin-settings-section">
                <h3>Şablonlar</h3>
                <div className="admin-form-group">
                    <label className="admin-label">Teklif Şablonu</label>
                    <textarea className="admin-textarea" style={{ minHeight: 120 }} value={settings.quoteTemplate} onChange={e => set('quoteTemplate', e.target.value)} />
                    <p style={{ fontSize: '0.72rem', color: '#555', marginTop: 4 }}>Değişkenler: {'{{müşteri}}'}, {'{{tutar}}'}, {'{{kapsam}}'}</p>
                </div>
                <div className="admin-form-group">
                    <label className="admin-label">Sözleşme Şablonu</label>
                    <textarea className="admin-textarea" style={{ minHeight: 120 }} value={settings.contractTemplate} onChange={e => set('contractTemplate', e.target.value)} />
                </div>
            </div>
        </>
    );
};

export default SettingsView;
