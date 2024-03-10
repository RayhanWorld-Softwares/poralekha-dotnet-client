import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useLoggingUser from "../../hooks/useLoggingUser";
import { Link } from "react-router-dom";

const DropDown = () => {
  const [isShow, setIsShow] = useState(false);
  const { user, logOut } = useAuth();
  const { loggingUser } = useLoggingUser();

  return (
    <>
      <div className="dropdown dropdown-end">
        <label
          onClick={() => setIsShow(!isShow)}
          className="btn btn-ghost btn-circle avatar "
        >
          <div className="w-10 rounded-full ">
            {user ? (
              <img alt="user profile" src={user?.photoURL} />
            ) : (
              <img
                alt="user profile"
                src="https://i.postimg.cc/7PS6bh1w/profile.png"
              />
            )}
          </div>
        </label>
      </div>
      {isShow && user ? (
        <ul className="menu  absolute menu-sm dropdown-content  mt-48 z-[10] p-2 shadow bg-base-100 rounded-box w-52 py-5">
          <h3 className="ml-3">{user?.displayName}</h3>
          {loggingUser?.role === "student" && (
            <li>
              <Link to={"/student-dashboard"}>
                <h3 className="justify-between">Dashboard</h3>
              </Link>
            </li>
          )}
          {loggingUser?.role === "teacher" && (
            <li>
              <Link to={"/teacher-dashboard"}>
                <h3 className="justify-between">Dashboard</h3>
              </Link>
            </li>
          )}
          {loggingUser?.role === "admin" && (
            <li>
              <Link to={"/admin-dashboard"}>
                <h3 className="justify-between">Dashboard</h3>
              </Link>
            </li>
          )}

          <li>
            <p onClick={logOut}>logout</p>
          </li>
        </ul>
      ) : (
        ""
      )}
    </>
  );
};

export default DropDown;
