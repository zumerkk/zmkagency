import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SEO = ({ title, description, keywords, schema }) => {
    const location = useLocation();
    const siteTitle = "ZMK AGENCY";
    const finalTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    const defaultDesc = "Kırıkkale'nin lider dijital ajansı. Web tasarım, yazılım, drone çekimi, kurumsal baskı ve sosyal medya hizmetleriyle markanızı geleceğe taşıyın.";
    const currentUrl = `https://zmkagency.com${location.pathname}`;

    // Default LocalBusiness Schema
    const defaultSchema = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "ZMK Agency",
        "image": "https://zmkagency.com/logo.png",
        "@id": "https://zmkagency.com",
        "url": "https://zmkagency.com",
        "telephone": "+905555555555", // Placeholder
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
        "areaServed": [
            {
                "@type": "City",
                "name": "Kırıkkale"
            },
            {
                "@type": "City",
                "name": "Ankara"
            },
            {
                "@type": "AdministrativeArea",
                "name": "İç Anadolu Bölgesi"
            }
        ],
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Dijital Ajans Hizmetleri",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Kırıkkale Web Tasarım"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Kırıkkale Sosyal Medya Yönetimi"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Kırıkkale Drone Çekimi"
                    }
                }
            ]
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
            ],
            "opens": "09:00",
            "closes": "18:00"
        },
        "sameAs": [
            "https://www.instagram.com/zmkagency"
        ]
    };

    return (
        <Helmet>
            <title>{finalTitle}</title>
            <meta name="description" content={description || defaultDesc} />
            <meta name="keywords" content={keywords || "kırıkkale reklam ajansı, kırıkkale yazılım, web tasarım kırıkkale, drone çekimi, kurumsal baskı, zmk agency, sosyal medya yönetimi"} />

            <link rel="canonical" href={currentUrl} />

            {/* Open Graph / Social Media */}
            <meta property="og:title" content={finalTitle} />
            <meta property="og:description" content={description || defaultDesc} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:site_name" content="ZMK Agency" />

            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(schema || defaultSchema)}
            </script>
        </Helmet>
    );
};

export default SEO;
