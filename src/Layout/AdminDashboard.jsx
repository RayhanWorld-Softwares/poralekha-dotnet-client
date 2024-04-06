import { Outlet } from "react-router-dom";
import AdminSideBar from "../components/AdminDashboard/AdminSideBar";

const AdminDashboard = () => {
  return (
    <div className="flex">
      <div className="xl:w-1/5 bg-[#001E2B]">
        <AdminSideBar />
      </div>

      <div className="w-full xl:w-4/5">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
