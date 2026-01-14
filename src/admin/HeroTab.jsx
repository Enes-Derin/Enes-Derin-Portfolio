import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchHero, updateHero, createHero, deleteHero } from "../redux/heroSlice";

export default function HeroTab() {
    const dispatch = useDispatch();
    const hero = useSelector((s) => s.hero.data); // tek kayıt
    const [form, setForm] = useState({ title: "", subtitle: "", buttonText: "", buttonLink: "", backgroundImage: null });

    useEffect(() => {
        dispatch(fetchHero());
    }, [dispatch]);

    useEffect(() => {
        if (hero) {
            setForm({
                title: hero.title || "",
                subtitle: hero.subtitle || "",
                buttonText: hero.buttonText || "",
                buttonLink: hero.buttonLink || "",
                backgroundImage: null
            });
        }
    }, [hero]);

    const submit = (e) => {
        e.preventDefault();
        const fd = new FormData();
        Object.entries(form).forEach(([k, v]) => v && fd.append(k, v));

        if (hero?.id) {
            dispatch(updateHero({ id: hero.id, formData: fd }));
        } else {
            dispatch(createHero(fd));
        }

        setForm({ title: "", subtitle: "", buttonText: "", buttonLink: "", backgroundImage: null });
    };

    const removeItem = () => {
        if (hero?.id && confirm("Are you sure?")) dispatch(deleteHero(hero.id));
    };

    return (
        <div>
            <form onSubmit={submit} className="admin-form">
                {["title", "subtitle", "buttonText", "buttonLink"].map(f => (
                    <input
                        key={f}
                        placeholder={f}
                        value={form[f]}
                        onChange={(e) => setForm({ ...form, [f]: e.target.value })}
                    />
                ))}
                <div className="file-input-container">
                    <input
                        type="file"
                        id="hero-bg"
                        onChange={(e) => setForm({ ...form, backgroundImage: e.target.files[0] })}
                    />
                    <label htmlFor="hero-bg" className="file-input-label">
                        {form.backgroundImage ? "Dosya Değiştir" : "Arka Plan Seç"}
                    </label>
                    {form.backgroundImage && <span className="file-name">{form.backgroundImage.name}</span>}
                </div>
                <button type="submit">{hero?.id ? "Update Hero" : "Add Hero"}</button>
            </form>

            {hero && (
                <div className="admin-list">
                    <div className="admin-list-item">
                        <div>
                            <p><b>{hero.title}</b></p>
                            <p>{hero.subtitle}</p>
                            <p>{hero.buttonText} → {hero.buttonLink}</p>
                        </div>
                        <div>
                            <button className="update" onClick={() => setForm({
                                title: hero.title,
                                subtitle: hero.subtitle,
                                buttonText: hero.buttonText,
                                buttonLink: hero.buttonLink,
                                backgroundImage: null
                            })}>Update</button>
                            <button className="delete" onClick={removeItem}>Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
