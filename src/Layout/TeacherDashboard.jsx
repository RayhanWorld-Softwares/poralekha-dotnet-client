import { Outlet } from "react-router-dom";
import TeacherSideBar from "../components/TeacherDashboard/TeacherSideBar";

const TeacherDashboard = () => {
  return (
    <div className="flex">
      <div className="xl:w-1/5 bg-[#001E2B]">
        <TeacherSideBar />
      </div>

      <div className="w-full xl:w-4/5">
        <Outlet />
      </div>
    </div>
  );
};

export default TeacherDashboard;
