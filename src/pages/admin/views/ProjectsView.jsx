import React, { useEffect, useState } from 'react';
import { Plus, X, CheckCircle, Circle } from 'lucide-react';

const ProjectsView = ({ api }) => {
    const [projects, setProjects] = useState([]);
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('all');
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({ clientId: '', name: '', description: '', startDate: '', endDate: '', status: 'Planlandı', checklist: [] });
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        Promise.all([api.get('/projects'), api.get('/clients')])
            .then(([p, c]) => { setProjects(p); setClients(c); })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const fetchProjects = () => { api.get('/projects').then(setProjects).catch(console.error); };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const client = clients.find(c => c.id === form.clientId);
        try {
            await api.post('/projects', { ...form, clientName: client?.companyName || '' });
            setShowModal(false);
            setForm({ clientId: '', name: '', description: '', startDate: '', endDate: '', status: 'Planlandı', checklist: [] });
            fetchProjects();
        } catch (err) { alert('Hata: ' + err.message); }
    };

    const addChecklistItem = () => {
        if (!newTask.trim()) return;
        setForm({ ...form, checklist: [...form.checklist, { text: newTask, done: false }] });
        setNewTask('');
    };

    const toggleChecklist = async (projectId, idx) => {
        const project = projects.find(p => p.id === projectId);
        if (!project) return;
        const checklist = [...(project.checklist || [])];
        checklist[idx] = { ...checklist[idx], done: !checklist[idx].done };
        try {
            await api.put(`/projects/${projectId}`, { checklist });
            fetchProjects();
        } catch (err) { console.error(err); }
    };

    const filtered = statusFilter === 'all' ? projects : projects.filter(p => p.status === statusFilter);
    const statusColors = { 'Planlandı': 'admin-badge-info', 'Devam Ediyor': 'admin-badge-warning', 'Teslim Edildi': 'admin-badge-success' };

    return (
        <>
            <div className="admin-header">
                <div>
                    <h1>Projeler</h1>
                    <p className="admin-header-subtitle">{projects.length} proje</p>
                </div>
                <button className="admin-btn admin-btn-primary" onClick={() => setShowModal(true)}><Plus size={16} /> Yeni Proje</button>
            </div>

            <div className="admin-toolbar">
                <select className="admin-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="all">Tüm Durumlar</option>
                    <option value="Planlandı">Planlandı</option>
                    <option value="Devam Ediyor">Devam Ediyor</option>
                    <option value="Teslim Edildi">Teslim Edildi</option>
                </select>
            </div>

            {loading ? (
                <div className="admin-loading"><div className="admin-spinner" /> Yükleniyor...</div>
            ) : filtered.length === 0 ? (
                <div className="admin-empty"><div className="admin-empty-icon">📋</div><p>Proje bulunamadı</p></div>
            ) : (
                <div style={{ display: 'grid', gap: '16px' }}>
                    {filtered.map(p => (
                        <div key={p.id} className="admin-table-wrapper" style={{ padding: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '1rem' }}>{p.name}</h3>
                                    <p style={{ color: '#888', fontSize: '0.8rem', margin: '4px 0 0' }}>{p.clientName} • {p.startDate && `${new Date(p.startDate).toLocaleDateString('tr-TR')} → `}{p.endDate && new Date(p.endDate).toLocaleDateString('tr-TR')}</p>
                                </div>
                                <span className={`admin-badge ${statusColors[p.status] || 'admin-badge-neutral'}`}>{p.status}</span>
                            </div>
                            {p.description && <p style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '12px' }}>{p.description}</p>}
                            {p.checklist && p.checklist.length > 0 && (
                                <div className="admin-checklist">
                                    {p.checklist.map((item, idx) => (
                                        <div key={idx} className={`admin-checklist-item ${item.done ? 'done' : ''}`} onClick={() => toggleChecklist(p.id, idx)}>
                                            <input type="checkbox" checked={item.done} readOnly />
                                            {item.text}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {showModal && (
                <div className="admin-modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
                    <div className="admin-modal">
                        <div className="admin-modal-header">
                            <h3>Yeni Proje</h3>
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
                                <div className="admin-form-group">
                                    <label className="admin-label">Proje Adı *</label>
                                    <input className="admin-input" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                                </div>
                                <div className="admin-form-group">
                                    <label className="admin-label">Açıklama</label>
                                    <textarea className="admin-textarea" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                                </div>
                                <div className="admin-form-row">
                                    <div className="admin-form-group">
                                        <label className="admin-label">Başlangıç</label>
                                        <input className="admin-input" type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
                                    </div>
                                    <div className="admin-form-group">
                                        <label className="admin-label">Bitiş</label>
                                        <input className="admin-input" type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
                                    </div>
                                </div>
                                <div className="admin-form-group">
                                    <label className="admin-label">Teslim Kalemleri</label>
                                    <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                                        <input className="admin-input" placeholder="Kalem ekle..." value={newTask} onChange={(e) => setNewTask(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addChecklistItem())} />
                                        <button type="button" className="admin-btn admin-btn-secondary admin-btn-sm" onClick={addChecklistItem}>Ekle</button>
                                    </div>
                                    {form.checklist.map((item, idx) => (
                                        <div key={idx} style={{ fontSize: '0.85rem', padding: '4px 0', color: '#ccc' }}>• {item.text}</div>
                                    ))}
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

export default ProjectsView;
