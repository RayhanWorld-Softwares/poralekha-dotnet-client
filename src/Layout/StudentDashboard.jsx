import { Outlet } from "react-router-dom";
import StudentSiteBar from "../components/StudentDashboard/StudentSiteBar";

const StudentDashboard = () => {
  return (
    <div className="flex">
      <div className="w-1/5">
        <StudentSiteBar />
      </div>

      <div className="w-4/5">
        <Outlet />
      </div>
    </div>
  );
};

export default StudentDashboard;
