import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { UserContext } from "../contexts/UserContext";

function PrivateRoute() {
  const { user, isLoading } = useContext(UserContext);
  const location = useLocation();

  if (isLoading) {
    return <p className="loading">Зареждане…</p>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <Outlet />;
}

export default PrivateRoute;
