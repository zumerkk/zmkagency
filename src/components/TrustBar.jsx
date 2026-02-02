import React from 'react';
import { motion } from 'framer-motion';

const TrustBar = () => {
    const brands = [
        "Google Partner",
        "Meta Business",
        "Shopify Expert",
        "AWS Cloud",
        "Yandex"
    ];

    return (
        <div className="w-full bg-black/50 border-y border-white/5 py-8 overflow-hidden backdrop-blur-sm">
            <div className="container mx-auto px-4">
                <p className="text-center text-white/40 text-sm mb-6 font-mono tracking-widest uppercase">
                    Technology Partners & Certifications
                </p>

                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    {/* Placeholder for logos - using text for now to be safe, but styled like logos */}
                    {brands.map((brand, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white/80 to-white/40 font-display"
                        >
                            {brand}
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TrustBar;
