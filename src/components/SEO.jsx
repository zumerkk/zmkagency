import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SEO = ({ title, description, keywords, schema, canonical, ogImage, ogType, breadcrumbs, noindex }) => {
    const location = useLocation();
    const siteTitle = "ZMK AGENCY";
    const finalTitle = title ? `${title} | ${siteTitle}` : "Kırıkkale Reklam Ajansı | Web Tasarım & Dijital Pazarlama | ZMK Agency";
    // No "lider"/"en iyi" self-claims: they are unverifiable and this string is
    // the fallback description for every page that does not set its own.
    const defaultDesc = "ZMK AGENCY; marka, yazılım, dijital pazarlama ve prodüksiyonu tek merkezde birleştirir. Kırıkkale merkezli, Türkiye çapında çalışan büyüme ve teknoloji ortağınız.";

    // URL Construction
    const baseUrl = 'https://zmkagency.com';
    const path = location.pathname;
    const currentUrl = canonical || `${baseUrl}${path}`;
    const defaultImage = `${baseUrl}/og-image.jpg`;
    const finalImage = ogImage ? (ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`) : defaultImage;

    // Robust LocalBusiness Schema
    const localBusinessSchema = {
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
            "streetAddress": "Delice İş Hanı, Yenidoğan, Hürriyet Cd. No: 6/50 Kat:5",
            "addressLocality": "Kırıkkale",
            "postalCode": "71200",
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

    // WebSite + SearchAction Schema (for Google sitelinks search box)
    const webSiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "ZMK Agency",
        "alternateName": "ZMK AGENCY",
        "url": baseUrl,
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": `${baseUrl}/services?q={search_term_string}`
            },
            "query-input": "required name=search_term_string"
        }
    };

    // Organization Schema
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "ZMK Agency",
        "url": baseUrl,
        "logo": `${baseUrl}/logo.png`,
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+905413812114",
            "contactType": "customer service",
            "availableLanguage": ["Turkish", "English"]
        },
        "sameAs": [
            "https://www.instagram.com/agencyzmk/",
            "https://www.youtube.com/@ZMKAGENCY",
            "https://www.tiktok.com/@zmkagency",
            "https://x.com/zmkagency",
            "https://www.linkedin.com/company/zmkagency"
        ]
    };

    // Construct Schema Array
    let schemaList = [localBusinessSchema, webSiteSchema, organizationSchema];
    if (schema) {
        if (Array.isArray(schema)) {
            schemaList = [...schemaList, ...schema];
        } else {
            schemaList.push(schema);
        }
    }
    if (breadcrumbs) {
        schemaList.push(breadcrumbs);
    }

    return (
        <Helmet>
            <title>{finalTitle}</title>
            <meta name="description" content={description || defaultDesc} />
            <meta name="keywords" content={keywords || "kırıkkale reklam ajansı, web tasarım kırıkkale, zmk agency, dijital pazarlama ajansı, sosyal medya yönetimi, kırıkkale yazılım firması, kurumsal kimlik, seo danışmanlığı, kırıkkale drone çekimi"} />

            {/* Legal/utility pages opt out of indexing — they have no search
                value and would otherwise consume crawl budget. */}
            {noindex && <meta name="robots" content="noindex, follow" />}

            <link rel="canonical" href={currentUrl} />
            <link rel="alternate" hrefLang="tr" href={baseUrl + path} />
            <link rel="alternate" hrefLang="x-default" href={baseUrl + path} />

            {/* Open Graph / Social Media */}
            <meta property="og:title" content={finalTitle} />
            <meta property="og:description" content={description || defaultDesc} />
            <meta property="og:type" content={ogType || "website"} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:site_name" content="ZMK Agency" />
            <meta property="og:locale" content="tr_TR" />
            <meta property="og:image" content={finalImage} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={finalTitle} />
            <meta name="twitter:description" content={description || defaultDesc} />
            <meta name="twitter:image" content={finalImage} />

            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(schemaList)}
            </script>
        </Helmet>
    );
};

export default SEO;
