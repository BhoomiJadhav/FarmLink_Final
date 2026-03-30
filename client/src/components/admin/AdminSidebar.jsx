// components/admin/AdminSidebar.jsx
import { Link, useLocation } from "react-router-dom";

export default function AdminSidebar() {
  const { pathname } = useLocation();

  const menu = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Users", path: "/admin/users" },
    { name: "Policy Verification", path: "/admin/policies" },
    { name: "Disputes", path: "/admin/disputes" },
    { name: "Support Tickets", path: "/admin/support" },
    { name: "Analytics", path: "/admin/analytics" },
  ];

  return (
    <div className="h-screen w-64 bg-[#0f172a] text-white p-5">
      <h2 className="text-2xl font-bold mb-8">FarmLink Admin</h2>

      {menu.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className={`block p-3 rounded-lg mb-2 transition ${
            pathname === item.path ? "bg-blue-600" : "hover:bg-slate-700"
          }`}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}
