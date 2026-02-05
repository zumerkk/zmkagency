import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SEO = ({ title, description, keywords, schema }) => {
    const location = useLocation();
    const siteTitle = "ZMK AGENCY";
    const finalTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    const defaultDesc = "Kırıkkale'nin lider 360° Dijital Reklam ve Yazılım Ajansı. Web tasarım, sosyal medya yönetimi, dijital dönüşüm ve kurumsal kimlik hizmetleri.";
    // URL Construction
    const baseUrl = 'https://zmkagency.com';
    const path = location.pathname;
    const currentUrl = `${baseUrl}${path}`;

    // Hreflang Logic
    // If we had a language toggle in URL (e.g. /en/pricing), we would map it here. 
    // Since it's currently SPA state-based, we point both x-default and current to base for now, 
    // or if the router supports localized routes later, we adapt this.
    // For now, valid hreflang for a single-url SPA serving multi-content is tricky, 
    // so we set x-default to the main URL.

    // Robust LocalBusiness Schema
    const defaultSchema = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "ZMK Agency",
        "alternateName": "ZMK Digital Agency",
        "description": defaultDesc,
        "image": `${baseUrl}/logo.png`,
        "@id": `${baseUrl}/#organization`,
        "url": baseUrl,
        "telephone": "+905413812114",
        "email": "iletisim@zmkagency.com",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Yenişehir Kazım Karabekir caddesi No: 39/2",
            "addressLocality": "Kırıkkale",
            "postalCode": "71100",
            "addressCountry": "TR"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 39.8468,
            "longitude": 33.5153
        },
        "areaServed": ["Kırıkkale", "Ankara", "İstanbul", "İzmir"],
        "sameAs": [
            "https://www.instagram.com/agencyzmk/",
            "https://www.youtube.com/@ZMKAGENCY",
            "https://www.tiktok.com/@zmkagency",
            "https://x.com/zmkagency",
            "https://www.linkedin.com/company/zmkagency"
        ],
        "priceRange": "$$",
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "09:00",
            "closes": "19:00"
        }
    };

    return (
        <Helmet>
            <title>{finalTitle}</title>
            <meta name="description" content={description || defaultDesc} />
            <meta name="keywords" content={keywords || "kırıkkale reklam ajansı, web tasarım kırıkkale, zmk agency, dijital pazarlama ajansı, sosyal medya yönetimi, kurumsal kimlik, yazılım ajansı"} />

            <link rel="canonical" href={currentUrl} />
            <link rel="alternate" hrefLang="tr" href={baseUrl + path} />
            <link rel="alternate" hrefLang="en" href={baseUrl + path} />
            <link rel="alternate" hrefLang="x-default" href={baseUrl + path} />

            {/* Open Graph / Social Media */}
            <meta property="og:title" content={finalTitle} />
            <meta property="og:description" content={description || defaultDesc} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:site_name" content="ZMK Agency" />
            <meta property="og:locale" content="tr_TR" />
            <meta property="og:image" content={`${baseUrl}/og-image.jpg`} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={finalTitle} />
            <meta name="twitter:description" content={description || defaultDesc} />
            <meta name="twitter:image" content={`${baseUrl}/og-image.jpg`} />

            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(Array.isArray(schema) ? schema : (schema || defaultSchema))}
            </script>
        </Helmet>
    );
};

export default SEO;
