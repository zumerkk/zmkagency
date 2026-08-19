import React, { useState, Suspense, lazy } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ScrollToTop from './components/ScrollToTop';
import RouteTransition, { ScrollProgress } from './components/ui/RouteTransition';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { content } from './translations';
import { localSeoData } from './data/localSeoData'; // SEO Data
import './index.css';

// Lazy Load Pages for Performance
const Home = lazy(() => import('./pages/Home'));
const Vision = lazy(() => import('./pages/Vision'));
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
const PillarDetail = lazy(() => import('./pages/PillarDetail')); // Brand/Growth/Software/Studio
const Zmk360Page = lazy(() => import('./pages/Zmk360Page')); // Integrated retainer model

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

  const toggleLang = () => {
    setLang(prev => prev === 'tr' ? 'en' : 'tr');
  };

  // Hide public chrome on admin pages
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="App">
      <Helmet htmlAttributes={{ lang }} />

      <ScrollToTop />
      {!isAdmin && <ScrollProgress />}
      {!isAdmin && <RouteTransition />}
      {!isAdmin && (
        <a className="zmk-skip-link" href="#main">İçeriğe geç</a>
      )}
      {!isAdmin && <Navbar lang={lang} toggleLang={toggleLang} />}

      <main id="main">
        <Suspense fallback={<PageLoader />}>
          {/* No AnimatePresence wrapper here.
              It only animates children that are motion components with an
              `exit` prop; the route elements are plain components, so it was
              doing nothing visible while pulling framer-motion (~116 kB raw)
              onto the entry chunk for every single route. Pages that do use
              motion still import it inside their own lazy chunk. */}
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home t={t} />} />

              {/* ---------------------------------------------------------
                  Canonical Turkish routes. These are the URLs the site links
                  to and the ones in the sitemap. The English-language routes
                  below are kept only so previously indexed links and any
                  printed material keep working — they redirect here, and
                  vercel.json issues real 301s for the same pairs.
                  --------------------------------------------------------- */}
              <Route path="/hakkimizda" element={<Vision t={t} />} />
              <Route path="/fiyatlar" element={<Pricing wizardT={t.wizard} />} />
              <Route path="/iletisim" element={<Contact t={t} />} />
              <Route path="/calismalar" element={<PortfolioPage t={t} />} />
              <Route path="/hizmetler" element={<ServicesPage t={t.services} tContact={t.contact} />} />

              {/* Four capability pillars, one shared template */}
              <Route path="/marka" element={<PillarDetail pillarId="brand" />} />
              <Route path="/dijital" element={<PillarDetail pillarId="growth" />} />
              <Route path="/yazilim" element={<PillarDetail pillarId="software" />} />
              <Route path="/studio" element={<PillarDetail pillarId="studio" />} />
              <Route path="/zmk-360" element={<Zmk360Page />} />

              {/* Legacy English routes → canonical Turkish equivalents */}
              <Route path="/vision" element={<Navigate to="/hakkimizda" replace />} />
              <Route path="/pricing" element={<Navigate to="/fiyatlar" replace />} />
              <Route path="/contact" element={<Navigate to="/iletisim" replace />} />
              <Route path="/portfolio" element={<Navigate to="/calismalar" replace />} />
              <Route path="/services" element={<Navigate to="/hizmetler" replace />} />

              {/* Service Detail Pages (slug-based) */}
              <Route path="/services/:slug" element={
                <NewServiceDetail tContact={t.contact} />
              } />

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
        </Suspense>
      </main>

      {!isAdmin && <Footer />}
    </div>
  );
}

export default App;
