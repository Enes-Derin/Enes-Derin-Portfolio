// import React from 'react';
// import { Button, Container, Row, Col } from 'react-bootstrap';


// export default function Home() {
//     return (
//         <Container className="py-5">
//             <Row className="align-items-center">
//                 <Col md={6}>
//                     <h1>Merhaba, ben Enes — Yazılım & Tasarım</h1>
//                     <p>Kullanıcı odaklı web uygulamaları ve modern frontend tecrübeleri.</p>
//                     <Button href="/projects" variant="primary" className="me-2">Projelerime Bak</Button>
//                     <Button href="#" variant="outline-light">CV indir</Button>
//                 </Col>
//                 <Col md={6}>
//                     <div className="bg-secondary rounded p-4 text-center text-light">Hero Image / Placeholder</div>
//                 </Col>
//             </Row>
//         </Container>
//     );
// }
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import SkillsSection from "../components/SkillsSection";
import ProjectsPreviewSection from "../components/ProjectsPreviewSection";
import ContactSection from "../components/ContactSection";
import SEO from "../components/SEO";
import PersonSchema from "../components/PersonSchema";

export default function Home() {
    return (
        <>
            <SEO
                title="Enes Derin – Full Stack Developer & UI/UX Designer"
                description="Modern, performanslı ve kullanıcı odaklı web uygulamaları geliştiren Full Stack Developer. React, Spring Boot, UI/UX."
                url="https://enesderin.com"
            />

            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsPreviewSection />
            <ContactSection />
            <PersonSchema />
        </>
    );
}


