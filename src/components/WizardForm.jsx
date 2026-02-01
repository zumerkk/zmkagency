import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Check, Sparkles, X, Loader2 } from 'lucide-react';
import '../styles/WizardForm.css';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const WizardForm = ({ t, onClose, initialData = {}, source = 'Quick Quote Wizard' }) => {
    const [step, setStep] = useState(initialData.budget ? 3 : 1); // Skip to details if budget (plan) is pre-selected
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        type: initialData.type || [],
        budget: initialData.budget || '',
        details: initialData.details || '',
        contact: '',
        name: ''
    });

    const totalSteps = 3;

    // Close on overlay click
    const handleOverlayClick = (e) => {
        if (e.target.className === 'wizard-overlay') {
            onClose();
        }
    };

    const handleTypeSelect = (type) => {
        setFormData(prev => {
            if (prev.type.includes(type)) {
                return { ...prev, type: prev.type.filter(t => t !== type) };
            }
            return { ...prev, type: [...prev.type, type] };
        });
    };

    const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    const handleFinish = async () => {
        setIsSubmitting(true);
        try {
            await addDoc(collection(db, 'leads'), {
                name: formData.name,
                email: formData.contact,
                message: `Bütçe: ${formData.budget} \nDetaylar: ${formData.details}`,
                service: formData.type.join(', '),
                budget: formData.budget,
                type: source, // Dynamic source
                status: 'New',
                timestamp: serverTimestamp()
            });
            setIsSuccess(true);
            setTimeout(() => {
                onClose();
            }, 3000);
        } catch (error) {
            console.error("Error submitting wizard: ", error);
            // Handle error state if needed, for now just log
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="wizard-overlay" onClick={handleOverlayClick}>
            <motion.div
                className="wizard-container glass-panel"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
            >
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        background: 'transparent',
                        border: 'none',
                        color: 'rgba(255,255,255,0.5)',
                        cursor: 'pointer',
                        zIndex: 10
                    }}
                >
                    <X size={24} />
                </button>

                {isSuccess ? (
                    <div className="success-state" style={{ textAlign: 'center', padding: '40px 20px' }}>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 10 }}
                        >
                            <Sparkles size={64} color="#2997ff" style={{ margin: '0 auto 20px' }} />
                        </motion.div>
                        <h3 style={{ fontSize: '2rem', marginBottom: '10px' }}>Harika!</h3>
                        <p style={{ color: '#888' }}>Bilgileriniz bize ulaştı. En kısa sürede dönüş yapacağız.</p>
                    </div>
                ) : (
                    <>
                        <div className="wizard-header">
                            <div className="progress-bar">
                                <div className="progress-fill" style={{ width: `${(step / totalSteps) * 100}%` }}></div>
                            </div>
                            <h3>
                                {step === 1 && t.step1Title}
                                {step === 2 && t.step2Title}
                                {step === 3 && t.step3Title}
                            </h3>
                        </div>

                        <AnimatePresence mode='wait'>
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="wizard-step"
                                >
                                    <div className="options-grid">
                                        {t.typeOptions.map((opt, idx) => (
                                            <div
                                                key={idx}
                                                className={`wizard-option ${formData.type.includes(opt) ? 'selected' : ''}`}
                                                onClick={() => handleTypeSelect(opt)}
                                            >
                                                <div className="checkbox">{formData.type.includes(opt) && <Check size={14} />}</div>
                                                <span>{opt}</span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="wizard-step"
                                >
                                    <div className="options-grid">
                                        {t.budgetOptions.map((opt, idx) => (
                                            <div
                                                key={idx}
                                                className={`wizard-option ${formData.budget === opt ? 'selected' : ''}`}
                                                onClick={() => setFormData({ ...formData, budget: opt })}
                                            >
                                                <div className="radio">{formData.budget === opt && <div className="dot"></div>}</div>
                                                <span>{opt}</span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="wizard-step"
                                >
                                    <textarea
                                        className="wizard-input"
                                        placeholder={t.detailsPlaceholder}
                                        value={formData.details}
                                        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                                    />
                                    <div className="contact-inputs">
                                        <input
                                            type="text"
                                            placeholder={t.namePlaceholder}
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                        <input
                                            type="email"
                                            placeholder={t.contactPlaceholder}
                                            value={formData.contact}
                                            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="wizard-footer">
                            {step > 1 && (
                                <button className="wizard-btn secondary" onClick={prevStep}>
                                    <ChevronLeft size={16} /> {t.back}
                                </button>
                            )}
                            {step < totalSteps ? (
                                <button className="wizard-btn primary" onClick={nextStep} disabled={step === 1 && formData.type.length === 0}>
                                    {t.next} <ChevronRight size={16} />
                                </button>
                            ) : (
                                <button
                                    className="wizard-btn primary finish"
                                    onClick={handleFinish}
                                    disabled={isSubmitting || !formData.contact}
                                >
                                    {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : <><Sparkles size={16} /> {t.finish}</>}
                                </button>
                            )}
                        </div>
                    </>
                )}
            </motion.div>
        </div>
    );
};

export default WizardForm;
