import React from 'react';
import { Home, RefreshCw } from 'lucide-react';
import '../styles/Pricing.css'; // Reusing premium styles

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#000',
                    color: '#fff',
                    textAlign: 'center',
                    padding: '20px'
                }}>
                    <h1 style={{
                        fontSize: '3rem',
                        marginBottom: '20px',
                        background: 'linear-gradient(135deg, #f87171 0%, #dc2626 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        Something went wrong.
                    </h1>
                    <p style={{ color: '#888', marginBottom: '40px' }}>
                        Don't worry, our notification systems have been alerted.
                    </p>
                    <button
                        onClick={() => window.location.href = '/'}
                        className="pricing-cta"
                        style={{ display: 'inline-flex', gap: '10px', alignItems: 'center' }}
                    >
                        <Home size={20} /> Return Home
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
