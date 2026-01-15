import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
    fetchAllProjects,
    createProject,
    deleteProject,
} from "../redux/projectSlice";

export default function ProjectsTab() {
    const dispatch = useDispatch();
    const { list } = useSelector((s) => s.project);

    const [form, setForm] = useState({ title: "", description: "", githubLink: "", demoLink: "", techStack: "", imageUrl: null });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        dispatch(fetchAllProjects());
    }, [dispatch]);

    const submit = (e) => {
        e.preventDefault();
        const fd = new FormData();
        Object.entries(form).forEach(([k, v]) => v && fd.append(k, v));
        if (editingId) {
            dispatch(updateProject({ id: editingId, formData: fd }));
        } else {
            dispatch(createProject(fd));
        }
        setForm({ title: "", description: "", githubLink: "", demoLink: "", techStack: "", imageUrl: null });
        setEditingId(null);
    };

    const editItem = (item) => {
        setForm({ title: item.title, description: item.description, githubLink: item.githubLink, demoLink: item.demoLink, techStack: item.techStack, image: null });
        setEditingId(item.id);
    };

    const removeItem = (id) => {
        if (confirm("Are you sure?")) dispatch(deleteProject(id));
    };

    return (
        <div>
            <form onSubmit={submit} className="admin-form">
                {["title", "description", "githubLink", "demoLink", "techStack"].map(f => (
                    <input key={f} placeholder={f} value={form[f]} onChange={(e) => setForm({ ...form, [f]: e.target.value })} />
                ))}
                <div className="file-input-container">
                    <input
                        type="file"
                        id="project-image"
                        onChange={(e) => setForm({ ...form, imageUrl: e.target.files[0] })}
                    />
                    <label htmlFor="project-image" className="file-input-label">
                        {form.imageUrl ? "Dosya Değiştir" : "Proje Görseli Seç"}
                    </label>
                    {form.imageUrl && <span className="file-name">{form.imageUrl}</span>}
                </div>

                <button type="submit">{editingId ? "Update Project" : "Add Project"}</button>
            </form>

            <div className="admin-list">
                {list.map((p) => (
                    <div key={p.id} className="admin-list-item">
                        <div>
                            <p><b>{p.title}</b></p>
                            <p>{p.description}</p>
                            <p>GitHub: {p.githubLink}</p>
                            <p>Demo: {p.demoLink}</p>
                            <p>Tech: {p.techStack}</p>
                        </div>
                        <div>
                            <button className="update" onClick={() => editItem(p)}>Update</button>
                            <button className="delete" onClick={() => removeItem(p.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}