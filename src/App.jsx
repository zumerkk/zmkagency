import React, { useState, Suspense, lazy } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';
import ContactModal from './components/ContactModal';
import { content } from './translations';
import { localSeoData } from './data/localSeoData'; // SEO Data
import './index.css';

// Lazy Load Pages for Performance
const Home = lazy(() => import('./pages/Home'));
const Vision = lazy(() => import('./pages/Vision'));
const ServiceDetail = lazy(() => import('./pages/services/ServiceDetail'));
const NewServiceDetail = lazy(() => import('./pages/services/NewServiceDetail'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const LegalPage = lazy(() => import('./pages/legal/LegalPage'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Login = lazy(() => import('./pages/admin/Login'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const LocalLanding = lazy(() => import('./pages/LocalLanding')); // Local Landing Page
const Contact = lazy(() => import('./pages/Contact')); // Contact Page
const PortfolioPage = lazy(() => import('./pages/PortfolioPage')); // Portfolio Page
const Blog = lazy(() => import('./pages/Blog')); // ZMK Magazine
const BlogDetail = lazy(() => import('./pages/BlogDetail')); // Blog Detail Page
const NotFound = lazy(() => import('./pages/NotFound'));
const ThankYou = lazy(() => import('./pages/ThankYou')); // Conversion Page
const EsnafLanding = lazy(() => import('./pages/EsnafLanding')); // Special Landing Page
const PillarPage = lazy(() => import('./pages/PillarPage')); // SEO Pillar Page
const ZMKSpesiyel = lazy(() => import('./pages/ZMKSpesiyel')); // ZMK Spesiyel Page

// Loading Fallback Component
const PageLoader = () => (
  <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', color: '#fff' }}>
    <p>Loading ZMK Experience...</p>
  </div>
);

function App() {
  const [lang, setLang] = useState('tr'); // Default to Turkish
  const t = content[lang];
  const location = useLocation(); // Hook for transition keys
  const [showContactModal, setShowContactModal] = useState(false);

  const toggleLang = () => {
    setLang(prev => prev === 'tr' ? 'en' : 'tr');
  };

  // Hide public chrome on admin pages
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="App">
      <Helmet htmlAttributes={{ lang }} />

      <ScrollToTop />
      {!isAdmin && (
        <Navbar
          t={t.nav}
          lang={lang}
          toggleLang={toggleLang}
          onContactClick={() => setShowContactModal(true)}
        />
      )}

      <main>
        <Suspense fallback={<PageLoader />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home t={t} />} />
              <Route path="/vision" element={<Vision t={t} />} />
              {/* ... other routes ... */}

              <Route path="/pricing" element={<Pricing t={t.pricing} wizardT={t.wizard} />} />
              <Route path="/contact" element={<Contact t={t} />} />
              <Route path="/portfolio" element={<PortfolioPage t={t} />} />

              {/* New Service Detail Pages (slug-based) */}
              <Route path="/services/:slug" element={
                <NewServiceDetail tContact={t.contact} />
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

              {/* Pillar Page */}
              <Route path="/kirikkale-dijital-cozumler" element={<PillarPage t={t} />} />

              {/* Local SEO Landing Pages */}
              {localSeoData.map((data) => (
                <Route
                  key={data.slug}
                  path={`/${data.slug}`}
                  element={<LocalLanding data={data} t={t} />}
                />
              ))}

              {/* ZMK Magazine */}
              <Route path="/blog" element={<Blog t={t} />} />
              <Route path="/blog/:slug" element={<BlogDetail />} />

              {/* Admin Routes — no Navbar/Footer shown */}
              <Route path="/admin/login" element={<Login />} />
              <Route path="/login" element={<Navigate to="/admin/login" replace />} />
              <Route path="/admin" element={<Dashboard />} />

              <Route path="/thank-you" element={<ThankYou />} />
              <Route path="/esnaf-paket" element={<EsnafLanding t={t} />} />
              <Route path="/zmk-spesiyel" element={<ZMKSpesiyel t={t} />} />

              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />

            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>

      {!isAdmin && <Footer t={t.footer} />}

      {/* Contact Modal (Bize Ulaşın) */}
      {showContactModal && (
        <ContactModal t={t} onClose={() => setShowContactModal(false)} />
      )}
    </div>
  );
}

export default App;
