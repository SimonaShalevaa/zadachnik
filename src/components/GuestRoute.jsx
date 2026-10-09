import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { UserContext } from "../contexts/UserContext";

function GuestRoute() {
  const { user, isLoading } = useContext(UserContext);
  const location = useLocation();

  if (isLoading) {
    return <p className="loading">Зареждане…</p>;
  }

  if (user) {
    const goTo = location.state?.from || "/";
    return <Navigate to={goTo} replace />;
  }

  return <Outlet />;
}

export default GuestRoute;
