import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAbout } from "../redux/aboutSlice"

const C = {
    EN: {
        lbl: "About Me", ttl: "Developer",
        p2: "I care about clean code, scalable architecture, and great UX. Beyond development I founded Algorixa — an Istanbul-based agency delivering digital products that drive growth.",
        imgAlt: "Enes Derin — Full Stack Developer based in Istanbul",
        photoCaption: "Istanbul · Full Stack Dev",
    },
    TR: {
        lbl: "Hakkımda", ttl: "Geliştirici",
        p2: "Temiz kod, ölçeklenebilir mimari ve iyi UX'e önem veriyorum. Geliştirmenin ötesinde, büyüme odaklı dijital ürünler sunan İstanbul merkezli Algorixa'yı kurdum.",
        imgAlt: "Enes Derin — İstanbul merkezli Full Stack Geliştirici",
        photoCaption: "İstanbul · Full Stack Geliştirici",
    },
}

function useRv() {
    const ref = useRef(null)
    useEffect(() => {
        const el = ref.current; if (!el) return
        const o = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { el.classList.add("on"); o.disconnect() } },
            { threshold: .1 }
        )
        o.observe(el); return () => o.disconnect()
    }, [])
    return ref
}

function useTilt(str = 10) {
    const ref = useRef(null)
    useEffect(() => {
        const el = ref.current; if (!el) return
        if (window.matchMedia('(hover: none)').matches) return
        const mv = e => {
            const r = el.getBoundingClientRect()
            const x = (e.clientX - r.left) / r.width - .5
            const y = (e.clientY - r.top) / r.height - .5
            el.style.transition = "transform .1s"
            el.style.transform = `rotateY(${x * str}deg) rotateX(${-y * str * .6}deg) scale(1.02)`
        }
        const lv = () => {
            el.style.transition = "transform .6s cubic-bezier(.22,1,.36,1)"
            el.style.transform = "rotateY(0) rotateX(0) scale(1)"
        }
        el.addEventListener("mousemove", mv)
        el.addEventListener("mouseleave", lv)
        return () => { el.removeEventListener("mousemove", mv); el.removeEventListener("mouseleave", lv) }
    }, [str])
    return ref
}

export default function AboutSection({ lang = "EN" }) {
    const dispatch = useDispatch()
    const { data } = useSelector(s => s.about)
    const c = C[lang]
    const rvRef = useRv()
    const tiltRef = useTilt(10)

    useEffect(() => { dispatch(fetchAbout(1)) }, [dispatch])

    return (
        /*
         * SEO — id="about" hash anchor olarak PersonSchema'daki
         * #about WebPage node'uyla eşleşiyor.
         * itemScope + Person tipi bu bölümün kim hakkında olduğunu bildirir.
         */
        <section
            className="about-sec"
            id="about"
            aria-labelledby="about-heading"
            itemScope
            itemType="https://schema.org/Person"
        >
            <div className="gbg" aria-hidden="true" />

            {/* slbl dekoratif — screen reader için gizlendi */}
            <div className="slbl" aria-hidden="true"><span>{c.lbl}</span></div>

            {/*
             * SEO — h2 olarak doğru hiyerarşi (h1 hero'da).
             * id ile aria-labelledby bağlantısı kuruldu.
             */}
            <h2
                className="sttl"
                id="about-heading"
                itemProp="name"
            >
                {c.ttl}<span className="ap" aria-hidden="true">.</span>
            </h2>

            <div className="about-grid rv" ref={rvRef}>

                {/*
                 * SEO — Fotoğraf figure/figcaption ile semantik.
                 * alt metni keyword açısından güçlü tutuldu.
                 * itemProp="image" Person schema'sına bağlı.
                 */}
                <figure
                    className="afr"
                    ref={tiltRef}
                    style={{ transformStyle: "preserve-3d", margin: 0 }}
                    itemProp="image"
                    itemScope
                    itemType="https://schema.org/ImageObject"
                >
                    {data?.profileImage ? (
                        <img
                            src={data.profileImage}
                            alt={c.imgAlt}
                            className="afr-img"
                            loading="lazy"
                            decoding="async"
                            width="260"
                            height="300"
                            itemProp="url"
                        />
                    ) : (
                        <div
                            className="afr-ph"
                            role="img"
                            aria-label={c.imgAlt}
                        >
                            ED
                        </div>
                    )}
                    <figcaption
                        className="afr-tag"
                        itemProp="description"
                    >
                        {c.photoCaption}
                    </figcaption>
                </figure>

                {/* IDE card — kısmen dekoratif, kısmen içerik */}
                <div className="about-ide">
                    {/* Terminal bar — dekoratif */}
                    <div className="about-ide-bar" aria-hidden="true">
                        <span className="about-ide-dot" />
                        <span className="about-ide-dot" />
                        <span className="about-ide-dot" />
                        <span className="about-ide-fname">about.me.ts</span>
                    </div>

                    {/*
                     * SEO — Kod bloğu dekoratif görünse de içindeki
                     * gerçek veriler (location, experience, company)
                     * arama motoru tarafından okunur.
                     * itemProp'lar Person schema'sına bağlandı.
                     */}
                    <div className="about-ide-body" role="presentation">
                        <span className="ln" aria-hidden="true">1</span>
                        <span className="cm">{"/** About Enes Derin */"}</span><br />
                        <span className="ln" aria-hidden="true">2</span>
                        <span className="kw">export const </span>
                        <span className="fn">about</span> = {"{"}<br />

                        <span className="ln" aria-hidden="true">3</span>
                        &nbsp;&nbsp;<span className="nb">location</span>:{" "}
                        <span className="st" itemProp="addressLocality">"Istanbul, TR"</span>,<br />

                        <span className="ln" aria-hidden="true">4</span>
                        &nbsp;&nbsp;<span className="nb">experience</span>:{" "}
                        <span className="st">4</span>,
                        <span className="cm"> // years</span><br />

                        <span className="ln" aria-hidden="true">5</span>
                        &nbsp;&nbsp;<span className="nb">company</span>:{" "}
                        <span className="st" itemProp="worksFor">"Algorixa"</span>,<br />

                        <span className="ln" aria-hidden="true">6</span>
                        &nbsp;&nbsp;<span className="nb">available</span>:{" "}
                        <span className="nb">true</span>,<br />

                        <span className="ln" aria-hidden="true">7</span>
                        {"};"}
                    </div>

                    {/*
                     * SEO — Ana metin bloğu. Bu paragraf snippet kaynağı olabilir.
                     * itemProp="description" ile Person schema'sına bağlı.
                     */}
                    <div className="about-txt">
                        <p itemProp="description">{data?.aboutText || c.p2}</p>
                    </div>
                </div>

            </div>
        </section>
    )
}