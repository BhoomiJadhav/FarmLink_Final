// // components/admin/AdminSidebar.jsx
// import { Link, useLocation } from "react-router-dom";

// export default function AdminSidebar() {
//   const { pathname } = useLocation();

//   const menu = [
//     { name: "Dashboard", path: "/admin/dashboard" },
//     { name: "Users", path: "/admin/users" },
//     { name: "Policy Verification", path: "/admin/policies" },
//     { name: "Disputes", path: "/admin/disputes" },
//     { name: "Support Tickets", path: "/admin/support" },
//     { name: "Analytics", path: "/admin/analytics" },
//   ];

//   return (
//     <div className="h-screen w-64 bg-[#0f172a] text-white p-5">
//       <h2 className="text-2xl font-bold mb-8">FarmLink Admin</h2>

//       {menu.map((item) => (
//         <Link
//           key={item.name}
//           to={item.path}
//           className={`block p-3 rounded-lg mb-2 transition ${
//             pathname === item.path ? "bg-blue-600" : "hover:bg-slate-700"
//           }`}
//         >
//           {item.name}
//         </Link>
//       ))}
//     </div>
//   );
// }

import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  ShieldCheck, 
  AlertCircle, 
  MessageSquare, 
  BarChart3,
  LogOut 
} from "lucide-react";
// Import your logo - adjust the path if necessary based on your file structure
import farmlinkLogo from "../../assets/Farmlink_Logo-bg.png"; 

export default function AdminSidebar() {
  const { pathname } = useLocation();

  const menu = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Users", path: "/admin/users", icon: Users },
    { name: "Policy Verification", path: "/admin/policies", icon: ShieldCheck },
    { name: "Disputes", path: "/admin/disputes", icon: AlertCircle },
    { name: "Support Tickets", path: "/admin/support", icon: MessageSquare },
    { name: "Analytics", path: "/admin/analytics", icon: BarChart3 },
  ];

  // Logic for logout - keeping it standard as per your previous setup
  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <aside className="w-72 h-screen bg-[#0f172a] text-white flex flex-col border-r border-slate-800 shadow-2xl overflow-hidden">
      
      {/* BRANDING SECTION WITH LOGO */}
      <div className="px-6 pt-10 pb-8 flex items-center gap-3">
        <div className="h-12 w-12 rounded-xl bg-white p-1 flex items-center justify-center shadow-lg shadow-indigo-500/10">
          <img src={farmlinkLogo} alt="FarmLink Logo" className="object-contain" />
        </div>
        <div>
          <div className="text-xl font-black text-white tracking-tighter leading-none">
            Farm<span className="text-indigo-400">Link</span>
          </div>
          <div className="text-[10px] uppercase font-black text-indigo-500 tracking-[0.2em] mt-1">Management</div>
        </div>
      </div>

      <div className="px-6 mb-6">
        <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent w-full" />
      </div>

      {/* NAVIGATION LINKS */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto no-scrollbar">
        {menu.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 group ${
                isActive
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/40 translate-x-1"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon 
                size={18} 
                className={`transition-colors duration-300 ${
                  isActive ? "text-white" : "text-indigo-500 group-hover:text-indigo-400"
                }`} 
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* BOTTOM ADMIN PROFILE SECTION */}
      <div className="p-4 bg-slate-900/40 border-t border-slate-800/50">
        <div className="bg-[#1e293b] p-4 rounded-2xl border border-slate-700/50 flex items-center justify-between group transition-all">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black shadow-inner">
              A
            </div>
            <div className="min-w-0">
              <p className="text-sm font-black text-white truncate leading-none mb-1">
                Admin Name
              </p>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tighter">
                Admin
              </p>
            </div>
          </div>
          
          <button 
            onClick={logout}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 transition-all duration-300 border border-slate-700 group-hover:border-rose-500/30"
            title="Secure Logout"
          >
            <LogOut size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </aside>
  );
}