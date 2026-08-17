import { LayoutDashboard, LogOut, Menu, ShieldCheck, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Logo } from "../components/Logo";

const navItems = [
  { to: "/learn", label: "Learn" },
  { to: "/roadmap", label: "Roadmap" },
  { to: "/practice", label: "Practice" },
  { to: "/progress", label: "Progress" },
];

export const AppLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const closeMenu = () => setMobileOpen(false);

  return (
    <div className="min-h-screen bg-black text-ink">
      <header className="sticky top-0 z-30 border-b border-emerald-950/80 bg-black/90 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
            <Logo size="md" />
          </Link>
          <nav className="hidden items-center gap-2 md:flex" aria-label="Primary navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-2.5 text-[15px] font-semibold transition-all ${
                    isActive
                      ? "bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 shadow-[0_0_12px_rgba(16,185,129,0.2)]"
                      : "text-zinc-400 hover:bg-emerald-950/30 hover:text-zinc-100"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            {user ? (
              <>
                {user.role === "ADMIN" && (
                  <Link
                    to="/admin"
                    className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-emerald-300 hover:bg-emerald-950/50 hover:text-emerald-200"
                  >
                    <ShieldCheck size={16} /> Admin
                  </Link>
                )}
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-zinc-300 hover:bg-emerald-950/50 hover:text-emerald-300"
                >
                  <LayoutDashboard size={16} /> Dashboard
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className="rounded-lg px-3 py-2 text-sm font-semibold text-zinc-400 hover:text-rose-400"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm font-semibold text-zinc-300 hover:text-emerald-400">
                  Log in
                </Link>
                <Link to="/register" className="button-primary !px-5 !py-2.5 text-[15px]">
                  Create account
                </Link>
              </>
            )}
          </div>
          <button
            type="button"
            className="rounded-lg border border-emerald-950/60 p-2 text-zinc-300 hover:bg-emerald-950/50 md:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
        {mobileOpen && (
          <nav className="border-t border-emerald-950 bg-black px-5 py-4 md:hidden" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `block rounded-lg px-3 py-3.5 text-base font-medium ${
                    isActive ? "bg-emerald-950/80 text-emerald-400 border border-emerald-800/40" : "text-zinc-300"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            {user ? (
              <>
                {user.role === "ADMIN" && (
                  <Link
                    onClick={closeMenu}
                    to="/admin"
                    className="mt-2 flex items-center gap-2 rounded-lg px-3 py-3.5 text-base font-semibold text-emerald-300"
                  >
                    <ShieldCheck size={16} /> Admin
                  </Link>
                )}
                <Link
                  onClick={closeMenu}
                  to="/dashboard"
                  className="mt-2 flex items-center gap-2 rounded-lg border border-emerald-950 px-3 py-3.5 text-base font-semibold text-zinc-200"
                >
                  <LayoutDashboard size={16} /> Dashboard
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="mt-2 flex w-full items-center gap-2 rounded-lg px-3 py-3.5 text-left text-base font-semibold text-zinc-400 hover:text-rose-400"
                >
                  <LogOut size={16} /> Log out
                </button>
              </>
            ) : (
              <Link
                onClick={closeMenu}
                to="/login"
                className="mt-2 block rounded-lg border border-emerald-950 px-3 py-3.5 text-base font-semibold text-zinc-200"
              >
                Log in
              </Link>
            )}
          </nav>
        )}
      </header>
      <main><Outlet /></main>
      <footer className="border-t border-emerald-950/80 bg-black">
        <div className="mx-auto flex max-w-screen-2xl flex-col gap-4 px-4 py-12 text-base text-zinc-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Logo size="sm" showText={false} />
            <span>© 2026 AlgoVisual. AMOLED Dark Emerald Edition.</span>
          </div>
          <span className="text-emerald-500/80 font-medium">Learn algorithms step-by-step.</span>
        </div>
      </footer>
    </div>
  );
};

