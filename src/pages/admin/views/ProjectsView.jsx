import React, { useState } from 'react';
import { Plus, X, Search, Edit3, Trash2 } from 'lucide-react';
import { useFirestoreCRUD, useFirestoreList, showToast } from '../../../hooks/useFirestoreCRUD';

const STATUSES = ['Lead', 'Başladı', 'Devam Ediyor', 'Beklemede', 'Tamamlandı'];
const STATUS_COLORS = { Lead: 'admin-badge-neutral', 'Başladı': 'admin-badge-info', 'Devam Ediyor': 'admin-badge-warning', Beklemede: 'admin-badge-danger', 'Tamamlandı': 'admin-badge-success' };
const EMPTY = { title: '', customerId: '', customerName: '', status: 'Lead', startDate: '', endDate: '', responsible: '', notes: '', tasks: [] };

const ProjectsView = () => {
    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState(EMPTY);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [newTask, setNewTask] = useState('');

    const filters = statusFilter !== 'all' ? [{ field: 'status', op: '==', value: statusFilter }] : [];
    const { items: projects, loading, add, update, remove } = useFirestoreCRUD('projects', { filters, pageSize: 50 });
    const customers = useFirestoreList('customers', 'companyName');

    const displayed = search ? projects.filter(p => p.title?.toLowerCase().includes(search.toLowerCase()) || p.customerName?.toLowerCase().includes(search.toLowerCase())) : projects;

    const openNew = () => { setForm(EMPTY); setEditId(null); setShowModal(true); };
    const openEdit = (p) => {
        setForm({ title: p.title || '', customerId: p.customerId || '', customerName: p.customerName || '', status: p.status || 'Lead', startDate: p.startDate || '', endDate: p.endDate || '', responsible: p.responsible || '', notes: p.notes || '', tasks: p.tasks || [] });
        setEditId(p.id); setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) { await update(editId, form); showToast('Proje güncellendi'); }
            else { await add(form); showToast('Proje oluşturuldu'); }
            setShowModal(false);
        } catch { showToast('Hata oluştu', 'error'); }
    };

    const handleDelete = async (id) => {
        if (!confirm('Bu projeyi silmek istediğinize emin misiniz?')) return;
        try { await remove(id); showToast('Proje silindi'); } catch { showToast('Hata', 'error'); }
    };

    const addTask = () => {
        if (!newTask.trim()) return;
        setForm(f => ({ ...f, tasks: [...(f.tasks || []), { text: newTask.trim(), done: false }] }));
        setNewTask('');
    };

    const toggleTask = async (projectId, idx) => {
        const project = projects.find(p => p.id === projectId);
        if (!project) return;
        const tasks = [...(project.tasks || [])];
        tasks[idx] = { ...tasks[idx], done: !tasks[idx].done };
        await update(projectId, { tasks });
    };

    const selectCustomer = (e) => {
        const c = customers.find(x => x.id === e.target.value);
        setForm(f => ({ ...f, customerId: c?.id || '', customerName: c?.companyName || '' }));
    };

    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

    return (
        <>
            <div className="admin-header">
                <div><h1>Projeler</h1><p className="admin-header-subtitle">{displayed.length} proje</p></div>
                <button className="admin-btn admin-btn-primary" onClick={openNew}><Plus size={15} /> Yeni Proje</button>
            </div>

            <div className="admin-toolbar">
                <div className="admin-search-bar"><Search size={15} color="#555" /><input placeholder="Proje ara..." value={search} onChange={e => setSearch(e.target.value)} /></div>
                <select className="admin-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                    <option value="all">Tüm Durumlar</option>
                    {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
            </div>

            {loading ? <div className="admin-loading"><div className="admin-spinner" /> Yükleniyor...</div> : displayed.length === 0 ? (
                <div className="admin-empty"><div className="admin-empty-icon">📂</div><p>Henüz proje yok</p></div>
            ) : (
                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead><tr><th>Proje</th><th>Müşteri</th><th>Durum</th><th>Başlangıç</th><th>Teslim</th><th>Sorumlu</th><th>Görevler</th><th style={{ width: 100 }}></th></tr></thead>
                        <tbody>
                            {displayed.map(p => {
                                const done = (p.tasks || []).filter(t => t.done).length;
                                const total = (p.tasks || []).length;
                                return (
                                    <tr key={p.id}>
                                        <td><strong>{p.title}</strong></td>
                                        <td>{p.customerName || '-'}</td>
                                        <td><span className={`admin-badge ${STATUS_COLORS[p.status] || 'admin-badge-neutral'}`}>{p.status}</span></td>
                                        <td style={{ fontSize: '0.8rem', color: '#888' }}>{p.startDate || '-'}</td>
                                        <td style={{ fontSize: '0.8rem', color: '#888' }}>{p.endDate || '-'}</td>
                                        <td>{p.responsible || '-'}</td>
                                        <td>{total > 0 ? <span className={`admin-badge ${done === total ? 'admin-badge-success' : 'admin-badge-neutral'}`}>{done}/{total}</span> : '-'}</td>
                                        <td>
                                            <div style={{ display: 'flex', gap: 4 }}>
                                                <button className="admin-btn admin-btn-sm admin-btn-ghost" onClick={() => openEdit(p)}><Edit3 size={14} /></button>
                                                <button className="admin-btn admin-btn-sm admin-btn-danger" onClick={() => handleDelete(p.id)}><Trash2 size={14} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {/* Inline task checklists */}
                    {displayed.filter(p => (p.tasks || []).length > 0).length > 0 && (
                        <div style={{ padding: '16px 20px', borderTop: '1px solid var(--admin-border)' }}>
                            <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#555', marginBottom: 12 }}>Görev Takibi</h4>
                            {displayed.filter(p => (p.tasks || []).length > 0).map(p => (
                                <div key={p.id} style={{ marginBottom: 14 }}>
                                    <div style={{ fontSize: '0.82rem', fontWeight: 600, marginBottom: 4 }}>{p.title}</div>
                                    <div className="admin-checklist">
                                        {p.tasks.map((t, i) => (
                                            <label key={i} className={`admin-checklist-item ${t.done ? 'done' : ''}`}>
                                                <input type="checkbox" checked={t.done} onChange={() => toggleTask(p.id, i)} />
                                                {t.text}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {showModal && (
                <div className="admin-modal-overlay" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
                    <div className="admin-modal admin-modal-wide">
                        <div className="admin-modal-header"><h3>{editId ? 'Proje Düzenle' : 'Yeni Proje'}</h3><button className="admin-btn-icon admin-btn-ghost" onClick={() => setShowModal(false)}><X size={18} /></button></div>
                        <form onSubmit={handleSubmit}>
                            <div className="admin-modal-body">
                                <div className="admin-form-group"><label className="admin-label">Proje Adı *</label><input className="admin-input" required value={form.title} onChange={e => set('title', e.target.value)} /></div>
                                <div className="admin-form-row">
                                    <div className="admin-form-group"><label className="admin-label">Müşteri</label>
                                        <select className="admin-select" value={form.customerId} onChange={selectCustomer}>
                                            <option value="">Seçiniz</option>
                                            {customers.map(c => <option key={c.id} value={c.id}>{c.companyName}</option>)}
                                        </select>
                                    </div>
                                    <div className="admin-form-group"><label className="admin-label">Durum</label>
                                        <select className="admin-select" value={form.status} onChange={e => set('status', e.target.value)}>
                                            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="admin-form-row">
                                    <div className="admin-form-group"><label className="admin-label">Başlangıç</label><input className="admin-input" type="date" value={form.startDate} onChange={e => set('startDate', e.target.value)} /></div>
                                    <div className="admin-form-group"><label className="admin-label">Teslim</label><input className="admin-input" type="date" value={form.endDate} onChange={e => set('endDate', e.target.value)} /></div>
                                </div>
                                <div className="admin-form-group"><label className="admin-label">Sorumlu</label><input className="admin-input" value={form.responsible} onChange={e => set('responsible', e.target.value)} /></div>
                                <div className="admin-form-group"><label className="admin-label">Notlar</label><textarea className="admin-textarea" value={form.notes} onChange={e => set('notes', e.target.value)} /></div>

                                <div className="admin-form-group">
                                    <label className="admin-label">Görevler</label>
                                    <div className="admin-checklist" style={{ marginBottom: 8 }}>
                                        {(form.tasks || []).map((t, i) => (
                                            <div key={i} className="admin-checklist-item">
                                                <span>{t.text}</span>
                                                <button type="button" className="admin-btn-icon admin-btn-ghost" onClick={() => setForm(f => ({ ...f, tasks: f.tasks.filter((_, j) => j !== i) }))} style={{ marginLeft: 'auto' }}><X size={14} /></button>
                                            </div>
                                        ))}
                                    </div>
                                    <div style={{ display: 'flex', gap: 8 }}>
                                        <input className="admin-input" placeholder="Yeni görev..." value={newTask} onChange={e => setNewTask(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTask())} />
                                        <button type="button" className="admin-btn admin-btn-secondary" onClick={addTask}>Ekle</button>
                                    </div>
                                </div>
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

export default ProjectsView;
