import AdminNavbar from "./AdminNavbar";

export default function AdminLayout({ children }) {
    return (
        <div className="min-h-screen bg-slate-950 text-white flex">
            <AdminNavbar />
            <main className="flex-1 max-w-7xl mx-auto px-4 py-12">
                {children}
            </main>
        </div>
    );
}