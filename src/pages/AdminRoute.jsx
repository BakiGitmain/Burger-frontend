import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const isLoggedIn = sessionStorage.getItem("loggedIn") === "true";

  return isLoggedIn ? children : <Navigate to="/login" />;
}

export default AdminRoute;