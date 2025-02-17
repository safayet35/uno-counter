import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
const AppLayout = () => {
  return (
    <div className="relative">
    <Navbar/>
      <Outlet />
    </div>
  );
};

export default AppLayout;
