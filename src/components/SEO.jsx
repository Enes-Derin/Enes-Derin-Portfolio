import { Helmet } from "react-helmet-async"

const DEFAULTS = {
    siteName: "Enes Derin",
    siteUrl: "https://enesderin.com",
    ogImage: "https://enesderin.com/og-cover.jpg",
    themeColor: "#6366f1",
    author: "Enes Derin",
    locale: "en_US",
    localeAlt: "tr_TR",
}

export default function SEO({
    title,
    description,
    url,
    image,
    type = "website",
    lang = "EN",
    keywords,
    noIndex = false,
    articlePublished,
    articleModified,
}) {
    const fullUrl = url || DEFAULTS.siteUrl
    const ogImage = image || DEFAULTS.ogImage
    const locale = lang === "TR" ? DEFAULTS.localeAlt : DEFAULTS.locale

    return (
        <Helmet>
            {/* ── CHARSET & VIEWPORT ── */}
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />

            {/* ── PRIMARY ── */}
            <title>{title}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            <meta name="author" content={DEFAULTS.author} />
            <link rel="canonical" href={fullUrl} />

            {/* ── INDEXING ── */}
            <meta name="robots" content={noIndex
                ? "noindex, nofollow"
                : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
            } />
            <meta name="googlebot" content={noIndex ? "noindex, nofollow" : "index, follow"} />

            {/* ── OPEN GRAPH ── */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:site_name" content={DEFAULTS.siteName} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content={`${DEFAULTS.siteName} — Portfolio`} />
            <meta property="og:locale" content={locale} />
            <meta property="og:locale:alternate" content={lang === "TR" ? DEFAULTS.locale : DEFAULTS.localeAlt} />

            {/* Article ek meta'ları */}
            {type === "article" && articlePublished && (
                <meta property="article:published_time" content={articlePublished} />
            )}
            {type === "article" && articleModified && (
                <meta property="article:modified_time" content={articleModified} />
            )}
            {type === "article" && (
                <meta property="article:author" content={DEFAULTS.author} />
            )}

            {/* ── THEME / PWA ── */}
            <meta name="theme-color" content={DEFAULTS.themeColor} />
            <meta name="msapplication-TileColor" content={DEFAULTS.themeColor} />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
            <meta name="apple-mobile-web-app-title" content={DEFAULTS.siteName} />

            {/* ── PERFORMANCE HINTS ── */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link rel="dns-prefetch" href="https://algorixa.com.tr" />
        </Helmet>
    )
}