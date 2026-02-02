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
import TrustBar from '../components/TrustBar';
import LeadMagnet from '../components/LeadMagnet';

const Home = ({ t }) => {
    const [showWizard, setShowWizard] = useState(false);

    return (
        <>
            <SEO
                title="Sınırsız Büyüme & Dijital Hakimiyet"
                description="KOBİ’ler için performans odaklı reklam, web ve içerik üretimiyle 30 günde ölçülebilir büyüme. Kırıkkale'nin dijital dönüşüm merkezi."
            />
            <Hero t={t.hero} onCtaClick={() => setShowWizard(true)} />
            <TrustBar />
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
            <LeadMagnet t={t} />


            <FloatingCTA t={t.ctaFloat} onClick={() => setShowWizard(true)} />

            {showWizard && (
                <WizardForm t={t.wizard} onClose={() => setShowWizard(false)} />
            )}
        </>
    );
};

export default Home;
