import React from 'react';
import { X, Mail, Phone, Calendar, Tag, CheckCircle } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

const LeadDetailModal = ({ lead, onClose, onMarkRead }) => {
    if (!lead) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(5px)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px'
        }} onClick={(e) => e.target === e.currentTarget && onClose()}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                style={{
                    width: '100%',
                    maxWidth: '600px',
                    background: '#111',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: '0 50px 100px -20px rgba(0,0,0,0.5)'
                }}
            >
                {/* Header */}
                <div style={{
                    padding: '20px 30px',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'rgba(255,255,255,0.02)'
                }}>
                    <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#fff' }}>Mesaj Detayı</h3>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}>
                        <X size={24} />
                    </button>
                </div>

                {/* Body */}
                <div style={{ padding: '30px' }}>
                    <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', alignItems: 'center' }}>
                        <div style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #2997ff, #00d4ff)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.5rem',
                            fontWeight: 'bold'
                        }}>
                            {lead.name ? lead.name.charAt(0).toUpperCase() : '?'}
                        </div>
                        <div>
                            <h2 style={{ margin: '0 0 5px 0', fontSize: '1.4rem' }}>{lead.name}</h2>
                            <p style={{ margin: 0, color: '#888', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ padding: '4px 10px', background: 'rgba(255,255,255,0.1)', borderRadius: '15px', fontSize: '12px' }}>{lead.type}</span>
                                <span style={{ fontSize: '12px', opacity: 0.7 }}>
                                    {lead.timestamp?.toDate ? lead.timestamp.toDate().toLocaleString('tr-TR') : 'Tarih Yok'}
                                </span>
                            </p>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gap: '20px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '15px', borderRadius: '10px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#666', fontSize: '12px', marginBottom: '8px' }}>
                                    <Mail size={14} /> E-POSTA
                                </label>
                                <div style={{ color: '#fff' }}>{lead.email || '-'}</div>
                            </div>
                            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '15px', borderRadius: '10px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#666', fontSize: '12px', marginBottom: '8px' }}>
                                    <Tag size={14} /> BÜTÇE / PLAN
                                </label>
                                <div style={{ color: '#fff' }}>{lead.budget || 'Belirtilmedi'}</div>
                            </div>
                        </div>

                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '10px' }}>
                            <label style={{ display: 'block', color: '#666', fontSize: '12px', marginBottom: '10px' }}>MESAJ / DETAYLAR</label>
                            <p style={{ margin: 0, lineHeight: '1.6', color: '#ccc', whiteSpace: 'pre-line' }}>
                                {lead.message || lead.details || 'Mesaj içeriği yok.'}
                            </p>
                        </div>

                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '15px', borderRadius: '10px' }}>
                            <label style={{ display: 'block', color: '#666', fontSize: '12px', marginBottom: '10px' }}>SEÇİLEN HİZMETLER</label>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                {lead.service ? lead.service.split(',').map((s, i) => (
                                    <span key={i} style={{ padding: '5px 12px', background: 'rgba(41, 151, 255, 0.15)', color: '#2997ff', borderRadius: '8px', fontSize: '13px' }}>
                                        {s.trim()}
                                    </span>
                                )) : 'Yok'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div style={{ padding: '20px 30px', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'flex-end', gap: '15px' }}>
                    <a href={`mailto:${lead.email}`} style={{
                        padding: '10px 20px',
                        background: 'rgba(255,255,255,0.1)',
                        color: '#fff',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        <Mail size={16} /> Yanıtla
                    </a>
                    {lead.status === 'New' && (
                        <button onClick={() => onMarkRead(lead.id)} style={{
                            padding: '10px 20px',
                            background: '#2997ff',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            <CheckCircle size={16} /> Okundu İşaretle
                        </button>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default LeadDetailModal;
