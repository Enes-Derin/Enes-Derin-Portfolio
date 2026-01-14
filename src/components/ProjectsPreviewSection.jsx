import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProjects } from "../redux/projectSlice";
import { Link } from "react-router-dom";

export default function ProjectsPreviewSection() {
    const dispatch = useDispatch();
    const { list } = useSelector(state => state.project);

    useEffect(() => {
        dispatch(fetchAllProjects());
    }, [dispatch]);

    return (
        <section id="projects" className="section">
            <h2 className="section-title">Projects</h2>
            <div className="section-line" />

            <div className="projects-grid preview">
                {list.slice(0, 4).map(i => (
                    <div key={i.id} className="project preview-card">
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
                <Link to="/projects" className="nav-btn hero-btn secondary">
                    More Projects
                </Link>
            </div>

        </section>
    );
}
