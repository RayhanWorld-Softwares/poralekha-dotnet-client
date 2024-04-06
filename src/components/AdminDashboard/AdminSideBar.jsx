import { FaUsersCog } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { LuMenuSquare } from "react-icons/lu";
import { MdOutlineCastForEducation } from "react-icons/md";
import { PiUserSwitchBold } from "react-icons/pi";
import { Link } from "react-router-dom";

const AdminSideBar = () => {
  return (
    <>
      {/*  show to lg */}
      <div className="drawer drawer-start flex xl:hidden z-10 ">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content p-3">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-4"
            className="drawer-button btn btn-primary absolute"
          >
            <LuMenuSquare />
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu  w-72 min-h-full">
            {/* Sidebar content here */}
            <div className="h-screen bg-[#081B29] text-white p-8 fixed border border-red-600 ">
              <div className="flex justify-end">
                <label
                  htmlFor="my-drawer-4"
                  className="drawer-button btn btn-primary"
                >
                  X
                </label>
              </div>
              <div className="flex items-center gap-3 mb-12 shadow-xl">
                <img
                  className="w-16"
                  src="https://i.postimg.cc/1zKS45Ng/614-6141651-transparent-background-education-logo-hd-png-download-removebg-preview.png"
                  alt=""
                />
                <h2 className="text-3xl font-bold">poralekha</h2>
                {/* Page content here */}
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
          </ul>
        </div>
      </div>

      {/* show to XL */}
      <div className="h-screen hidden xl:block bg-[#081B29] text-white p-8 fixed">
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
    </>
  );
};

export default AdminSideBar;
