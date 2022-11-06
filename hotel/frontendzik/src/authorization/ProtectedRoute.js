import { useAuth } from "./useAuth";
import { useLocation, Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { token } = useAuth();
    const location = useLocation();
  
    if (!token) {
      return <Navigate to="/login" replace state={{ from: location }} />;
    }
  
    return children;
};

export default ProtectedRoute;