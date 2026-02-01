import React from 'react';

const LegalPage = ({ title, text, date }) => {
    return (
        <div className="page-wrapper" style={{ paddingTop: '120px', paddingBottom: '100px', minHeight: '100vh' }}>
            <div className="container">
                <h1 className="section-title" style={{ marginBottom: '20px' }}>{title}</h1>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '40px' }}>{date}</p>

                <div className="glass-panel" style={{ padding: '40px' }}>
                    <p style={{ lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>{text}</p>
                </div>
            </div>
        </div>
    );
};

export default LegalPage;
