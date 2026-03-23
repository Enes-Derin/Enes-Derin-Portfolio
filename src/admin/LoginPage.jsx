import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../redux/authSlice"
import { useNavigate } from "react-router-dom"

export default function LoginPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { token } = useSelector(s => s.auth)
    const [form, setForm] = useState({ username: "", password: "" })

    useEffect(() => { if (token) navigate("/admin") }, [token, navigate])

    return (
        <div className="login-wrap">
            <form className="login-box" onSubmit={e => { e.preventDefault(); dispatch(login(form)) }}>
                <h1>ADMIN</h1>
                <input placeholder="Username" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} />
                <input type="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
                <button type="submit">Enter</button>
            </form>
        </div>
    )
}