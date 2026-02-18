import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LeadMagnet = () => {
    const [phone, setPhone] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here we would typically send this to an API
        console.log("Lead Magnet Request:", phone);
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
        setPhone('');
    };

    return (
        <section className="py-20 bg-gradient-to-br from-purple-900/20 to-black relative overflow-hidden">
            <div className="absolute inset-0 noise-overlay opacity-30"></div>
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 backdrop-blur-md">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="text-purple-400 font-mono text-sm tracking-wider uppercase mb-2 block">
                                Ücretsiz Kaynak
                            </span>
                            <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                                30 Günlük Instagram İçerik Planı
                            </h3>
                            <p className="text-gray-400 mb-6 font-light leading-relaxed">
                                Artık "ne paylaşacağım?" derdine son. Ajans kalitesinde hazırlanmış, etkileşim garantili 30 günlük içerik takviminizi ücretsiz indirin.
                            </p>
                            <ul className="space-y-2 mb-6 text-gray-400 text-sm">
                                <li className="flex items-center gap-2">
                                    <span className="text-green-400">✓</span> Viral Fikirler
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-green-400">✓</span> Story & Reels Senaryoları
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-green-400">✓</span> Hashtag Stratejisi
                                </li>
                            </ul>
                        </div>
                        <div className="bg-black/40 p-6 rounded-xl border border-white/5">
                            <AnimatePresence mode="wait">
                                {submitted ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="text-center py-12"
                                    >
                                        <div className="text-5xl mb-4">🚀</div>
                                        <h4 className="text-xl font-bold text-white mb-2">Harika!</h4>
                                        <p className="text-gray-400">Rehber telefon numaranıza gönderildi.</p>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onSubmit={handleSubmit}
                                        className="space-y-4"
                                    >
                                        <h4 className="text-lg font-medium text-white mb-4">Hemen İndirin</h4>
                                        <div>
                                            <input
                                                type="tel"
                                                placeholder="Telefon numaranız"
                                                required
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02]"
                                        >
                                            PDF'i Gönder
                                        </button>
                                        <p className="text-xs text-center text-gray-500 mt-4">
                                            Spam yok. Sadece değer.
                                        </p>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LeadMagnet;
