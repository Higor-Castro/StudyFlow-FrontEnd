import { Navigate, useLocation } from "react-router-dom";
import { getToken, removeToken } from "../utils/auth";
import useApi from "../hooks/useApi";
import { useEffect } from "react";

function PrivateRoute({ children }) {
  const location = useLocation();
  const { request } = useApi();
  const token = getToken();

  useEffect(() => {
    if (token) {
      request("/users/validar").catch(() => {});
    }
  }, [location.pathname]);

  if (!token) {
    removeToken();
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default PrivateRoute;
