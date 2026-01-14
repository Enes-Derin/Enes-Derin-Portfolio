import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import AdminLayout from "./AdminLayout";
import AdminTabs from "../admin/AdminTabs";

import HeroTab from "./HeroTab";
import AboutTab from "./AboutTab";
import ContactTab from "./ContactTab";
import SkillsTab from "./SkillsTab";
import ProjectsTab from "./ProjectsTab";



export default function AdminPage() {
    const [tab, setTab] = useState("hero");
    return (
        <div className="admin-container">
            <AdminTabs active={tab} onChange={setTab} />
            {tab === "hero" && <HeroTab />}
            {tab === "about" && <AboutTab />}
            {tab === "contact" && <ContactTab />}
            {tab === "skills" && <SkillsTab />}
            {tab === "projects" && <ProjectsTab />}
        </div>
    );
}

