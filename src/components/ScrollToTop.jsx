import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
    const { pathname, hash, key } = useLocation();

    useEffect(() => {
        // If there is a hash, scroll to the element
        if (hash) {
            const id = hash.replace('#', '');

            const scrollToElement = (retries = 0) => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                } else if (retries < 10) {
                    // Retry up to 10 times (1 second total) to allow for lazy loading components
                    setTimeout(() => scrollToElement(retries + 1), 100);
                }
            };

            scrollToElement();
        } else {
            // Otherwise scroll to top
            window.scrollTo(0, 0);
        }
    }, [pathname, hash, key]);

    return null;
}
