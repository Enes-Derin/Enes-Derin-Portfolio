import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchSkills, createSkill, updateSkill, deleteSkill } from "../redux/skillSlice"

export default function SkillsTab() {
    const dispatch = useDispatch()
    const { list } = useSelector(s => s.skill)
    const [form, setForm] = useState({ name: "", percentage: "", iconFile: null })
    const [eid, setEid] = useState(null)

    useEffect(() => { dispatch(fetchSkills()) }, [dispatch])

    const submit = e => {
        e.preventDefault()
        const fd = new FormData(); fd.append("name", form.name); fd.append("percentage", form.percentage); if (form.iconFile) fd.append("iconUrl", form.iconFile)
        eid ? dispatch(updateSkill({ id: eid, data: fd })) : dispatch(createSkill(fd))
        setForm({ name: "", percentage: "", iconFile: null }); setEid(null)
    }

    return (
        <div>
            <form onSubmit={submit} className="adm-form">
                <h3>Skills</h3>
                <input placeholder="Skill name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                <input placeholder="Percentage (0-100)" value={form.percentage} onChange={e => setForm({ ...form, percentage: e.target.value })} />
                <div className="adm-file-wrap">
                    <input type="file" id="si" onChange={e => setForm({ ...form, iconFile: e.target.files[0] })} />
                    <label htmlFor="si" className="adm-file-lbl">{form.iconFile ? "Change Icon" : "Skill Icon"}</label>
                    {form.iconFile && <span className="adm-fname">{form.iconFile.name}</span>}
                </div>
                <button type="submit">{eid ? "Update" : "Add Skill"}</button>
            </form>

            <div className="adm-list">
                {list.map((s, i) => (
                    <div key={s.id ?? i} className="adm-item">
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            {s.iconUrl && <img src={s.iconUrl} alt={s.name} width={32} height={32} style={{ borderRadius: 4, objectFit: "cover" }} />}
                            <span style={{ fontSize: 13 }}><b>{s.name}</b> — {s.percentage}%</span>
                        </div>
                        <div className="adm-btns">
                            <button className="adm-btn-u" onClick={() => { setForm({ name: s.name, percentage: s.percentage, iconFile: null }); setEid(s.id) }}>Edit</button>
                            <button className="adm-btn-d" onClick={() => s.id && confirm("Delete?") && dispatch(deleteSkill(s.id))}>Del</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}