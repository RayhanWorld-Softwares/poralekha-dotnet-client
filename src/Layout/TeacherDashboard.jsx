import { Outlet } from "react-router-dom";
import TeacherSideBar from "../components/TeacherDashboard/TeacherSideBar";

const TeacherDashboard = () => {
  return (
    <div className="flex">
      <div className="w-1/5">
        <TeacherSideBar />
      </div>

      <div className="w-4/5">
        <Outlet />
      </div>
    </div>
  );
};

export default TeacherDashboard;
