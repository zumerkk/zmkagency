import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppWidget = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Show after 3 seconds for better UX (don't block view immediately)
        const timer = setTimeout(() => setIsVisible(true), 3000);
        return () => clearTimeout(timer);
    }, []);

    const phoneNumber = "905000000000"; // Replace with real number
    const defaultMessage = "Merhaba, dijital dönüşüm için bilgi almak istiyorum.";

    const handleClick = () => {
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;
        window.open(url, '_blank');
    };

    if (!isVisible) return null;

    return (
        <div
            onClick={handleClick}
            style={{
                position: 'fixed',
                bottom: '30px',
                right: '30px',
                backgroundColor: '#25D366',
                color: '#fff',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(37, 211, 102, 0.4)',
                zIndex: 9999,
                transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.1)";
                e.currentTarget.style.boxShadow = "0 10px 25px rgba(37, 211, 102, 0.6)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(37, 211, 102, 0.4)";
            }}
            role="button"
            aria-label="Chat on WhatsApp"
        >
            <MessageCircle size={32} />
            {/* Notification Badge */}
            <div style={{
                position: 'absolute',
                top: '-5px',
                right: '-5px',
                background: '#ff3b30',
                width: '15px',
                height: '15px',
                borderRadius: '50%',
                border: '2px solid #000'
            }}></div>
        </div>
    );
};

export default WhatsAppWidget;
