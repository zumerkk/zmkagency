import { AnimatePresence } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';

// ... (imports)

function App() {
  const [lang, setLang] = useState('tr'); // Default to Turkish
  const t = content[lang];
  const location = useLocation(); // Hook for transition keys

  const toggleLang = () => {
    setLang(prev => prev === 'tr' ? 'en' : 'tr');
  };

  return (
    <div className="App">
      <Helmet htmlAttributes={{ lang }} />

      <ScrollToTop />
      <Navbar t={t.nav} lang={lang} toggleLang={toggleLang} />

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
              <Route path="/services/brand" element={
                <ServiceDetail tService={t.services.items.find(i => i.id === 'brand')} tContact={t.contact} />
              } />
              <Route path="/services/data" element={
                <ServiceDetail tService={t.services.items.find(i => i.id === 'data')} tContact={t.contact} />
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

              {/* Admin Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<Dashboard />} />

              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />

            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>

      <Footer t={t.footer} />
    </div>
  );
}

export default App;
