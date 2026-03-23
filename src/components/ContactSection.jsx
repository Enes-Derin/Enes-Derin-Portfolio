import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchContact } from "../redux/contactSlice"
import { Mail, Phone, MapPin, Linkedin, Github, ExternalLink, ArrowUpRight } from "lucide-react"

const C = {
    EN: {
        lbl: "Get In Touch", ttl: "Contact",
        sub: "Open to freelance projects, full-time roles & collaborations.",
        avail: "Currently available",
        direct: "Direct channels",
        online: "Find me online",
        cta: "Send an Email",
        resp: "Typically responds within 24h",
        phoneLabel: "Call Enes Derin",
        locationLabel: "Based in Istanbul, Turkey",
    },
    TR: {
        lbl: "İletişime Geç", ttl: "İletişim",
        sub: "Freelance projeler, tam zamanlı roller ve iş birlikleri için açığım.",
        avail: "Şu an müsait",
        direct: "Doğrudan kanallar",
        online: "Çevrimiçi bul",
        cta: "E-posta Gönder",
        resp: "Genellikle 24 saat içinde yanıt verir",
        phoneLabel: "Enes Derin'i ara",
        locationLabel: "İstanbul, Türkiye'de yaşıyor",
    },
}

const SOCIALS = [
    {
        key: "github", label: "GitHub", sub: "github.com/enesderin",
        icon: Github,
        href: (d) => d?.githubLink || "https://github.com/enesderin",
        color: "#6e40c9",
        ariaLabel: (lang) => lang === "TR"
            ? "GitHub profilini ziyaret et — github.com/enesderin"
            : "Visit GitHub profile — github.com/enesderin",
        rel: "noopener noreferrer me",
    },
    {
        key: "linkedin", label: "LinkedIn", sub: "linkedin.com/in/enesderin",
        icon: Linkedin,
        href: (d) => d?.linkedinLink || "https://linkedin.com/in/enesderin",
        color: "#0a66c2",
        ariaLabel: (lang) => lang === "TR"
            ? "LinkedIn profilini ziyaret et — linkedin.com/in/enesderin"
            : "Visit LinkedIn profile — linkedin.com/in/enesderin",
        rel: "noopener noreferrer me",
    },
    {
        key: "medium", label: "Medium", sub: "medium.com/@enes_derin",
        icon: null,
        href: (d) => d?.mediumLink || "https://medium.com/@enes_derin",
        color: "#00ab6c",
        customIcon: true,
        ariaLabel: (lang) => lang === "TR"
            ? "Medium blogunu ziyaret et — medium.com/@enes_derin"
            : "Visit Medium blog — medium.com/@enes_derin",
        rel: "noopener noreferrer",
    },
]

function MediumIcon({ size = 16 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
        </svg>
    )
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

export default function ContactSection({ lang = "EN" }) {
    const dispatch = useDispatch()
    const { data } = useSelector(s => s.contact)
    const c = C[lang]
    const ref = useRv()

    useEffect(() => { dispatch(fetchContact(1)) }, [dispatch])

    const email = data?.email || "enes@enesderin.com"
    const phone = data?.phone
    const location = data?.location || "Istanbul, Turkey"

    return (
        /*
         * SEO — id="contact" PersonSchema'daki #contact WebPage ile eşleşiyor.
         * ContactPoint microdata bu bölüme bağlandı.
         */
        <section
            className="ct-sec"
            id="contact"
            aria-labelledby="contact-heading"
            itemScope
            itemType="https://schema.org/ContactPage"
        >
            <div className="gbg" aria-hidden="true" />

            <div className="slbl" aria-hidden="true"><span>{c.lbl}</span></div>

            <h2 className="sttl" id="contact-heading">
                {c.ttl}<span className="ap" aria-hidden="true">.</span>
            </h2>

            {/*
             * SEO — Alt açıklama paragrafı snippet adayı.
             */}
            <p style={{
                fontFamily: "var(--fm)", fontSize: "11px", color: "var(--t3)",
                letterSpacing: ".06em", marginTop: 8, marginBottom: 0,
                maxWidth: 480, lineHeight: 1.8,
            }}>
                {c.sub}
            </p>

            <div className="ct2-grid rv" ref={ref}>

                {/* ── LEFT ── */}
                <div className="ct2-left">

                    {/* Availability — screen reader için anlamlı */}
                    <div
                        className="ct2-avail"
                        role="status"
                        aria-live="polite"
                        aria-label={c.avail}
                    >
                        <span className="ct2-avail-dot" aria-hidden="true" />
                        <span>{c.avail}</span>
                    </div>

                    {/*
                     * SEO — E-posta linki hem kullanıcı hem crawler için
                     * en değerli iletişim sinyali. itemProp="email" bağlı.
                     */}
                    <a
                        href={`mailto:${email}`}
                        className="ct2-cta-card"
                        aria-label={`${c.cta}: ${email}`}
                        itemProp="email"
                        itemScope
                        itemType="https://schema.org/ContactPoint"
                    >
                        <div className="ct2-cta-inner">
                            <div className="ct2-cta-icon" aria-hidden="true">
                                <Mail size={20} />
                            </div>
                            <div>
                                <div className="ct2-cta-label">{c.cta}</div>
                                <div className="ct2-cta-email">{email}</div>
                            </div>
                        </div>
                        <ArrowUpRight size={16} className="ct2-cta-arr" aria-hidden="true" />
                        <div className="ct2-cta-resp">{c.resp}</div>
                    </a>

                    {/* Direct channels */}
                    <p className="ct2-section-lbl" aria-hidden="true">{c.direct}</p>

                    <address
                        className="ct2-direct"
                        style={{ fontStyle: "normal" }}
                        itemScope
                        itemType="https://schema.org/PostalAddress"
                    >
                        {phone && (
                            <a
                                href={`tel:${phone}`}
                                className="ct2-direct-item"
                                aria-label={`${c.phoneLabel}: ${phone}`}
                                itemProp="telephone"
                            >
                                <Phone size={14} aria-hidden="true" />
                                <span>{phone}</span>
                                <ExternalLink size={11} className="ct2-ext" aria-hidden="true" />
                            </a>
                        )}
                        <div
                            className="ct2-direct-item ct2-loc"
                            aria-label={c.locationLabel}
                            itemProp="addressLocality"
                        >
                            <MapPin size={14} aria-hidden="true" />
                            <span>{location}</span>
                        </div>
                    </address>
                </div>

                {/* ── RIGHT ── */}
                <div className="ct2-right">
                    <p className="ct2-section-lbl" aria-hidden="true">{c.online}</p>

                    {/*
                     * SEO — Sosyal profil linkleri rel="me" ile
                     * Google'ın identity graph'ına bağlanır.
                     * ul/li semantik liste yapısı.
                     */}
                    <ul
                        className="ct2-socials"
                        aria-label={lang === "TR" ? "Sosyal profiller" : "Social profiles"}
                        style={{ listStyle: "none", padding: 0 }}
                    >
                        {SOCIALS.map(({ key, label, sub, icon: Icon, href, color, customIcon, ariaLabel, rel }) => (
                            <li key={key}>
                                <a
                                    href={href(data)}
                                    target="_blank"
                                    rel={rel}
                                    className="ct2-social-card"
                                    style={{ "--accent": color }}
                                    aria-label={ariaLabel(lang)}
                                    itemProp="sameAs"
                                >
                                    <div className="ct2-social-icon-wrap" aria-hidden="true">
                                        {customIcon ? <MediumIcon size={18} /> : <Icon size={18} />}
                                    </div>
                                    <div className="ct2-social-info">
                                        <span className="ct2-social-name">{label}</span>
                                        <span className="ct2-social-sub">{sub}</span>
                                    </div>
                                    <ArrowUpRight size={14} className="ct2-social-arr" aria-hidden="true" />
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Terminal — dekoratif */}
                    <div className="ct2-terminal" aria-hidden="true">
                        <div className="ct2-terminal-bar">
                            <span className="ct2-tdot" style={{ background: "#ff5f57" }} />
                            <span className="ct2-tdot" style={{ background: "#febc2e" }} />
                            <span className="ct2-tdot" style={{ background: "#28c840" }} />
                            <span className="ct2-tname">contact.sh</span>
                        </div>
                        <div className="ct2-terminal-body">
                            <span className="ct2-tprompt">~</span>
                            <span className="ct2-tcmd"> curl https://enesderin.com/hire</span>
                            <br />
                            <span className="ct2-tkey">status</span>
                            <span className="ct2-tcolon">:</span>
                            <span className="ct2-tval"> "open_to_work"</span>
                            <br />
                            <span className="ct2-tkey">response_time</span>
                            <span className="ct2-tcolon">:</span>
                            <span className="ct2-tval"> "24h"</span>
                            <br />
                            <span className="ct2-tkey">location</span>
                            <span className="ct2-tcolon">:</span>
                            <span className="ct2-tval"> "Istanbul, TR"</span>
                            <br />
                            <span className="ct2-tprompt">~</span>
                            <span className="ct2-tcursor" />
                        </div>
                    </div>
                </div >

            </div >
        </section >
    )
}