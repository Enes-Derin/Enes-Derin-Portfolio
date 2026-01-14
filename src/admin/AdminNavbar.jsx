// AdminNavbar.jsx
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { Link } from "react-router-dom";

export default function AdminNavbar() {
    const dispatch = useDispatch();
    const { user } = useSelector((s) => s.auth);

    return (
        <nav className="fixed left-0 top-1/2 transform -translate-y-1/2 flex flex-col justify-center items-start gap-4 px-4 py-2 bg-slate-900 rounded-r-lg shadow-lg z-50">
            <Link
                to="/"
                className="font-bold text-xl text-neon-blue hover:text-neon-cyan"
            >
                Admin Panel
            </Link>

            <div className="flex flex-col gap-2">
                <span className="text-sm text-slate-400">{user?.username}</span>
                <button
                    onClick={() => dispatch(logout())}
                    className="px-3 py-1 border rounded hover:bg-slate-800 transition"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}
