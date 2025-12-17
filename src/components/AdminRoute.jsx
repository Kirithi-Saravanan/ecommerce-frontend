import { Navigate } from "react-router";

const AdminRoute = ({ children }) =>
  sessionStorage.getItem("role") === "admin"
    ? children
    : <Navigate to="/" replace />;

export default AdminRoute;
