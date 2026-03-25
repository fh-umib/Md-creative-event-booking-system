import { Link, NavLink } from "react-router-dom";
import { User } from "lucide-react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Decorations", path: "/decorations" },
  { name: "Mascots", path: "/mascots" },
  { name: "Activities", path: "/activities" },
  { name: "Photo Booth", path: "/gallery" },
  { name: "Packages", path: "/packages" },
  { name: "Gallery", path: "/gallery" },
  { name: "Our Team", path: "/staff" },
  { name: "Reviews", path: "/reviews" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-3xl font-semibold tracking-tight text-slate-900">
          MD <span className="text-amber-500">Creative</span>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `rounded-xl px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-slate-800 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/booking"
            className="rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
          >
            Book Now
          </Link>

          <Link
            to="/login"
            className="flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <User size={18} />
            Sign In
          </Link>
        </div>
      </div>
    </header>
  );
}