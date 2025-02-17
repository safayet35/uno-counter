import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
const Logout = () => {
  const { logoutUser } = useAuth();
  useEffect(() => {
    logoutUser();
  }, [logoutUser]);

  return <Navigate to="/login" />;
};

export default Logout;
