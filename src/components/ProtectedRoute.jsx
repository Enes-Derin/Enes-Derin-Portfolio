import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const { token, user } = useSelector((s) => s.auth);

    if (!token || user?.role !== "ADMIN") {
        return <Navigate to="/login" replace />;
    }

    return children;
}
