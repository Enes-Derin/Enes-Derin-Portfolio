import { useState } from "react"
import Navbar from "../components/Navbar"
import HeroSection from "../components/HeroSection"
import AboutSection from "../components/AboutSection"
import AlgorixaSection from "../components/AlgorixaSection"
import SkillsSection from "../components/SkillsSection"
import ContactSection from "../components/ContactSection"
import Footer from "../components/Footer"
import SEO from "../components/SEO"
import PersonSchema from "../components/PersonSchema"

export default function Home() {
    const [lang, setLang] = useState("TR")
    return (
        <>
            <SEO title="Enes Derin — Full Stack Developer & Algorixa Founder" description="Full stack developer & founder of Algorixa. React, Spring Boot, modern web applications." url="https://enesderin.com" />
            <Navbar lang={lang} setLang={setLang} />
            <HeroSection lang={lang} />
            <div className="sdiv" />
            <AboutSection lang={lang} />
            <div className="sdiv" />
            <AlgorixaSection lang={lang} />
            <div className="sdiv" />
            <SkillsSection lang={lang} />
            <div className="sdiv" />
            <ContactSection lang={lang} />
            <Footer />
            <PersonSchema />
        </>
    )
}