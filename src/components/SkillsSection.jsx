import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchSkills } from "../redux/skillSlice"

const C = {
    EN: {
        lbl: "What I Use", ttl: "Skills",
        gridLabel: "Technical skills and proficiency levels",
        proficiency: "Proficiency",
    },
    TR: {
        lbl: "Kullandıklarım", ttl: "Beceriler",
        gridLabel: "Teknik beceriler ve yetkinlik seviyeleri",
        proficiency: "Yetkinlik",
    },
}

export default function SkillsSection({ lang = "EN" }) {
    const dispatch = useDispatch()
    const { list } = useSelector(s => s.skill)
    const c = C[lang]
    const ref = useRef(null)

    useEffect(() => { dispatch(fetchSkills()) }, [dispatch])

    useEffect(() => {
        const g = ref.current
        if (!g) return
        const o = new IntersectionObserver(entries => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add("on")
                        const fl = entry.target.querySelector(".sk-fl")
                        const pct = entry.target.dataset.pct
                        if (fl && pct) fl.style.width = pct + "%"
                    }, i * 60)
                }
            })
        }, { threshold: 0.12 })
        g.querySelectorAll(".sk-card").forEach(card => o.observe(card))
        return () => o.disconnect()
    }, [list])

    return (
        /*
         * SEO — id="skills" PersonSchema'daki #skills WebPage ile eşleşiyor.
         * aria-labelledby ile h2'ye bağlandı.
         */
        <section
            className="sk-sec"
            id="skills"
            aria-labelledby="skills-heading"
        >
            <div className="gbg" aria-hidden="true" />

            <div className="slbl" aria-hidden="true"><span>{c.lbl}</span></div>

            {/*
             * SEO — h2 hiyerarşisi doğru. "Skills" keyword bölüm başlığı.
             */}
            <h2 className="sttl" id="skills-heading">
                {c.ttl}<span className="ap" aria-hidden="true">.</span>
            </h2>

            {/*
             * SEO — Skill kartları ul/li listesi olarak semantik yapıya alındı.
             * Her li bir teknoloji keyword'ü taşıyor.
             * aria-label grid'in amacını açıklıyor.
             */}
            <ul
                className="sk-grid"
                ref={ref}
                aria-label={c.gridLabel}
                style={{ listStyle: "none", padding: 0 }}
            >
                {list.map(s => (
                    <li
                        key={s.name}
                        className="sk-card"
                        data-pct={s.percentage}
                        style={{ willChange: "transform" }}
                        /*
                         * SEO — Her kart, teknoloji adı ve yetkinlik seviyesini
                         * screen reader'a açıklıyor.
                         */
                        aria-label={`${s.name} — ${c.proficiency}: ${s.percentage}%`}
                        itemScope
                        itemType="https://schema.org/DefinedTerm"
                    >
                        <div className="sk-hd">
                            {s.iconUrl && (
                                <img
                                    src={s.iconUrl}
                                    alt={`${s.name} logo`}
                                    className="sk-ic"
                                    loading="lazy"
                                    decoding="async"
                                    width="24"
                                    height="24"
                                    draggable={false}
                                    onDragStart={e => e.preventDefault()}
                                    itemProp="image"
                                />
                            )}
                            {/*
                             * SEO — Teknoloji ismi itemProp="name" ile
                             * DefinedTerm schema'sına bağlandı.
                             */}
                            <span className="sk-nm" itemProp="name">{s.name}</span>
                            <span
                                className="sk-pc"
                                aria-hidden="true"
                            >
                                {s.percentage}%
                            </span>
                        </div>

                        {/*
                         * SEO — Progress bar görsel, değer aria ile iletildi.
                         * role="meter" + aria-valuenow semantik yüzde bilgisi verir.
                         */}
                        <div
                            className="sk-tr"
                            role="meter"
                            aria-valuenow={s.percentage}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-label={`${s.name} ${c.proficiency}: ${s.percentage}%`}
                        >
                            <div className="sk-fl" />
                            <div className="sk-dt" aria-hidden="true" />
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}