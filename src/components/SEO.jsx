import { Helmet } from "react-helmet-async";

export default function SEO({
    title,
    description,
    url,
    image,
    type = "website"
}) {
    const siteName = "Enes Derin | Full Stack Developer";
    const defaultImage = "https://enesderin.com/og-cover.jpg";

    return (
        <Helmet>
            {/* BASIC */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={url} />

            {/* OPEN GRAPH */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url} />
            <meta property="og:site_name" content={siteName} />
            <meta property="og:image" content={image || defaultImage} />

            {/* TWITTER */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image || defaultImage} />

            {/* INDEXING */}
            <meta name="robots" content="index, follow" />
        </Helmet>
    );
}