import React, { useState } from 'react';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import Clients from '../components/Clients';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import About from '../components/About';
import Contact from '../components/Contact';
import FAQ from '../components/FAQ';
import Comparison from '../components/Comparison';
import WizardForm from '../components/WizardForm';
import FloatingCTA from '../components/FloatingCTA';
import Portfolio from '../components/Portfolio';


import LocalDominance from '../components/LocalDominance';

import { useNavigate } from 'react-router-dom';

const Home = ({ t }) => {
    const [showWizard, setShowWizard] = useState(false);
    const navigate = useNavigate();

    return (
        <>
            <SEO
                title={t.hero.title1.includes('Push') ? "360° Digital Dominance" : "360° Dijital Hakimiyet"}
                description={t.hero.subtitle}
            />
            <Hero t={t.hero} onCtaClick={() => setShowWizard(true)} />

            <LocalDominance t={t.localDominance} onCtaClick={() => navigate('/pricing')} />

            <Clients t={t.clients} />
            <div id="services">
                <Services t={t.services} />
            </div>
            <Portfolio t={t.portfolio} />
            <Comparison t={t.comparison} />
            <div id="agency">
                <About t={t.about} />
            </div>
            <Testimonials t={t.testimonials} />
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
