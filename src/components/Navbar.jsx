import { useEffect, useState, useCallback } from "react"
import { Link } from "react-router-dom"

const L = {
    EN: [
        { t: "About", h: "#about" },
        { t: "Company", h: "#algorixa" },
        { t: "Skills", h: "#skills" },
        { t: "Contact", h: "#contact" },
    ],
    TR: [
        { t: "Hakkımda", h: "#about" },
        { t: "Şirket", h: "#algorixa" },
        { t: "Beceriler", h: "#skills" },
        { t: "İletişim", h: "#contact" },
    ],
}

export default function Navbar({ lang, setLang }) {
    const [sc, setSc] = useState(false)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const fn = () => setSc(window.scrollY > 40)
        window.addEventListener("scroll", fn, { passive: true })
        return () => window.removeEventListener("scroll", fn)
    }, [])

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : ""
        return () => { document.body.style.overflow = "" }
    }, [open])

    const close = useCallback(() => setOpen(false), [])

    /* Drawer link tıklandığında smooth scroll + kapat */
    const handleDrawerLink = useCallback((e, href) => {
        e.preventDefault()
        close()
        /* Drawer kapanma animasyonu bittikten sonra scroll */
        setTimeout(() => {
            const el = document.querySelector(href)
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
        }, 360)
    }, [close])

    return (
        <>
            <nav className={`navbar${sc ? " sc" : ""}`} role="navigation" aria-label="Main navigation">
                <Link to="/" className="nl" onClick={close} aria-label="Enes Derin — Home">
                    {/* <AlgorixaLogo size={26} glow /> */}
                    <span className="nl-txt">ENES <em>DERIN</em></span>
                </Link>

                {/* Desktop links */}
                <ul className="nlinks" role="menubar">
                    {L[lang].map(({ t, h }) => (
                        <li key={t} role="none">
                            <a href={h} role="menuitem">{t}</a>
                        </li>
                    ))}
                </ul>

                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    {/* Dil seçici */}
                    <div className="nlang" role="group" aria-label="Language selector">
                        <button
                            className={lang === "EN" ? "on" : ""}
                            onClick={() => setLang("EN")}
                            aria-pressed={lang === "EN"}
                            aria-label="Switch to English"
                        >
                            EN
                        </button>
                        <button
                            className={lang === "TR" ? "on" : ""}
                            onClick={() => setLang("TR")}
                            aria-pressed={lang === "TR"}
                            aria-label="Türkçeye geç"
                        >
                            TR
                        </button>
                    </div>

                    {/* Hamburger */}
                    <button
                        className={`n-burger${open ? " open" : ""}`}
                        onClick={() => setOpen(o => !o)}
                        aria-label={open ? "Close menu" : "Open menu"}
                        aria-expanded={open}
                        aria-controls="mobile-drawer"
                    >
                        <span aria-hidden="true" />
                        <span aria-hidden="true" />
                        <span aria-hidden="true" />
                    </button>
                </div>
            </nav>

            {/* Mobile drawer */}
            <div
                id="mobile-drawer"
                className={`n-drawer${open ? " open" : ""}`}
                role="dialog"
                aria-modal="true"
                aria-label="Navigation menu"
            >
                <ul role="menu">
                    {L[lang].map(({ t, h }) => (
                        <li key={t} role="none">
                            <a
                                href={h}
                                role="menuitem"
                                onClick={e => handleDrawerLink(e, h)}
                            >
                                {t}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="n-drawer-lang" role="group" aria-label="Language selector">
                    <button
                        className={lang === "EN" ? "on" : ""}
                        onClick={() => { setLang("EN"); close() }}
                        aria-pressed={lang === "EN"}
                    >
                        EN
                    </button>
                    <button
                        className={lang === "TR" ? "on" : ""}
                        onClick={() => { setLang("TR"); close() }}
                        aria-pressed={lang === "TR"}
                    >
                        TR
                    </button>
                </div>
            </div >

            {/* Backdrop */}
            {
                open && (
                    <div
                        onClick={close}
                        aria-hidden="true"
                        style={{
                            position: "fixed",
                            inset: 0,
                            zIndex: 998,
                            background: "rgba(5,5,10,.72)",
                            backdropFilter: "blur(6px)",
                            WebkitBackdropFilter: "blur(6px)",
                            touchAction: "none",
                        }}
                    />
                )
            }
        </>
    )
}