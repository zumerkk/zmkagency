import React, { useState } from 'react';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import Services from '../components/Services';
import CampaignProducts from '../components/CampaignProducts';
import Comparison from '../components/Comparison';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';
import FloatingCTA from '../components/FloatingCTA';
import WizardForm from '../components/WizardForm';

import { useNavigate } from 'react-router-dom';

const Home = ({ t }) => {
    const [showWizard, setShowWizard] = useState(false);

    // FAQPage + Organization schemas
    const faqSchema = t.faq?.items ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": t.faq.items.map(item => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": { "@type": "Answer", "text": item.a }
        }))
    } : null;

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
        "sameAs": t.about?.sameAs || []
    };

    return (
        <>
            <SEO
                title="Kırıkkale Reklam Ajansı | 360° Dijital Çözümler | ZMK AGENCY"
                description="Kırıkkale'nin lider dijital ajansı. Marka stratejisi, web tasarım, yazılım, sosyal medya, SEO ve Google Ads ile işletmenizi büyütün."
                keywords="kırıkkale reklam ajansı, kırıkkale dijital ajans, kırıkkale yazılım, kırıkkale web tasarım, kırıkkale sosyal medya, kırıkkale seo"
                schema={[faqSchema, orgSchema].filter(Boolean)}
            />

            {/* 1 — HERO: Cinematic First Impression */}
            <Hero t={t.hero} onCtaClick={() => setShowWizard(true)} />

            {/* 2 — SERVICES: What We Do */}
            <Services t={t.services} />

            {/* 3 — KAMPANYALI ÜRÜNLER: Esnaf + Dijital Kalkındırma */}
            <CampaignProducts />

            {/* 4 — NEDEN ZMK: Comparison */}
            <Comparison t={t.comparison} />

            {/* 5 — TESTIMONIALS: Social Proof */}
            <Testimonials t={t.testimonials} />

            {/* 6 — FAQ: Final Objections */}
            <FAQ t={t.faq} />

            {/* 7 — CONTACT: Close the Deal */}
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
