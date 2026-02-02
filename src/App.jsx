import React, { useState, Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';
import { content } from './translations';
import './index.css';

// Lazy Load Pages for Performance
const Home = lazy(() => import('./pages/Home'));
const Vision = lazy(() => import('./pages/Vision'));
const ServiceDetail = lazy(() => import('./pages/services/ServiceDetail'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const LegalPage = lazy(() => import('./pages/legal/LegalPage'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Login = lazy(() => import('./pages/admin/Login'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading Fallback Component
const PageLoader = () => (
  <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', color: '#fff' }}>
    <p>Loading ZMK Experience...</p>
  </div>
);

function App() {
  const [lang, setLang] = useState('tr'); // Default to Turkish
  const t = content[lang];

  const toggleLang = () => {
    setLang(prev => prev === 'tr' ? 'en' : 'tr');
  };

  return (
    <div className="App">
      <Helmet htmlAttributes={{ lang }} />
      <div className="noise-overlay"></div>
      <ScrollToTop />
      <Navbar t={t.nav} lang={lang} toggleLang={toggleLang} />

      <main>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home t={t} />} />
            <Route path="/vision" element={<Vision t={t} />} />

            <Route path="/pricing" element={<Pricing t={t.pricing} wizardT={t.wizard} />} />

            {/* Service Routes */}
            <Route path="/services/software" element={
              <ServiceDetail tService={t.services.items.find(i => i.id === 'software')} tContact={t.contact} />
            } />
            <Route path="/services/web-seo" element={
              <ServiceDetail tService={t.services.items.find(i => i.id === 'web-seo')} tContact={t.contact} />
            } />
            <Route path="/services/social-media" element={
              <ServiceDetail tService={t.services.items.find(i => i.id === 'social-media')} tContact={t.contact} />
            } />
            <Route path="/services/production" element={
              <ServiceDetail tService={t.services.items.find(i => i.id === 'production')} tContact={t.contact} />
            } />
            <Route path="/services/printing" element={
              <ServiceDetail tService={t.services.items.find(i => i.id === 'printing')} tContact={t.contact} />
            } />
            <Route path="/services/drone" element={
              <ServiceDetail tService={t.services.items.find(i => i.id === 'drone')} tContact={t.contact} />
            } />
            <Route path="/services/3d-motion" element={
              <ServiceDetail tService={t.services.items.find(i => i.id === '3d-motion')} tContact={t.contact} />
            } />
            <Route path="/services/consulting" element={
              <ServiceDetail tService={t.services.items.find(i => i.id === 'consulting')} tContact={t.contact} />
            } />
            <Route path="/services/ecommerce" element={
              <ServiceDetail tService={t.services.items.find(i => i.id === 'ecommerce')} tContact={t.contact} />
            } />
            <Route path="/services/pr" element={
              <ServiceDetail tService={t.services.items.find(i => i.id === 'pr')} tContact={t.contact} />
            } />

            {/* All Services Page */}
            <Route path="/services" element={<ServicesPage t={t.services} tContact={t.contact} />} />

            {/* Legal Routes */}
            <Route path="/legal/privacy" element={
              <LegalPage title={t.legal.privacyTitle} text={t.legal.privacyText} date={t.legal.lastUpdated} />
            } />
            <Route path="/legal/terms" element={
              <LegalPage title={t.legal.termsTitle} text={t.legal.termsText} date={t.legal.lastUpdated} />
            } />

            {/* Admin Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Dashboard />} />

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />

          </Routes>
        </Suspense>
      </main>

      <Footer t={t.footer} />
    </div>
  );
}

export default App;
