import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchHero } from "../redux/heroSlice"

const C = {
    EN: {
        status: "Open to opportunities",
        title: "Full Stack Developer",
        roles: ["Full Stack Developer", "React Specialist", "Spring Boot Engineer", "UI/UX Developer", "Algorixa Founder"],
        desc: "I build fast, scalable web applications with modern tech. 4+ years turning ideas into production-ready products.",
        c1: "Hire Me", c2: "See My Work",
        tech: ["React", "Spring Boot"],
        stats: [{ n: "4+", l: "Years Exp." }, { n: "50+", l: "Projects" }, { n: "24h", l: "Response" }],
        code: {
            l1: "// portfolio.config.js",
            l2: '<kw>const</kw> developer = {',
            l3: '  name: <st>"Enes Derin"</st>,',
            l4: '  role: <st>"Full Stack Dev"</st>,',
            l5: '  stack: [<st>"React"</st>, <st>"Java"</st>],',
            l6: '  open: <nb>true</nb>',
            l7: '};',
        },
        /* SEO: h1 içinde görünmez ama tarayıcı başlığına taşınır */
        ariaLabel: "Enes Derin — Full Stack Developer portfolio homepage",
    },
    TR: {
        status: "Yeni fırsatlara açık",
        title: "Full Stack Geliştirici",
        roles: ["Full Stack Geliştirici", "React Uzmanı", "Spring Boot Mühendisi", "UI/UX Geliştirici", "Algorixa Kurucusu"],
        desc: "Modern teknolojilerle hızlı, ölçeklenebilir web uygulamaları geliştiriyorum. 4+ yıldır fikirleri ürüne dönüştürüyorum.",
        c1: "İletişim", c2: "Çalışmalarım",
        tech: ["React", "Spring Boot"],
        stats: [{ n: "4+", l: "Yıl Deneyim" }, { n: "24s", l: "Yanıt" }],
        code: {
            l1: "// portfolio.config.js",
            l2: '<kw>const</kw> developer = {',
            l3: '  name: <st>"Enes Derin"</st>,',
            l4: '  rol: <st>"Full Stack Dev"</st>,',
            l5: '  stack: [<st>"React"</st>, <st>"Java"</st>],',
            l6: '  musait: <nb>true</nb>',
            l7: '};',
        },
        ariaLabel: "Enes Derin — Full Stack Geliştirici portföy ana sayfası",
    },
}

function useTyping(texts, spd = 70, pause = 1800) {
    const ref = useRef(null)
    useEffect(() => {
        let i = 0, ch = 0, del = false, t
        const tick = () => {
            const el = ref.current; if (!el) return
            const cur = texts[i]
            if (del) {
                el.textContent = cur.slice(0, --ch)
                if (ch === 0) { del = false; i = (i + 1) % texts.length; t = setTimeout(tick, 300); return }
                t = setTimeout(tick, spd / 2)
            } else {
                el.textContent = cur.slice(0, ++ch)
                if (ch === cur.length) { del = true; t = setTimeout(tick, pause); return }
                t = setTimeout(tick, spd)
            }
        }
        t = setTimeout(tick, 600)
        return () => clearTimeout(t)
    }, [texts])
    return ref
}

function use3DParallax() {
    const ref = useRef(null)
    useEffect(() => {
        if (window.matchMedia('(hover: none)').matches) return
        const el = ref.current
        if (!el) return
        const onMove = e => {
            const r = el.getBoundingClientRect()
            const cx = r.left + r.width / 2
            const cy = r.top + r.height / 2
            const dx = (e.clientX - cx) / r.width
            const dy = (e.clientY - cy) / r.height
            el.style.transform = `rotateY(${dx * 14}deg) rotateX(${-dy * 10}deg)`
        }
        const onLeave = () => {
            el.style.transition = "transform .8s cubic-bezier(.22,1,.36,1)"
            el.style.transform = "rotateY(0deg) rotateX(0deg)"
            setTimeout(() => { el.style.transition = "" }, 800)
        }
        const parent = el.parentElement
        parent?.addEventListener("mousemove", onMove, { passive: true })
        parent?.addEventListener("mouseleave", onLeave)
        return () => {
            parent?.removeEventListener("mousemove", onMove)
            parent?.removeEventListener("mouseleave", onLeave)
        }
    }, [])
    return ref
}

export default function HeroSection({ lang = "EN" }) {
    const dispatch = useDispatch()
    const { data } = useSelector(s => s.hero)
    const c = C[lang]
    const typRef = useTyping(c.roles)
    const sceneRef = use3DParallax()

    useEffect(() => { dispatch(fetchHero(1)) }, [dispatch])

    return (
        /*
         * SEO — landmark: <section> + aria-label sayfa içi gezinmeye yardımcı olur.
         * Arama motorları bu label'ı bölüm bağlamı olarak kullanır.
         */
        <section
            className="hero"
            id="hero"
            aria-label={c.ariaLabel}
            itemScope
            itemType="https://schema.org/WPHeader"
        >
            <div className="gbg" aria-hidden="true" />
            <div className="orb orb-1" aria-hidden="true" />
            <div className="orb orb-2" aria-hidden="true" />
            <div className="orb orb-3" aria-hidden="true" />
            {data?.backgroundImage && (
                <div
                    className="hbg"
                    style={{ backgroundImage: `url(${data.backgroundImage})` }}
                    role="img"
                    aria-label="Hero background"
                />
            )}
            <div className="hov" aria-hidden="true" />
            <div className="hud-tl" aria-hidden="true" />
            <div className="hud-tr" aria-hidden="true" />
            <div className="hud-bl" aria-hidden="true" />
            <div className="hud-br" aria-hidden="true" />

            <div className="hero-split">

                {/* ── LEFT ── */}
                <div className="hero-left">

                    {/* Status — dekoratif badge, screen reader için gizli değil */}
                    <div className="h-status" role="status" aria-live="polite">
                        <span className="h-status-dot" aria-hidden="true" />
                        <span>{c.status}</span>
                    </div>

                    {/*
                     * SEO — Sayfanın tek <h1>'i burası olmalı.
                     * "Enes Derin" primary keyword, "DERIN" sub görsel ama
                     * ekran okuyucu için birleşik okunur: "ENES DERIN"
                     */}
                    <h1
                        className="hname"
                        itemProp="name"
                    >
                        ENES
                        <span className="hname-sub">DERIN</span>
                    </h1>

                    {/*
                     * SEO — h1 altında h2 değil <p> kullanıyoruz çünkü bu
                     * bir alt başlık değil, iş unvanı tanımı.
                     * jobTitle microdata ile işaretlendi.
                     */}
                    <p
                        className="h-title-tag"
                        itemProp="jobTitle"
                        aria-label={`${lang === "TR" ? "Unvan" : "Job title"}: ${c.title}`}
                    >
                        <span>{c.title}</span>
                    </p>

                    {/*
                     * SEO — Typing efektinin içeriği arama motorları tarafından
                     * görülüyor. aria-label ile statik içerik de sağlandı.
                     */}
                    <p
                        className="hrole"
                        aria-label={c.roles.join(", ")}
                    >
                        <span ref={typRef} aria-hidden="true" />
                        <span className="crsr" aria-hidden="true" />
                    </p>

                    {/*
                     * SEO — description metayla örtüşen, tarayıcının
                     * snippet seçebileceği açıklama paragrafı.
                     * itemProp="description" mikro veri.
                     */}
                    <p
                        className="hdesc"
                        itemProp="description"
                    >
                        {c.desc}
                    </p>

                    {/* Dekoratif kod bloğu — SEO değeri yok, gizlendi */}
                    <div className="h-code" aria-hidden="true">
                        <span style={{ color: "rgba(99,102,241,.25)", marginRight: 14, fontSize: 9 }}>1</span>
                        <span style={{ color: "var(--t4)", fontStyle: "italic" }}>{c.code.l1}</span><br />
                        <span style={{ color: "rgba(99,102,241,.25)", marginRight: 14, fontSize: 9 }}>2</span>
                        <span dangerouslySetInnerHTML={{ __html: c.code.l2 }} /><br />
                        <span style={{ color: "rgba(99,102,241,.25)", marginRight: 14, fontSize: 9 }}>3</span>
                        <span style={{ marginLeft: 8 }} dangerouslySetInnerHTML={{ __html: c.code.l3 }} /><br />
                        <span style={{ color: "rgba(99,102,241,.25)", marginRight: 14, fontSize: 9 }}>4</span>
                        <span style={{ marginLeft: 8 }} dangerouslySetInnerHTML={{ __html: c.code.l4 }} /><br />
                        <span style={{ color: "rgba(99,102,241,.25)", marginRight: 14, fontSize: 9 }}>5</span>
                        <span style={{ marginLeft: 8 }} dangerouslySetInnerHTML={{ __html: c.code.l5 }} /><br />
                        <span style={{ color: "rgba(99,102,241,.25)", marginRight: 14, fontSize: 9 }}>6</span>
                        <span style={{ marginLeft: 8 }} dangerouslySetInnerHTML={{ __html: c.code.l6 }} /><br />
                        <span style={{ color: "rgba(99,102,241,.25)", marginRight: 14, fontSize: 9 }}>7</span>
                        <span>{`};`}</span>
                    </div>

                    {/* CTA butonları */}
                    <nav
                        className="hacts"
                        aria-label={lang === "TR" ? "Ana eylemler" : "Primary actions"}
                    >
                        <a
                            href="#contact"
                            className="btn-p"
                            aria-label={lang === "TR"
                                ? "İletişim bölümüne git"
                                : "Go to contact section"}
                        >
                            <span>{c.c1}</span>
                        </a>
                        <a
                            href="#about"
                            className="btn-o"
                            aria-label={lang === "TR"
                                ? "Hakkımda bölümüne git"
                                : "Go to about section"}
                        >
                            <span>{c.c2}</span>
                        </a>
                    </nav>

                    {/*
                     * SEO — Tech stack chip'leri keyword olarak değerli.
                     * ul/li ile semantik liste yapısı.
                     */}
                    <ul
                        className="h-tech"
                        aria-label={lang === "TR" ? "Kullandığım teknolojiler" : "Technologies I use"}
                        style={{ listStyle: "none", padding: 0 }}
                    >
                        {c.tech.map(t => (
                            <li key={t} className="h-tech-chip">{t}</li>
                        ))}
                    </ul>
                </div>

                {/* ── RIGHT — 3D scene — dekoratif, aria-hidden ── */}
                <div className="hero-right" aria-hidden="true">
                    <div className="h-3d-scene" style={{ transformStyle: "preserve-3d" }}>
                        <div
                            ref={sceneRef}
                            style={{ width: "100%", height: "100%", transformStyle: "preserve-3d", position: "relative" }}
                        >
                            <div className="h-card h-card--main">
                                <div className="h-terminal-bar">
                                    <span className="h-terminal-dot" />
                                    <span className="h-terminal-dot" />
                                    <span className="h-terminal-dot" />
                                    <span className="h-terminal-title">enes.dev ~ portfolio</span>
                                </div>
                                <div className="h-code-body">
                                    <span className="ln">1</span><span className="cm">// config.ts</span><br />
                                    <span className="ln">2</span><span className="kw">interface </span><span className="fn">Developer</span> {"{"}<br />
                                    <span className="ln">3</span>&nbsp;&nbsp;<span className="nb">name</span>: <span className="fn">string</span>;<br />
                                    <span className="ln">4</span>&nbsp;&nbsp;<span className="nb">stack</span>: <span className="fn">string</span>[];<br />
                                    <span className="ln">5</span>&nbsp;&nbsp;<span className="nb">yearsExp</span>: <span className="fn">number</span>;<br />
                                    <span className="ln">6</span>{"}"}<br />
                                    <span className="ln">7</span><br />
                                    <span className="ln">8</span><span className="kw">const </span><span className="fn">me</span>: <span className="fn">Developer</span> = {"{"}<br />
                                    <span className="ln">9</span>&nbsp;&nbsp;<span className="nb">name</span>: <span className="st">"Enes Derin"</span>,<br />
                                    <span className="ln">10</span>&nbsp;&nbsp;<span className="nb">stack</span>: [<span className="st">"React"</span>, <span className="st">"Java"</span>],<br />
                                    <span className="ln">11</span>&nbsp;&nbsp;<span className="nb">yearsExp</span>: <span className="st">4</span><br />
                                    <span className="ln">12</span>{"};"}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div >
        </section >
    )
}