import React, { useEffect, useState } from 'react';
import { ArrowLeft, Download, Mail, Phone, Globe, MapPin, MessageSquare, Send, FileText } from 'lucide-react';

const ClientDetailView = ({ api, clientId, onBack }) => {
    const [client, setClient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [noteText, setNoteText] = useState('');
    const [noteType, setNoteType] = useState('note');

    useEffect(() => {
        if (!clientId) return;
        api.get(`/clients/${clientId}`).then(setClient).catch(console.error).finally(() => setLoading(false));
    }, [clientId]);

    const addNote = async () => {
        if (!noteText.trim()) return;
        try {
            await api.post(`/clients/${clientId}/notes`, { text: noteText, type: noteType });
            setNoteText('');
            const updated = await api.get(`/clients/${clientId}`);
            setClient(updated);
        } catch (err) {
            alert('Hata: ' + err.message);
        }
    };

    const downloadFile = async (format) => {
        try {
            await api.downloadFile(`/documents/client-file/${clientId}?format=${format}`, `ZMK_Musteri_${client.companyName.replace(/\s+/g, '_')}.${format}`);
        } catch (err) {
            alert('İndirme hatası: ' + err.message);
        }
    };

    const generateMailDraft = () => {
        const subject = encodeURIComponent(`ZMK Agency — ${client.companyName}`);
        const body = encodeURIComponent(`Sayın ${client.contactName || 'Yetkili'},\n\nZMK Agency olarak sizinle çalışmaktan memnuniyet duyarız.\n\nSaygılarımızla,\nZMK AGENCY\nzmkagency.com`);
        window.open(`mailto:${client.email}?subject=${subject}&body=${body}`);
    };

    if (loading) return <div className="admin-loading"><div className="admin-spinner" /> Yükleniyor...</div>;
    if (!client) return <div className="admin-empty">Müşteri bulunamadı.</div>;

    const noteIcons = { note: '📝', call: '📞', meeting: '🤝', email: '📧' };

    return (
        <>
            <div className="admin-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <button className="admin-btn admin-btn-ghost" onClick={onBack}><ArrowLeft size={18} /></button>
                    <div>
                        <h1>{client.companyName}</h1>
                        <p className="admin-header-subtitle">
                            <span className={`admin-badge ${client.status === 'Aktif' ? 'admin-badge-success' : client.status === 'Potansiyel' ? 'admin-badge-warning' : 'admin-badge-neutral'}`}>
                                {client.status}
                            </span>
                            {' '}{client.sector && `• ${client.sector}`}
                        </p>
                    </div>
                </div>
                <div className="admin-download-group">
                    <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => downloadFile('pdf')}><Download size={14} /> PDF</button>
                    <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => downloadFile('docx')}><FileText size={14} /> DOCX</button>
                    {client.email && <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={generateMailDraft}><Mail size={14} /> Mail Taslağı</button>}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                {/* Contact Info */}
                <div className="admin-table-wrapper" style={{ padding: '20px' }}>
                    <h3 style={{ marginBottom: '16px', fontSize: '0.95rem' }}>İletişim Bilgileri</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {client.contactName && <InfoRow icon={<span>👤</span>} label="Yetkili" value={client.contactName} />}
                        {client.phone && <InfoRow icon={<Phone size={14} />} label="Telefon" value={client.phone} />}
                        {client.email && <InfoRow icon={<Mail size={14} />} label="E-posta" value={client.email} />}
                        {client.address && <InfoRow icon={<MapPin size={14} />} label="Adres" value={client.address} />}
                        {client.website && <InfoRow icon={<Globe size={14} />} label="Web" value={client.website} />}
                    </div>
                </div>

                {/* Tax Info */}
                <div className="admin-table-wrapper" style={{ padding: '20px' }}>
                    <h3 style={{ marginBottom: '16px', fontSize: '0.95rem' }}>Firma Bilgileri</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {client.taxOffice && <InfoRow icon={<span>🏛️</span>} label="Vergi Dairesi" value={client.taxOffice} />}
                        {client.taxNumber && <InfoRow icon={<span>🔢</span>} label="Vergi No" value={client.taxNumber} />}
                        <InfoRow icon={<span>📅</span>} label="Kayıt" value={new Date(client.createdAt).toLocaleDateString('tr-TR')} />
                    </div>
                </div>
            </div>

            {/* Notes Timeline */}
            <div className="admin-table-wrapper">
                <div className="admin-table-header">
                    <h3><MessageSquare size={16} style={{ marginRight: 6, verticalAlign: 'middle' }} /> Notlar & Görüşme Geçmişi</h3>
                </div>
                <div style={{ padding: '16px', borderBottom: '1px solid var(--admin-border)' }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
                        <select className="admin-select" style={{ maxWidth: '130px' }} value={noteType} onChange={(e) => setNoteType(e.target.value)}>
                            <option value="note">📝 Not</option>
                            <option value="call">📞 Arama</option>
                            <option value="meeting">🤝 Toplantı</option>
                            <option value="email">📧 E-posta</option>
                        </select>
                        <input className="admin-input" placeholder="Not ekle..." value={noteText} onChange={(e) => setNoteText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addNote()} style={{ flex: 1 }} />
                        <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={addNote}><Send size={14} /></button>
                    </div>
                </div>
                <div style={{ padding: '16px' }}>
                    {(!client.notes || client.notes.length === 0) ? (
                        <div className="admin-empty" style={{ padding: '20px' }}>Henüz not eklenmemiş</div>
                    ) : (
                        <div className="admin-timeline">
                            {client.notes.map((note, idx) => (
                                <div key={idx} className="admin-timeline-item">
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                            <span>{noteIcons[note.type] || '📝'}</span>
                                            <span style={{ fontSize: '0.75rem', color: '#888' }}>{new Date(note.createdAt).toLocaleString('tr-TR')}</span>
                                            <span style={{ fontSize: '0.7rem', color: '#555' }}>— {note.createdBy}</span>
                                        </div>
                                        <p style={{ margin: 0, fontSize: '0.9rem' }}>{note.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

const InfoRow = ({ icon, label, value }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
        <span style={{ color: '#888', width: '16px', display: 'flex', justifyContent: 'center' }}>{icon}</span>
        <span style={{ color: '#888', minWidth: '80px' }}>{label}:</span>
        <span>{value}</span>
    </div>
);

export default ClientDetailView;
