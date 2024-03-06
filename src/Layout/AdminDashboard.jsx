import { Outlet } from "react-router-dom";
import AdminSideBar from "../components/AdminDashboard/AdminSideBar";

const AdminDashboard = () => {
  return (
    <div className="flex">
      <div className="w-1/5">
        <AdminSideBar />
      </div>

      <div className="w-4/5">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
