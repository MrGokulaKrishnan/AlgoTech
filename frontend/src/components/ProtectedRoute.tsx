import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = () => {
  const { user, isReady } = useAuth();
  const location = useLocation();
  if (!isReady) return <div className="grid min-h-[55vh] place-items-center text-muted">Loading your learning space…</div>;
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  return <Outlet />;
};
