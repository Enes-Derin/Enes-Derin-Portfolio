import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProjects } from "../redux/projectSlice";
import SEO from "../components/SEO";
import { p } from "framer-motion/client";
import { Link } from "react-router-dom";

export default function Projects() {
    const dispatch = useDispatch();
    const { list } = useSelector(state => state.project);

    useEffect(() => {
        dispatch(fetchAllProjects());
    }, [dispatch]);

    return (

        <>
            <SEO
                title="Projects | Enes Derin"
                description="React, Spring Boot ve modern teknolojilerle geliştirilmiş seçme projeler."
                url="https://enesderin.com/projects"
                type="article"
            />

            <section className="section">
                <h2>Projects</h2>
                <div className="projects-grid">
                    {list?.map((i) => (
                        <div key={i.id} className="project">
                            <img src={i.imageUrl} alt={i.title} />

                            <div className="project-content">
                                <h3>{i.title}</h3>
                                <p>{i.description}</p>

                                <div className="project-tech">
                                    {i.techStack.split(",").map(t => (
                                        <span key={t}>{t.trim()}</span>
                                    ))}
                                </div>

                                <div className="project-links">
                                    <a
                                        className="project-btn github"
                                        href={i.githubLink}
                                        target="_blank"
                                    >
                                        GitHub
                                    </a>

                                    <a
                                        className="project-btn demo"
                                        href={i.demoLink}
                                        target="_blank"
                                    >
                                        Live Demo
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{ textAlign: "center", marginTop: 48 }}>
                    <Link to="/" className="nav-btn hero-btn">Back to Home</Link>
                </div>
            </section>
        </>
    );
}
