import { Navigate } from "react-router-dom";
import { useAuth } from "./authcontext.js";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
