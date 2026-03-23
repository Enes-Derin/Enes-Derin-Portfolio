import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAbout, createAbout, updateAbout, deleteAbout } from "../redux/aboutSlice"

export default function AboutTab() {
    const dispatch = useDispatch()
    const about = useSelector(s => s.about.data)
    const [text, setText] = useState("")
    const [img, setImg] = useState(null)

    useEffect(() => { dispatch(fetchAbout(1)) }, [dispatch])
    useEffect(() => { if (about) setText(about.aboutText || "") }, [about])

    const submit = e => {
        e.preventDefault()
        const fd = new FormData(); fd.append("aboutText", text); if (img) fd.append("profileImage", img)
        about?.id ? dispatch(updateAbout({ id: about.id, formData: fd })) : dispatch(createAbout(fd))
        setImg(null)
    }

    return (
        <div>
            <form onSubmit={submit} className="adm-form">
                <h3>About</h3>
                <textarea rows={5} placeholder="About text" value={text} onChange={e => setText(e.target.value)} />
                <div className="adm-file-wrap">
                    <input type="file" id="ai" onChange={e => setImg(e.target.files[0])} />
                    <label htmlFor="ai" className="adm-file-lbl">{img ? "Change Photo" : "Profile Photo"}</label>
                    {img && <span className="adm-fname">{img.name}</span>}
                </div>
                <button type="submit">{about?.id ? "Update" : "Create"}</button>
            </form>

            {about && (
                <div className="adm-list">
                    <div className="adm-item">
                        <div>
                            <p>{about.aboutText?.slice(0, 80)}…</p>
                            {about.profileImage && <img src={about.profileImage} alt="profile" width={48} style={{ borderRadius: 4, marginTop: 6 }} />}
                        </div>
                        <div className="adm-btns">
                            <button className="adm-btn-u" onClick={() => setText(about.aboutText)}>Edit</button>
                            <button className="adm-btn-d" onClick={() => about?.id && confirm("Delete?") && dispatch(deleteAbout(about.id))}>Del</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}