import { Helmet } from "react-helmet-async"

export default function PersonSchema({ lang = "EN" }) {
    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            /* ── Person ── */
            {
                "@type": "Person",
                "@id": "https://enesderin.com/#person",
                "name": "Enes Derin",
                "givenName": "Enes",
                "familyName": "Derin",
                "url": "https://enesderin.com",
                "image": {
                    "@type": "ImageObject",
                    "url": "https://enesderin.com/og-cover.jpg",
                    "width": 1200,
                    "height": 630,
                },
                "jobTitle": lang === "TR" ? "Full Stack Geliştirici" : "Full Stack Developer",
                "description": lang === "TR"
                    ? "React, Spring Boot uzmanı Full Stack Geliştirici. Algorixa ajansının kurucusu. İstanbul merkezli."
                    : "Full Stack Developer specializing in React, Spring Boot. Founder of Algorixa agency. Based in Istanbul.",
                "knowsAbout": [
                    "React", "Spring Boot", "Node.js", "TypeScript", "PostgreSQL",
                    "Docker", "AWS", "Figma", "UI/UX Design", "Web Development",
                    "Software Architecture", "Full Stack Development"
                ],
                "knowsLanguage": [
                    { "@type": "Language", "name": "Turkish" },
                    { "@type": "Language", "name": "English" },
                ],
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Istanbul",
                    "addressCountry": "TR",
                },
                "worksFor": {
                    "@type": "Organization",
                    "@id": "https://algorixa.com.tr/#organization",
                    "name": "Algorixa",
                    "url": "https://algorixa.com.tr",
                },
                "sameAs": [
                    "https://github.com/enesderin",
                    "https://linkedin.com/in/enesderin",
                    "https://medium.com/@enes_derin",
                ],
            },

            /* ── Organization (Algorixa) ── */
            {
                "@type": "Organization",
                "@id": "https://algorixa.com.tr/#organization",
                "name": "Algorixa",
                "url": "https://algorixa.com.tr",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://algorixa.com.tr/logo.png",
                },
                "founder": {
                    "@id": "https://enesderin.com/#person",
                },
                "foundingDate": "2026",
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Istanbul",
                    "addressCountry": "TR",
                },
                "description": lang === "TR"
                    ? "İstanbul merkezli web & yazılım ajansı. Tasarımdan geliştirmeye, hosting'den SEO'ya uçtan uca dijital ürünler."
                    : "Istanbul-based web & software agency delivering end-to-end digital products — design, development, hosting and SEO.",
                "knowsAbout": ["Web Design", "Full Stack Development", "SEO", "Hosting", "Branding"],
                "sameAs": ["https://algorixa.com.tr"],
            },

            /* ── WebSite ── */
            {
                "@type": "WebSite",
                "@id": "https://enesderin.com/#website",
                "url": "https://enesderin.com",
                "name": "Enes Derin — Portfolio",
                "description": lang === "TR"
                    ? "Enes Derin kişisel portföy sitesi. Full Stack Geliştirici & Algorixa Kurucusu."
                    : "Enes Derin personal portfolio. Full Stack Developer & Algorixa Founder.",
                "inLanguage": lang === "TR" ? "tr-TR" : "en-US",
                "author": { "@id": "https://enesderin.com/#person" },
            },

            /* ── WebPage — Ana sayfa ── */
            {
                "@type": "WebPage",
                "@id": "https://enesderin.com/#webpage",
                "url": "https://enesderin.com",
                "name": lang === "TR"
                    ? "Enes Derin — Full Stack Geliştirici & Algorixa Kurucusu"
                    : "Enes Derin — Full Stack Developer & Algorixa Founder",
                "isPartOf": { "@id": "https://enesderin.com/#website" },
                "about": { "@id": "https://enesderin.com/#person" },
                "description": lang === "TR"
                    ? "React, Spring Boot ve Node.js ile yüksek performanslı web uygulamaları geliştiriyorum. Algorixa ajansının kurucusuyum."
                    : "Building high-performance web applications with React, Spring Boot and Node.js. Founder of Algorixa.",
                "inLanguage": lang === "TR" ? "tr-TR" : "en-US",
                "breadcrumb": {
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://enesderin.com" },
                    ],
                },
            },

            /* ── WebPage — #about ── */
            {
                "@type": "WebPage",
                "@id": "https://enesderin.com/#about",
                "url": "https://enesderin.com/#about",
                "name": lang === "TR" ? "Hakkımda — Enes Derin" : "About — Enes Derin",
                "isPartOf": { "@id": "https://enesderin.com/#website" },
                "about": { "@id": "https://enesderin.com/#person" },
                "inLanguage": lang === "TR" ? "tr-TR" : "en-US",
                "breadcrumb": {
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://enesderin.com" },
                        { "@type": "ListItem", "position": 2, "name": lang === "TR" ? "Hakkımda" : "About", "item": "https://enesderin.com/#about" },
                    ],
                },
            },

            /* ── WebPage — #algorixa ── */
            {
                "@type": "WebPage",
                "@id": "https://enesderin.com/#algorixa",
                "url": "https://enesderin.com/#algorixa",
                "name": lang === "TR" ? "Algorixa — Enes Derin" : "Algorixa — Enes Derin",
                "isPartOf": { "@id": "https://enesderin.com/#website" },
                "about": { "@id": "https://algorixa.com.tr/#organization" },
                "inLanguage": lang === "TR" ? "tr-TR" : "en-US",
                "breadcrumb": {
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://enesderin.com" },
                        { "@type": "ListItem", "position": 2, "name": "Algorixa", "item": "https://enesderin.com/#algorixa" },
                    ],
                },
            },

            /* ── WebPage — #skills ── */
            {
                "@type": "WebPage",
                "@id": "https://enesderin.com/#skills",
                "url": "https://enesderin.com/#skills",
                "name": lang === "TR" ? "Beceriler — Enes Derin" : "Skills — Enes Derin",
                "isPartOf": { "@id": "https://enesderin.com/#website" },
                "about": { "@id": "https://enesderin.com/#person" },
                "inLanguage": lang === "TR" ? "tr-TR" : "en-US",
                "breadcrumb": {
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://enesderin.com" },
                        { "@type": "ListItem", "position": 2, "name": lang === "TR" ? "Beceriler" : "Skills", "item": "https://enesderin.com/#skills" },
                    ],
                },
            },

            /* ── WebPage — #contact ── */
            {
                "@type": "WebPage",
                "@id": "https://enesderin.com/#contact",
                "url": "https://enesderin.com/#contact",
                "name": lang === "TR" ? "İletişim — Enes Derin" : "Contact — Enes Derin",
                "isPartOf": { "@id": "https://enesderin.com/#website" },
                "about": { "@id": "https://enesderin.com/#person" },
                "inLanguage": lang === "TR" ? "tr-TR" : "en-US",
                "breadcrumb": {
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://enesderin.com" },
                        { "@type": "ListItem", "position": 2, "name": lang === "TR" ? "İletişim" : "Contact", "item": "https://enesderin.com/#contact" },
                    ],
                },
            },

            /* ── ProfessionalService ── */
            {
                "@type": "ProfessionalService",
                "@id": "https://enesderin.com/#service",
                "name": lang === "TR"
                    ? "Enes Derin — Freelance Geliştirici"
                    : "Enes Derin — Freelance Developer",
                "provider": { "@id": "https://enesderin.com/#person" },
                "areaServed": { "@type": "Place", "name": "Worldwide" },
                "serviceType": [
                    "Full Stack Web Development",
                    "React Frontend Development",
                    "Spring Boot Backend Development",
                    "UI/UX Design",
                    "API Development",
                ],
                "offers": {
                    "@type": "Offer",
                    "availability": "https://schema.org/InStock",
                    "description": lang === "TR"
                        ? "Freelance web geliştirme ve danışmanlık hizmetleri"
                        : "Freelance web development and consulting services",
                },
            },
        ],
    }

    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
        </Helmet>
    )
}