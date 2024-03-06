import { NavLink } from "react-router-dom";

const NavbarLink = () => {
  return (
    <div className="flex gap-4">
      <NavLink
        to="/"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "text-[#D1A054] underline" : ""
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/allClasses"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "text-[#D1A054] underline" : ""
        }
      >
        All Classes
      </NavLink>
      <NavLink
        to="/techOnPoralekha"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "text-[#D1A054] underline" : ""
        }
      >
        Teach On Poralekha
      </NavLink>
      <NavLink
        to="/login"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "text-[#D1A054] underline" : ""
        }
      >
        Login
      </NavLink>
    </div>
  );
};

export default NavbarLink;
