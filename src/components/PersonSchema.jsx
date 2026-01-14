import { Helmet } from "react-helmet-async";

export default function PersonSchema() {
    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Person",
                    "name": "Enes Derin",
                    "url": "https://enesderin.com",
                    "jobTitle": "Full Stack Developer",
                    "sameAs": [
                        "https://github.com/enesderin",
                        "https://linkedin.com/in/enesderin"
                    ]
                })}
            </script>
        </Helmet>
    );
}
