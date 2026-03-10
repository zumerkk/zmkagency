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

import SolutionSelector from '../components/conversion/SolutionSelector';
import TrustBadges from '../components/conversion/TrustBadges';
import HowWeWork from '../components/conversion/HowWeWork';

import LocalDominance from '../components/LocalDominance';

import { useNavigate } from 'react-router-dom';

const Home = ({ t }) => {
    const [showWizard, setShowWizard] = useState(false);
    const navigate = useNavigate();

    // Build FAQPage schema from FAQ data
    const faqSchema = t.faq && t.faq.items ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": t.faq.items.map(item => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": { "@type": "Answer", "text": item.a }
        }))
    } : null;

    return (
        <>
            <SEO
                title="Kırıkkale Reklam Ajansı | 360° Dijital Çözümler"
                description="Kırıkkale'nin lider dijital ajansı. Web tasarım, yazılım, sosyal medya, SEO ve Google Ads hizmetleriyle işletmenizi büyütün. Ücretsiz teklif alın."
                keywords="kırıkkale reklam ajansı, kırıkkale yazılım, kırıkkale web tasarım, kırıkkale dijital pazarlama, kırıkkale sosyal medya yönetimi, kırıkkale seo"
                schema={faqSchema ? [faqSchema] : undefined}
            />
            <Hero t={t.hero} onCtaClick={() => setShowWizard(true)} />

            <TrustBadges t={t.trustBadges} />
            <SolutionSelector t={t.solutionSelector} />
            <HowWeWork t={t.howWeWork} />

            <LocalDominance t={t.localDominance} onCtaClick={() => navigate('/pricing')} />

            <Clients t={t.clients} />
            <div id="services">
                <Services t={t.services} />
            </div>
            <Comparison t={t.comparison} />
            <div id="agency">
                <About t={t.about} />
            </div>
            <FAQ t={t.faq} />
            <Contact t={t.contact} />


            <FloatingCTA t={t.ctaFloat} onClick={() => setShowWizard(true)} />

            {showWizard && (
                <WizardForm t={t.wizard} onClose={() => setShowWizard(false)} />
            )}
        </>
    );
};

export default Home;
