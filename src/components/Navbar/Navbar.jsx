import { useState } from "react";
import { Link } from "react-router-dom";
import DropDown from "./DropDown";
import NavbarLink from "./NavbarLink";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="navbar bg-base-100 shadow-lg">
        <div className="navbar-start">
          <div className="dropdown">
            <label
              onClick={() => setIsOpen(!isOpen)}
              tabIndex={0}
              className="btn btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            {isOpen && (
              <>
                {" "}
                <ul
                  tabIndex={0}
                  className="menu absolute md:h-[200px] menu-sm dropdown-content mt-3 z-[10] p-6 shadow bg-base-100 rounded-box  w-[200px] "
                >
                  {/* all nav links */}
                  <NavbarLink />
                </ul>
              </>
            )}
          </div>
          <Link to="/" className="btn btn-ghost text-xl">
            <img
              className="w-12"
              src="https://i.postimg.cc/1zKS45Ng/614-6141651-transparent-background-education-logo-hd-png-download-removebg-preview.png"
              alt=""
            />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <NavbarLink />
          </ul>
        </div>
        <div className="navbar-end ">
          {/* user profile */}
          <DropDown />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
