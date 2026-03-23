import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchHero, createHero, updateHero, deleteHero } from "../redux/heroSlice"

export default function HeroTab() {
    const dispatch = useDispatch()
    const hero = useSelector(s => s.hero.data)
    const [form, setForm] = useState({ title: "", subtitle: "", buttonText: "", buttonLink: "", backgroundImage: null })

    useEffect(() => { dispatch(fetchHero(1)) }, [dispatch])
    useEffect(() => { if (hero) setForm({ title: hero.title || "", subtitle: hero.subtitle || "", buttonText: hero.buttonText || "", buttonLink: hero.buttonLink || "", backgroundImage: null }) }, [hero])

    const submit = e => {
        e.preventDefault()
        const fd = new FormData()
        Object.entries(form).forEach(([k, v]) => v && fd.append(k, v))
        hero?.id ? dispatch(updateHero({ id: hero.id, formData: fd })) : dispatch(createHero(fd))
    }

    return (
        <div>
            <form onSubmit={submit} className="adm-form">
                <h3>Hero Section</h3>
                {["title", "subtitle", "buttonText", "buttonLink"].map(f => (
                    <input key={f} placeholder={f} value={form[f]} onChange={e => setForm({ ...form, [f]: e.target.value })} />
                ))}
                <div className="adm-file-wrap">
                    <input type="file" id="hbg" onChange={e => setForm({ ...form, backgroundImage: e.target.files[0] })} />
                    <label htmlFor="hbg" className="adm-file-lbl">
                        {form.backgroundImage ? "Change File" : "Background Image"}
                    </label>
                    {form.backgroundImage && <span className="adm-fname">{form.backgroundImage.name}</span>}
                </div>
                <button type="submit">{hero?.id ? "Update" : "Create"}</button>
            </form>

            {hero && (
                <div className="adm-list">
                    <div className="adm-item">
                        <div><p><b>{hero.title}</b></p><p>{hero.subtitle}</p></div>
                        <div className="adm-btns">
                            <button className="adm-btn-u" onClick={() => setForm({ title: hero.title, subtitle: hero.subtitle, buttonText: hero.buttonText, buttonLink: hero.buttonLink, backgroundImage: null })}>Edit</button>
                            <button className="adm-btn-d" onClick={() => hero?.id && confirm("Delete?") && dispatch(deleteHero(hero.id))}>Del</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}