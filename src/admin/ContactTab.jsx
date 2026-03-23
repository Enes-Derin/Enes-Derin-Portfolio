import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchContact, createContact, updateContact } from "../redux/contactSlice"

const FIELDS = ["email", "phone", "location", "linkedinLink", "githubLink"]

export default function ContactTab() {
    const dispatch = useDispatch()
    const { data } = useSelector(s => s.contact)
    const [form, setForm] = useState({ email: "", phone: "", location: "", linkedinLink: "", githubLink: "" })

    useEffect(() => { dispatch(fetchContact(1)) }, [dispatch])
    useEffect(() => { if (data) setForm(data) }, [data])

    const submit = e => {
        e.preventDefault()
        data ? dispatch(updateContact({ id: data.id, data: form })) : dispatch(createContact(form))
    }

    return (
        <div>
            <form onSubmit={submit} className="adm-form">
                <h3>Contact Info</h3>
                {FIELDS.map(k => (
                    <input key={k} placeholder={k} value={form[k] || ""} onChange={e => setForm({ ...form, [k]: e.target.value })} />
                ))}
                <button type="submit">{data ? "Update" : "Create"}</button>
            </form>

            {data && (
                <div className="adm-list">
                    <div className="adm-item">
                        <div><p><b>{data.email}</b></p><p>{data.phone} · {data.location}</p></div>
                    </div>
                </div>
            )}
        </div>
    )
}