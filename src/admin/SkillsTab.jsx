import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchSkills, createSkill, deleteSkill, updateSkill } from "../redux/skillSlice";

export default function SkillsTab() {
    const dispatch = useDispatch();
    const { list } = useSelector((s) => s.skill);

    const [form, setForm] = useState({ name: "", percentage: "", iconFile: null });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        dispatch(fetchSkills());
    }, [dispatch]);

    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("percentage", form.percentage);
        if (form.iconFile) {
            formData.append("iconUrl", form.iconFile);
        }

        if (editingId) {
            dispatch(updateSkill({ id: editingId, data: formData }));
        } else {
            dispatch(createSkill(formData));
        }

        setForm({ name: "", percentage: "" });
        setEditingId(null);
    };
    const editItem = (item) => {
        setForm({ name: item.name, percentage: item.percentage, iconFile: null });
        setEditingId(item.id);
    };

    const removeItem = (id) => {
        if (!id) {
            console.error("Skill ID is undefined! Delete aborted.");
            return;
        }
        if (confirm("Are you sure?")) dispatch(deleteSkill(id));
    };

    return (
        <div>
            <form onSubmit={submit} className="admin-form">
                <input
                    placeholder="Skill name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                    placeholder="Percentage"
                    value={form.percentage}
                    onChange={(e) => setForm({ ...form, percentage: e.target.value })}
                />

                {/* Modern file input */}
                <div className="file-input-container">
                    <input
                        type="file"
                        id="skill-image"
                        onChange={(e) => setForm({ ...form, iconFile: e.target.files[0] })}
                    />
                    <label htmlFor="skill-image" className="file-input-label">
                        {form.iconFile ? "Dosya Değiştir" : "Logo İconu Seç"}
                    </label>
                    {form.iconFile && <span className="file-name">{form.iconFile.name}</span>}
                </div>

                <button type="submit">{editingId ? "Update Skill" : "Add Skill"}</button>
            </form>

            <div className="admin-list">
                {list.map((s, index) => (
                    <div key={s.id ?? index} className="admin-list-item">
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            {/* Icon preview */}
                            {s.iconUrl && (
                                <img
                                    src={s.iconUrl}
                                    alt={s.name}
                                    style={{ width: "40px", height: "40px", borderRadius: "6px", objectFit: "cover" }}
                                />
                            )}
                            <span>{s.name} – {s.percentage}%</span>
                        </div>

                        <div>
                            <button className="update" onClick={() => editItem(s)}>Update</button>
                            <button className="delete" onClick={() => removeItem(s.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
