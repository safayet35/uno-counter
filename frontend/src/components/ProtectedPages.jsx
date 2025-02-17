import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkAuth } from "../api/checkauth.js";
import { useAuth } from "../context/AuthContext.jsx";
const ProtectedPage = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const { token } = useAuth();
  
  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);

  if (isLoggedIn === null) {
    return <div>Loading...</div>; // Show a loading state
  }

  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default ProtectedPage;
