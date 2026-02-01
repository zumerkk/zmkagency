import React, { useState } from 'react';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import Clients from '../components/Clients';
import Services from '../components/Services';
import About from '../components/About';
import Contact from '../components/Contact';
import FAQ from '../components/FAQ';
import Comparison from '../components/Comparison';
import WizardForm from '../components/WizardForm';
import FloatingCTA from '../components/FloatingCTA';
import Portfolio from '../components/Portfolio';

const Home = ({ t }) => {
    const [showWizard, setShowWizard] = useState(false);

    return (
        <>
            <SEO
                title="Dijital Geleceğinizi İnşa Edin"
                description="Kırıkkale'nin lider dijital ajansı ZMK AGENCY. Yazılım, Web Tasarım, Sosyal Medya ve Prodüksiyon hizmetleri."
            />
            <Hero t={t.hero} />
            <Clients t={t.clients} />
            <div id="services">
                <Services t={t.services} />
            </div>
            <Portfolio t={t.portfolio} />
            <Comparison t={t.comparison} />
            <div id="agency">
                <About t={t.about} />
            </div>
            {/* Testimonials removed as per Agency-Grade request */}
            <FAQ t={t.faq} />
            <div id="contact">
                <Contact t={t.contact} />
            </div>

            <FloatingCTA t={t.ctaFloat} onClick={() => setShowWizard(true)} />

            {showWizard && (
                <WizardForm t={t.wizard} onClose={() => setShowWizard(false)} />
            )}
        </>
    );
};

export default Home;
