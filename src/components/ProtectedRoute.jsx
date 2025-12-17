import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) =>
  sessionStorage.getItem("isLoggedIn") === "true"
    ? children
    : <Navigate to="/login" replace />;

export default ProtectedRoute;
