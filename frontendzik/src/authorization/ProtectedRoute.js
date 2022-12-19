import { useAuth } from "./useAuth";
import { useLocation, Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { userData } = useAuth();
    const location = useLocation();
  
    if (!userData) {
      return <Navigate to="/login" replace state={{ from: location }} />;
    }
  
    return children;
};

export default ProtectedRoute;