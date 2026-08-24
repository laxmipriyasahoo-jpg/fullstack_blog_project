import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiLogOut } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/login");
  };

  const navClass = ({ isActive }) =>
    `transition ${isActive ? "text-indigo-600 font-semibold" : "text-slate-600 hover:text-indigo-600"}`;

  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-2xl font-extrabold text-indigo-600">
          BlogSphere
        </Link>

        <button
          className="rounded-lg p-2 text-xl md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>

        <div className={`${open ? "flex" : "hidden"} absolute left-0 top-full w-full flex-col gap-4 border-b bg-white p-5 md:static md:flex md:w-auto md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0`}>
          <NavLink to="/" className={navClass} onClick={() => setOpen(false)}>Home</NavLink>

          {user ? (
            <>
              <NavLink to="/dashboard" className={navClass} onClick={() => setOpen(false)}>Dashboard</NavLink>
              <NavLink to="/create" className={navClass} onClick={() => setOpen(false)}>Write</NavLink>
              <button onClick={handleLogout} className="flex items-center gap-2 text-left text-red-600 hover:text-red-700">
                <FiLogOut /> Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={navClass} onClick={() => setOpen(false)}>Login</NavLink>
              <Link to="/register" onClick={() => setOpen(false)} className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
