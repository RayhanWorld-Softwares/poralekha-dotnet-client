import { PiUserSwitchBold } from "react-icons/pi";
import { FaUsersCog } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { MdOutlineCastForEducation } from "react-icons/md";
import { Link } from "react-router-dom";

const AdminSideBar = () => {
  return (
    <div>
      <div className="h-screen bg-[#081B29] text-white p-8">
        <div className="flex items-center gap-3 mb-12 shadow-xl">
          <img
            className="w-16"
            src="https://i.postimg.cc/1zKS45Ng/614-6141651-transparent-background-education-logo-hd-png-download-removebg-preview.png"
            alt=""
          />
          <h2 className="text-3xl font-bold">poralekha</h2>
        </div>

        <div className="text-base mb-5 shadow-2xl border-b border-gray-800">
          <Link to={"/admin-dashboard/teacherRequest"}>
            <h3 className="flex items-center gap-3 pb-4">
              <GiTeacher size={20} /> <span>Teacher Request</span>{" "}
            </h3>
          </Link>
        </div>

        <div className="text-base mb-5 border-b border-gray-800">
          <Link to={"/admin-dashboard/users"}>
            <h3 className="flex items-center gap-3 pb-3">
              <FaUsersCog size={20} /> <span>Users</span>{" "}
            </h3>
          </Link>
        </div>

        <div className="text-base mb-3 border-b border-gray-800">
          <Link to={"/admin-dashboard/allClasses"}>
            <h3 className="flex items-center gap-4 pb-3">
              <MdOutlineCastForEducation size={20} />
              <span>All Classes</span>{" "}
            </h3>
          </Link>
        </div>

        <div className="text-base mb-5 border-b border-gray-800">
          <Link to={"/admin-dashboard/profile"}>
            <h3 className="flex items-center gap-3 pb-3">
              <PiUserSwitchBold size={20} /> <span>Profile</span>{" "}
            </h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminSideBar;
