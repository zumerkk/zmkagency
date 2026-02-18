import React, { useEffect, useState } from 'react';
import { Plus, Search, X } from 'lucide-react';

const ClientsView = ({ api, onViewClient }) => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({ companyName: '', contactName: '', phone: '', email: '', address: '', website: '', sector: '', status: 'Aktif', taxOffice: '', taxNumber: '' });

    const fetchClients = () => {
        setLoading(true);
        api.get(`/clients?status=${statusFilter}&search=${search}`)
            .then(setClients)
            .catch(console.error)
            .finally(() => setLoading(false));
    };

    useEffect(() => { fetchClients(); }, [statusFilter, search]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/clients', form);
            setShowModal(false);
            setForm({ companyName: '', contactName: '', phone: '', email: '', address: '', website: '', sector: '', status: 'Aktif', taxOffice: '', taxNumber: '' });
            fetchClients();
        } catch (err) {
            alert('Hata: ' + err.message);
        }
    };

    return (
        <>
            <div className="admin-header">
                <div>
                    <h1>Müşteriler</h1>
                    <p className="admin-header-subtitle">{clients.length} müşteri kayıtlı</p>
                </div>
                <button className="admin-btn admin-btn-primary" onClick={() => setShowModal(true)}>
                    <Plus size={16} /> Yeni Müşteri
                </button>
            </div>

            <div className="admin-toolbar">
                <div className="admin-search-bar">
                    <Search size={16} color="#555" />
                    <input placeholder="Müşteri ara..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <select className="admin-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="all">Tüm Durumlar</option>
                    <option value="Aktif">Aktif</option>
                    <option value="Pasif">Pasif</option>
                    <option value="Potansiyel">Potansiyel</option>
                </select>
            </div>

            {loading ? (
                <div className="admin-loading"><div className="admin-spinner" /> Yükleniyor...</div>
            ) : clients.length === 0 ? (
                <div className="admin-empty">
                    <div className="admin-empty-icon">👥</div>
                    <p>Henüz müşteri yok</p>
                </div>
            ) : (
                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Firma</th>
                                <th>Yetkili</th>
                                <th>Telefon</th>
                                <th>Sektör</th>
                                <th>Durum</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients.map(c => (
                                <tr key={c.id} className="clickable-row" onClick={() => onViewClient(c.id)}>
                                    <td><strong>{c.companyName}</strong></td>
                                    <td>{c.contactName || '-'}</td>
                                    <td>{c.phone || '-'}</td>
                                    <td>{c.sector || '-'}</td>
                                    <td>
                                        <span className={`admin-badge ${c.status === 'Aktif' ? 'admin-badge-success' : c.status === 'Potansiyel' ? 'admin-badge-warning' : 'admin-badge-neutral'}`}>
                                            {c.status}
                                        </span>
                                    </td>
                                    <td style={{ textAlign: 'right', color: '#dc2626' }}>Detay →</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* New Client Modal */}
            {showModal && (
                <div className="admin-modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
                    <div className="admin-modal">
                        <div className="admin-modal-header">
                            <h3>Yeni Müşteri Ekle</h3>
                            <button className="admin-btn-icon admin-btn-ghost" onClick={() => setShowModal(false)}><X size={18} /></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="admin-modal-body">
                                <div className="admin-form-group">
                                    <label className="admin-label">Firma Adı *</label>
                                    <input className="admin-input" required value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })} />
                                </div>
                                <div className="admin-form-row">
                                    <div className="admin-form-group">
                                        <label className="admin-label">Yetkili Ad Soyad</label>
                                        <input className="admin-input" value={form.contactName} onChange={(e) => setForm({ ...form, contactName: e.target.value })} />
                                    </div>
                                    <div className="admin-form-group">
                                        <label className="admin-label">Durum</label>
                                        <select className="admin-select" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                                            <option value="Aktif">Aktif</option>
                                            <option value="Pasif">Pasif</option>
                                            <option value="Potansiyel">Potansiyel</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="admin-form-row">
                                    <div className="admin-form-group">
                                        <label className="admin-label">Telefon</label>
                                        <input className="admin-input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                                    </div>
                                    <div className="admin-form-group">
                                        <label className="admin-label">E-posta</label>
                                        <input className="admin-input" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                                    </div>
                                </div>
                                <div className="admin-form-group">
                                    <label className="admin-label">Adres</label>
                                    <input className="admin-input" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
                                </div>
                                <div className="admin-form-row">
                                    <div className="admin-form-group">
                                        <label className="admin-label">Web Sitesi</label>
                                        <input className="admin-input" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
                                    </div>
                                    <div className="admin-form-group">
                                        <label className="admin-label">Sektör</label>
                                        <input className="admin-input" value={form.sector} onChange={(e) => setForm({ ...form, sector: e.target.value })} />
                                    </div>
                                </div>
                                <div className="admin-form-row">
                                    <div className="admin-form-group">
                                        <label className="admin-label">Vergi Dairesi</label>
                                        <input className="admin-input" value={form.taxOffice} onChange={(e) => setForm({ ...form, taxOffice: e.target.value })} />
                                    </div>
                                    <div className="admin-form-group">
                                        <label className="admin-label">Vergi No</label>
                                        <input className="admin-input" value={form.taxNumber} onChange={(e) => setForm({ ...form, taxNumber: e.target.value })} />
                                    </div>
                                </div>
                            </div>
                            <div className="admin-modal-footer">
                                <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setShowModal(false)}>İptal</button>
                                <button type="submit" className="admin-btn admin-btn-primary">Kaydet</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default ClientsView;
