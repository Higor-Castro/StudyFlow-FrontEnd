import { Navigate } from "react-router-dom";
import { isAuthenticated, removeToken } from "../utils/auth";

function PrivateRoute({ children }) {
  if (!isAuthenticated()) {
    removeToken()
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default PrivateRoute;