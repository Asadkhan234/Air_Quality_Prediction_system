import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaChartBar,
  FaWind,
  FaChartPie,
  FaInfoCircle,
  FaMapMarkedAlt,
  FaKey,
  FaChevronLeft,
} from "react-icons/fa";


import { FaUserCircle } from "react-icons/fa";

const links = [
  { to: "/home", label: "Home", icon: FaHome },
  { to: "/dashboard", label: "Dashboard", icon: FaChartBar },
  { to: "/prediction", label: "Prediction", icon: FaWind },
  { to: "/analytics", label: "Analytics", icon: FaChartPie },
  { to: "/geo-analytics", label: "Geo Analytics", icon: FaMapMarkedAlt },
  { to: "/about", label: "About", icon: FaInfoCircle },
];

export default function Sidebar({ collapsed, setCollapsed }) {
  const { pathname } = useLocation();

  return (
    <div
      className={`min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col transition-all duration-300 ease-in-out ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-5 py-6">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-9 h-9 shrink-0 rounded-xl bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center text-lg shadow-lg shadow-cyan-500/20">
            🌍
          </div>
          {!collapsed && (
            <span className="flex flex-col leading-tight min-w-0">
              <span className="font-bold text-sm bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent truncate">
                Air Quality
             
               Intelligence
              </span>
            </span>
          )}
        </div>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed((v) => !v)}
        className="self-end mr-4 mb-4 w-7 h-7 rounded-full bg-slate-700/60 hover:bg-slate-700 flex items-center justify-center text-slate-300 transition-colors"
      >
        <FaChevronLeft
          className={`text-xs transition-transform duration-300 ${
            collapsed ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Nav links */}
      <nav className="flex-1 flex flex-col gap-1 px-3">
        {links.map(({ to, label, icon: Icon }) => {
          const active = pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                active
                  ? "bg-white/10 text-white"
                  : "text-slate-400 hover:text-white hover:bg-white/5 hover:translate-x-1"
              }`}
            >
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r-full bg-cyan-400 animate-pulse-slow" />
              )}
              <span
                className={`w-9 h-9 shrink-0 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                  active
                    ? "bg-gradient-to-br from-cyan-400 to-teal-500 text-white shadow-md shadow-cyan-500/20"
                    : "bg-white/5 text-slate-400 group-hover:bg-white/10 group-hover:text-cyan-300"
                }`}
              >
                <Icon className="text-sm" />
              </span>
              {!collapsed && (
                <span className="text-sm font-medium whitespace-nowrap">{label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      


  <Link
  to="/profile"
  className="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-cyan-300 hover:bg-white/5 transition-all duration-200"
>
  <span className="w-9 h-9 shrink-0 rounded-lg flex items-center justify-center bg-white/5 group-hover:bg-cyan-500/10 transition-colors duration-200">

      <FaUserCircle className="text-sm" />

  </span>

  {!collapsed && (

      <span className="text-sm font-medium">

          My Profile

      </span>

  )}

  </Link>



      {/* Bottom */}
      <div className="px-0 pb-0 pt-0 border-t border-white/15">
        <Link
          to="/change-password"
          className="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-amber-300 hover:bg-white/5 transition-all duration-200"
        >
          <span className="w-9 h-9 shrink-0 rounded-lg flex items-center justify-center bg-white/5 group-hover:bg-amber-500/10 transition-colors duration-200">
            <FaKey className="text-sm" />
          </span>
          {!collapsed && <span className="text-sm font-medium">Change Password</span>}
        </Link>
      </div>
    </div>
  );
}