import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";


export default function LoginPage() {
    const dispatch = useDispatch();
    const [form, setForm] = useState({ username: "", password: "" });
    const navigate = useNavigate();
    const { token } = useSelector((s) => s.auth);

    useEffect(() => {
        if (token) navigate("/admin");
    }, [token, navigate]);

    const submit = (e) => {
        e.preventDefault();
        dispatch(login(form));
    };

    return (
        <div className="login-container">
            <form onSubmit={submit} className="login-form">
                <h1>Admin Login</h1>

                <input
                    placeholder="Username"
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />

                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    );
}
