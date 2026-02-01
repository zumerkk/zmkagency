import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords }) => {
    const siteTitle = "ZMK AGENCY";
    const finalTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    const defaultDesc = "Kırıkkale'nin lider dijital ajansı. Web tasarım, yazılım, sosyal medya ve prodüksiyon hizmetleriyle markanızı geleceğe taşıyın.";

    return (
        <Helmet>
            <title>{finalTitle}</title>
            <meta name="description" content={description || defaultDesc} />
            <meta name="keywords" content={keywords || "dijital ajans, kırıkkale yazılım, web tasarım, seo, sosyal medya, prodüksiyon, zmk agency"} />

            {/* Open Graph / Social Media */}
            <meta property="og:title" content={finalTitle} />
            <meta property="og:description" content={description || defaultDesc} />
            <meta property="og:type" content="website" />
            {/* Add og:image etc when real assets exist */}
        </Helmet>
    );
};

export default SEO;
