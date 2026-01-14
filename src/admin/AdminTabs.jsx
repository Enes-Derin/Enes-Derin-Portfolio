// AdminTabs.jsx
export default function AdminTabs({ active, onChange }) {
    const tabs = ["hero", "about", "contact", "skills", "projects"];
    return (
        <div className="admin-tabs fixed left-24 top-1/2 transform -translate-y-1/2 flex flex-col gap-4">
            {tabs.map((t) => (
                <div
                    key={t}
                    className={`admin-tab ${active === t ? "active" : ""}`}
                    onClick={() => onChange(t)}
                >
                    {t.toUpperCase()}
                </div>
            ))}
        </div>
    );
}
