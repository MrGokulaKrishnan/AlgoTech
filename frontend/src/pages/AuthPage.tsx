import { ArrowRight, LogIn, UserPlus } from "lucide-react";
import { FormEvent, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ApiError } from "../services/api";
import { Logo } from "../components/Logo";

type AuthMode = "login" | "register";
type AuthPageProps = { mode: AuthMode };
type LocationState = { from?: string };

const getReturnPath = (state: unknown): string =>
  typeof state === "object" && state !== null && "from" in state && typeof (state as LocationState).from === "string"
    ? (state as LocationState).from ?? "/dashboard"
    : "/dashboard";

export const AuthPage = ({ mode }: AuthPageProps) => {
  const isRegister = mode === "register";
  const { user, login, register } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const returnPath = getReturnPath(location.state);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (user) return <Navigate to={returnPath} replace />;

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(undefined);
    if (isRegister && password !== confirmPassword) {
      setError("The two passwords do not match.");
      return;
    }
    setIsSubmitting(true);
    try {
      if (isRegister) await register({ name, email, password });
      else await login({ email, password });
      navigate(returnPath, { replace: true });
    } catch (caught) {
      setError(caught instanceof ApiError ? caught.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative grid min-h-[calc(100vh-8rem)] place-items-center overflow-hidden px-4 py-12 bg-black">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.15),transparent_55%)]" />
      <div className="panel w-full max-w-md p-6 sm:p-8 border-emerald-900/40 bg-black/90 shadow-[0_0_50px_rgba(16,185,129,0.08)]">
        <Link to="/" className="flex items-center gap-2">
          <Logo size="md" />
        </Link>
        <p className="eyebrow mt-8">Your learning space</p>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-white">
          {isRegister ? "Start learning with a plan." : "Welcome back."}
        </h1>
        <p className="mt-3 leading-7 text-zinc-400 text-sm">
          {isRegister
            ? "Create a free account to save your completed algorithms and continue where you left off."
            : "Sign in to see your saved learning progress."}
        </p>
        <form className="mt-7 grid gap-4" onSubmit={submit}>
          {isRegister && (
            <label className="grid gap-1.5 text-sm font-medium text-zinc-200">
              Name
              <input
                required
                maxLength={80}
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="name"
                className="rounded-xl border border-emerald-950 bg-black px-3.5 py-2.5 text-white placeholder-zinc-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </label>
          )}
          <label className="grid gap-1.5 text-sm font-medium text-zinc-200">
            Email
            <input
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              className="rounded-xl border border-emerald-950 bg-black px-3.5 py-2.5 text-white placeholder-zinc-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </label>
          <label className="grid gap-1.5 text-sm font-medium text-zinc-200">
            Password
            <input
              required
              minLength={8}
              maxLength={72}
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete={isRegister ? "new-password" : "current-password"}
              className="rounded-xl border border-emerald-950 bg-black px-3.5 py-2.5 text-white placeholder-zinc-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </label>
          {isRegister && (
            <label className="grid gap-1.5 text-sm font-medium text-zinc-200">
              Confirm password
              <input
                required
                minLength={8}
                maxLength={72}
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                autoComplete="new-password"
                className="rounded-xl border border-emerald-950 bg-black px-3.5 py-2.5 text-white placeholder-zinc-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </label>
          )}
          {error && (
            <p role="alert" className="rounded-lg border border-rose-500/40 bg-rose-950/30 px-3.5 py-2.5 text-sm text-rose-200">
              {error}
            </p>
          )}
          <button type="submit" disabled={isSubmitting} className="button-primary mt-2 w-full">
            {isRegister ? <UserPlus size={18} /> : <LogIn size={18} />}
            {isSubmitting ? "Please wait…" : isRegister ? "Create account" : "Log in"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-zinc-400">
          {isRegister ? "Already have an account?" : "New to AlgoVisual?"}{" "}
          <Link
            to={isRegister ? "/login" : "/register"}
            state={{ from: returnPath }}
            className="font-semibold text-emerald-400 hover:text-emerald-300 underline underline-offset-4"
          >
            {isRegister ? "Log in" : "Create an account"} <ArrowRight className="inline" size={14} />
          </Link>
        </p>
      </div>
    </section>
  );
};

