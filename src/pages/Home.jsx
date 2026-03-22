import React, { useState } from 'react';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import Clients from '../components/Clients';
import Services from '../components/Services';
import About from '../components/About';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import FAQ from '../components/FAQ';
import Comparison from '../components/Comparison';
import WizardForm from '../components/WizardForm';
import FloatingCTA from '../components/FloatingCTA';

import SpecialPackage from '../components/conversion/SpecialPackage';
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

    // Organization schema
    const orgSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "ZMK AGENCY",
        "url": "https://zmkagency.com",
        "logo": "https://zmkagency.com/zmk-logo.png",
        "description": "Kırıkkale merkezli 360° dijital ajans. Web tasarım, yazılım, sosyal medya, SEO ve reklam yönetimi.",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Delice İş Hanı, Yenidoğan, Hürriyet Cd. No: 6/50 Kat:5",
            "addressLocality": "Kırıkkale",
            "addressCountry": "TR",
            "postalCode": "71200"
        },
        "telephone": "+905413812114",
        "email": "iletisim@zmkagency.com",
        "sameAs": t.about?.sameAs || []
    };

    return (
        <>
            <SEO
                title="Kırıkkale Reklam Ajansı | 360° Dijital Çözümler | ZMK AGENCY"
                description="Kırıkkale'nin lider dijital ajansı. Marka stratejisi, web tasarım, yazılım geliştirme, sosyal medya yönetimi, SEO ve Google Ads ile işletmenizi büyütün."
                keywords="kırıkkale reklam ajansı, kırıkkale dijital ajans, kırıkkale yazılım, kırıkkale web tasarım, kırıkkale sosyal medya yönetimi, kırıkkale seo, kırıkkale google ads"
                schema={[faqSchema, orgSchema].filter(Boolean)}
            />

            {/* 1 — CINEMATIC HERO */}
            <Hero t={t.hero} onCtaClick={() => setShowWizard(true)} />

            {/* 2 — SOCIAL PROOF: Trust Badges */}
            <TrustBadges t={t.trustBadges} />

            {/* 3 — SERVICES SHOWCASE */}
            <Services t={t.services} />

            {/* 4 — WHY ZMK (Comparison) */}
            <Comparison t={t.comparison} />

            {/* 5 — SOLUTION FINDER */}
            <SolutionSelector t={t.solutionSelector} />

            {/* 6 — CLIENT LOGOS */}
            <Clients t={t.clients} />

            {/* 7 — TESTIMONIALS */}
            <Testimonials t={t.testimonials} />

            {/* 8 — HOW WE WORK */}
            <HowWeWork t={t.howWeWork} />

            {/* 9 — LOCAL DOMINANCE */}
            <LocalDominance t={t.localDominance} onCtaClick={() => navigate('/services')} />

            {/* 10 — SPECIAL PACKAGE */}
            {t.specialPackage && <SpecialPackage t={t.specialPackage} />}

            {/* 11 — ABOUT / AGENCY */}
            <div id="agency">
                <About t={t.about} />
            </div>

            {/* 12 — FAQ */}
            <FAQ t={t.faq} />

            {/* 13 — CONTACT */}
            <Contact t={t.contact} />

            {/* Floating CTA */}
            <FloatingCTA t={t.ctaFloat} onClick={() => setShowWizard(true)} />

            {/* Wizard Modal */}
            {showWizard && (
                <WizardForm t={t.wizard} onClose={() => setShowWizard(false)} />
            )}
        </>
    );
};

export default Home;
