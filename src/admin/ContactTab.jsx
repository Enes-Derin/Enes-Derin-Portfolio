import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { createContact, fetchContact, updateContact } from "../redux/contactSlice";

export default function ContactTab() {
    const dispatch = useDispatch();
    const { data } = useSelector((s) => s.contact);

    const [form, setForm] = useState({ email: "", phone: "", location: "", linkedinLink: "", githubLink: "" });
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        dispatch(fetchContact());
    }, [dispatch]);

    useEffect(() => {
        if (data) {
            setForm(data);
            setEditing(true);
        }
    }, [data]);

    const submit = (e) => {
        e.preventDefault();
        if (editing) {
            dispatch(updateContact({ id: data.id, data: form }));
        } else {
            dispatch(createContact(form));
        }
    };

    return (
        <div>
            <form onSubmit={submit} className="admin-form">
                {Object.keys(form)?.map((key) => (
                    <input
                        key={key}
                        placeholder={key}
                        value={form[key]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    />
                ))}
                <button type="submit">{editing ? "Update Contact" : "Add Contact"}</button>
            </form>

            {data && (
                <div className="admin-list">
                    <div className="admin-list-item">
                        <div>
                            <p>Email: {data.email}</p>
                            <p>Phone: {data.phone}</p>
                            <p>Location: {data.location}</p>
                            <p>LinkedIn: {data.linkedinLink}</p>
                            <p>GitHub: {data.githubLink}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
