import React, { useState } from 'react';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import Services from '../components/Services';
import CampaignProducts from '../components/CampaignProducts';
import MarketDominance from '../components/MarketDominance';
import Comparison from '../components/Comparison';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';
import FloatingCTA from '../components/FloatingCTA';
import WizardForm from '../components/WizardForm';

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
        "description": "Kırıkkale merkezli yazılım, reklam, sosyal medya, SEO ve performans pazarlama ajansı.",
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
                description="Kırıkkale yazılım ajansı, reklam ajansı, sosyal medya ajansı ve SEO ekibi. Web tasarım, Google Ads, Meta reklam, lokal SEO ve özel yazılım ile işletmenizi büyütün."
                keywords="kırıkkale yazılım, kırıkkale yazılım ajansı, kırıkkale reklam, kırıkkale reklam ajansı, kırıkkale sosyal medya ajansı, kırıkkale sosyal medya yönetimi, kırıkkale web tasarım, kırıkkale seo, kırıkkale google ads"
                schema={[faqSchema, orgSchema].filter(Boolean)}
            />

            {/* 1 — HERO: Cinematic First Impression */}
            <Hero t={t.hero} onCtaClick={() => setShowWizard(true)} />

            {/* 2 — SERVICES: What We Do */}
            <Services t={t.services} />

            {/* 3 — KAMPANYALI ÜRÜNLER: Esnaf + Dijital Kalkındırma */}
            <CampaignProducts />

            {/* 4 — MARKET DOMINANCE: Keyword + growth clusters */}
            <MarketDominance />

            {/* 5 — NEDEN ZMK: Comparison */}
            <Comparison t={t.comparison} />

            {/* 6 — TESTIMONIALS: Social Proof */}
            <Testimonials t={t.testimonials} />

            {/* 7 — FAQ: Final Objections */}
            <FAQ t={t.faq} />

            {/* 8 — CONTACT: Close the Deal */}
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
