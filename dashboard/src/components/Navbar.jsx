import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaBell, FaChevronDown, FaUserCircle, FaSignOutAlt, FaKey } from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const [profileOpen, setProfileOpen] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);

  const profileRef = useRef(null);
  const bellRef = useRef(null);

  useEffect(() => {
    const refreshUser = () => {
      setUser(
        JSON.parse(localStorage.getItem("user"))
      );
    };

    window.addEventListener("profileUpdated", refreshUser);

    return () => {
      window.removeEventListener("profileUpdated", refreshUser);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
      if (bellRef.current && !bellRef.current.contains(e.target)) {
        setBellOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/login", { replace: true });
  };

  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "?";

  return (
    <div className="sticky top-0 z-30 h-16 flex items-center justify-between px-6 backdrop-blur-md bg-white/70 border-b border-white/40 shadow-sm">
      {/* Left */}
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold text-slate-800 tracking-tight">
          Air Quality Prediction System
        </h2>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <div className="relative" ref={bellRef}>
          <button
            onClick={() => setBellOpen((v) => !v)}
            className="relative w-10 h-10 rounded-full flex items-center justify-center text-slate-500 hover:text-cyan-600 hover:bg-cyan-50 transition-colors duration-200"
          >
            <FaBell className="text-lg" />
            <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
          </button>

          {bellOpen && (
            <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-white shadow-xl border border-slate-100 py-2 animate-dropdown">
              <div className="px-4 py-2 text-sm font-semibold text-slate-700 border-b border-slate-100">
                Notifications
              </div>
              <div className="px-4 py-8 text-center text-sm text-slate-400">
                You're all caught up 🌤
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="w-px h-8 bg-slate-200" />

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen((v) => !v)}
            className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full hover:bg-slate-100 transition-colors duration-200"
          >
            <div className="w-9 h-9 rounded-full overflow-hidden bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center shadow-sm">
              {
                user?.profile_image ?
                (
                  <img
                    src={`${import.meta.env.VITE_API_URL}/uploads/${user.profile_image}`}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                )
                :
                (
                  <span className="text-white text-sm font-semibold">
                    {initials}
                  </span>
                )
              }
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-sm font-medium text-slate-800 leading-tight">
                {user?.name || "Guest"}
              </p>
              <p className="text-xs text-slate-400 leading-tight">{user?.email}</p>
            </div>
            <FaChevronDown
              className={`text-xs text-slate-400 transition-transform duration-200 ${
                profileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white shadow-xl border border-slate-100 py-2 animate-dropdown">
              <div className="px-4 py-3 border-b border-slate-100">
                <p className="text-sm font-semibold text-slate-800 truncate">
                  {user?.name || "Guest"}
                </p>
                <p className="text-xs text-slate-400 truncate">{user?.email}</p>
              </div>

              <button
                onClick={() => {
                  setProfileOpen(false);
                  navigate("/change-password");
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
              >
                <FaKey className="text-slate-400" />
                Change Password
              </button>

              <button
                onClick={() => {
                  setProfileOpen(false);
                  navigate("/Profile");
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
              >
                <FaUserCircle className="text-slate-400" />
                My Profile
              </button>

              <div className="my-1 border-t border-slate-100" />

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 transition-colors rounded-b-2xl"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}