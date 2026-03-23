import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../redux/authSlice"
import { Link } from "react-router-dom"
import AlgorixaLogo from "../components/AlgorixaLogo"
import HeroTab from "./HeroTab"
import AboutTab from "./AboutTab"
import ContactTab from "./ContactTab"
import SkillsTab from "./SkillsTab"

const TABS = [
    { k: "hero", label: "Hero" },
    { k: "about", label: "About" },
    { k: "contact", label: "Contact" },
    { k: "skills", label: "Skills" },
]

export default function AdminPage() {
    const [tab, setTab] = useState("hero")
    const dispatch = useDispatch()
    const { user } = useSelector(s => s.auth)

    return (
        <div className="adm-wrap">
            {/* Sidebar */}
            <aside className="adm-sidebar">
                <Link to="/" className="adm-sidebar-logo">
                    <AlgorixaLogo size={20} /> &nbsp;ADMIN
                </Link>

                <nav className="adm-nav">
                    {TABS.map(({ k, label }) => (
                        <button key={k} className={`adm-tab${tab === k ? " on" : ""}`} onClick={() => setTab(k)}>
                            <span className="adm-tab-txt">{label}</span>
                        </button>
                    ))}
                </nav>

                <button className="adm-logout" onClick={() => dispatch(logout())}>
                    {user?.username} · Logout
                </button>
            </aside>

            {/* Content */}
            <main className="adm-main">
                {tab === "hero" && <HeroTab />}
                {tab === "about" && <AboutTab />}
                {tab === "contact" && <ContactTab />}
                {tab === "skills" && <SkillsTab />}
            </main>
        </div>
    )
}