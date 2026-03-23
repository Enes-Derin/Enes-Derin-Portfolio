import { useRef, useEffect } from "react"

const C = {
    EN: {
        lbl: "Founded Company", ttl: "Algorixa",
        sub: "Istanbul-based web & software agency",
        desc: "Alongside development work, I founded Algorixa to deliver end-to-end digital products — from design and development to hosting and SEO, with a single point of contact.",
        cta: "Visit Algorixa",
        pills: ["Web Design", "Full Stack Dev", "SEO", "Hosting", "Branding"],
    },
    TR: {
        lbl: "Kurduğum Şirket", ttl: "Algorixa",
        sub: "İstanbul merkezli web & yazılım ajansı",
        desc: "Geliştirme işimin yanında, uçtan uca dijital ürünler sunmak için Algorixa'yı kurdum — tasarımdan geliştirmeye, hosting'den SEO'ya tek muhatap.",
        cta: "Algorixa'yı Ziyaret Et",
        pills: ["Web Tasarım", "Full Stack", "SEO", "Hosting", "Marka"],
    },
}

function useRv() {
    const ref = useRef(null)
    useEffect(() => {
        const el = ref.current; if (!el) return
        const o = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { el.classList.add("on"); o.disconnect() } },
            { threshold: .06 }
        )
        o.observe(el); return () => o.disconnect()
    }, [])
    return ref
}

const S = {
    section: {
        maxWidth: 1200,
        margin: "0 auto",
        padding: "100px 64px 120px",
        position: "relative",
        zIndex: 1,
        background: "#05050a",
    },
    banner: {
        position: "relative",
        overflow: "hidden",
        border: "1px solid rgba(99,102,241,.16)",
        background: "linear-gradient(135deg, rgba(99,102,241,.06) 0%, rgba(232,121,249,.02) 50%, rgba(5,5,10,.75) 100%)",
        clipPath: "polygon(0 0, calc(100% - 28px) 0, 100% 28px, 100% 100%, 28px 100%, 0 calc(100% - 28px))",
        backdropFilter: "blur(10px)",
        marginTop: 48,
    },
    line: {
        position: "absolute",
        top: 0,
        left: "-100%",
        right: 0,
        height: 1,
        background: "linear-gradient(90deg, transparent, #818cf8, #e879f9, transparent)",
        animation: "borderSlide 5s linear infinite",
        zIndex: 2,
    },
    grid: {
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(99,102,241,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,.025) 1px, transparent 1px)",
        backgroundSize: "52px 52px",
    },
    inner: {
        position: "relative",
        zIndex: 1,
        padding: "60px 64px 64px",
    },
    logoMark: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 56,
        height: 56,
        border: "1px solid rgba(99,102,241,.3)",
        background: "rgba(99,102,241,.09)",
        clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
        marginBottom: 36,
        gap: 1,
    },
    lmA: {
        fontFamily: "'Orbitron', monospace",
        fontSize: 20,
        fontWeight: 900,
        color: "#818cf8",
        textShadow: "0 0 8px #6366f1, 0 0 22px rgba(99,102,241,.5)",
        lineHeight: 1,
    },
    lmX: {
        fontFamily: "'Orbitron', monospace",
        fontSize: 20,
        fontWeight: 900,
        color: "#e879f9",
        textShadow: "0 0 8px #e879f9, 0 0 22px rgba(232,121,249,.4)",
        lineHeight: 1,
    },
    head: {
        display: "flex",
        alignItems: "baseline",
        gap: 20,
        flexWrap: "wrap",
        marginBottom: 10,
    },
    name: {
        fontFamily: "'Orbitron', monospace",
        fontSize: "clamp(28px, 4vw, 48px)",
        fontWeight: 900,
        letterSpacing: ".04em",
        color: "#f0efff",
        lineHeight: 1,
    },
    nameAccent: {
        color: "#818cf8",
        textShadow: "0 0 8px #6366f1, 0 0 22px rgba(99,102,241,.5), 0 0 48px rgba(99,102,241,.2)",
    },
    tag: {
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 9,
        letterSpacing: ".22em",
        textTransform: "uppercase",
        color: "rgba(240,239,255,.35)",
        padding: "4px 13px",
        border: "1px solid rgba(99,102,241,.18)",
        clipPath: "polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)",
        whiteSpace: "nowrap",
    },
    divider: {
        height: 1,
        background: "linear-gradient(90deg, rgba(99,102,241,.22), rgba(232,121,249,.12) 50%, transparent)",
        margin: "28px 0 36px",
    },
    desc: {
        fontFamily: "'Syne', sans-serif",
        fontSize: 15,
        color: "rgba(240,239,255,.62)",
        lineHeight: 1.95,
        maxWidth: 620,
        marginBottom: 36,
    },
    pills: {
        display: "flex",
        flexWrap: "wrap",
        gap: 8,
        marginBottom: 44,
    },
    pill: {
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 9,
        letterSpacing: ".14em",
        textTransform: "uppercase",
        padding: "6px 14px",
        border: "1px solid rgba(99,102,241,.16)",
        color: "rgba(240,239,255,.35)",
        clipPath: "polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)",
        cursor: "default",
        transition: "all .22s",
    },
}

export default function AlgorixaSection({ lang = "EN" }) {
    const c = C[lang]
    const ref = useRv()

    /* Pill hover — inline style ile yapamayız, ref kullanıyoruz */
    const pillHover = e => {
        e.currentTarget.style.borderColor = "rgba(99,102,241,.38)"
        e.currentTarget.style.color = "#c7d2fe"
        e.currentTarget.style.background = "rgba(99,102,241,.08)"
    }
    const pillLeave = e => {
        e.currentTarget.style.borderColor = "rgba(99,102,241,.16)"
        e.currentTarget.style.color = "rgba(240,239,255,.35)"
        e.currentTarget.style.background = "transparent"
    }

    /* CTA hover */
    const ctaRef = useRef(null)
    const ctaHover = () => {
        if (!ctaRef.current) return
        ctaRef.current.style.borderColor = "#818cf8"
        ctaRef.current.style.color = "#fff"
        ctaRef.current.style.boxShadow = "0 0 8px #6366f1, 0 0 22px rgba(99,102,241,.5), 0 0 48px rgba(99,102,241,.2)"
        ctaRef.current.style.transform = "translateY(-2px)"
    }
    const ctaLeave = () => {
        if (!ctaRef.current) return
        ctaRef.current.style.borderColor = "rgba(99,102,241,.38)"
        ctaRef.current.style.color = "#818cf8"
        ctaRef.current.style.boxShadow = "none"
        ctaRef.current.style.transform = "translateY(0)"
    }

    return (
        <section id="algorixa" style={S.section}>

            {/* Section label */}
            <div className="slbl"><span>{c.lbl}</span></div>
            <h2 className="sttl">{c.ttl}<span className="ap">.</span></h2>

            {/* Banner */}
            <div className="rv" ref={ref} style={S.banner}>

                {/* Animated top border */}
                <div style={S.line} />

                {/* Subtle grid */}
                <div style={S.grid} />

                {/* Content */}
                <div style={S.inner}>



                    {/* Name + sub tag */}
                    <div style={S.head}>
                        <div style={S.name}>
                            ALGORI<span style={S.nameAccent}>XA</span>
                        </div>
                        <span style={S.tag}>{c.sub}</span>
                    </div>

                    {/* Divider */}
                    <div style={S.divider} />

                    {/* Description */}
                    <p style={S.desc}>{c.desc}</p>

                    {/* Service pills */}
                    <div style={S.pills}>
                        {c.pills.map(p => (
                            <span
                                key={p}
                                style={S.pill}
                                onMouseEnter={pillHover}
                                onMouseLeave={pillLeave}
                            >
                                {p}
                            </span>
                        ))}
                    </div>

                    {/* CTA */}
                    <a
                        ref={ctaRef}
                        href="https://algorixa.com.tr"
                        target="_blank"
                        rel="noreferrer"
                        onMouseEnter={ctaHover}
                        onMouseLeave={ctaLeave}
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "12px 28px",
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: 10,
                            letterSpacing: ".15em",
                            textTransform: "uppercase",
                            color: "#818cf8",
                            background: "transparent",
                            textDecoration: "none",
                            border: "1px solid rgba(99,102,241,.38)",
                            clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
                            transition: "all .28s cubic-bezier(.22,1,.36,1)",
                            cursor: "none",
                        }}
                    >
                        <span>{c.cta}</span>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>

                </div>
            </div>

            {/* Mobile tweaks */}
            <style>{`
                @media (max-width: 768px) {
                    #algorixa { padding: 64px 20px 80px !important; }
                    #algorixa .rv > div:last-child { padding: 40px 28px 44px !important; }
                    #algorixa [style*="clamp(28px"] { font-size: clamp(24px, 8vw, 36px) !important; }
                    #algorixa [style*="align-items: baseline"] { flex-direction: column; align-items: flex-start !important; gap: 12px !important; }
                    #algorixa [style*="max-width: 620px"] { font-size: 14px !important; line-height: 1.85 !important; }
                    #algorixa [style*="margin-bottom: 36px"][style*="flex-wrap"] { gap: 6px !important; }
                }
                @media (max-width: 480px) {
                    #algorixa { padding: 48px 16px 64px !important; }
                    #algorixa .rv > div:last-child { padding: 32px 20px 36px !important; }
                }
            `}</style>

        </section >
    )
}