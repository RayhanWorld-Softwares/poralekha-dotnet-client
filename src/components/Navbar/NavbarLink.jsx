import { NavLink } from "react-router-dom";
import useLoggingUser from "../../hooks/useLoggingUser";
import useAuth from "../../hooks/useAuth";

const NavbarLink = () => {
  const { loggingUser } = useLoggingUser();
  const { user } = useAuth();

  return (
    <div className="flex flex-col lg:flex-row gap-4">
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
      {loggingUser?.role === "student" && (
        <NavLink
          to="/techOnPoralekha"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-[#D1A054] underline" : ""
          }
        >
          Teach On Poralekha
        </NavLink>
      )}

      {!user && (
        <NavLink
          to="/login"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-[#D1A054] underline" : ""
          }
        >
          Login
        </NavLink>
      )}
    </div>
  );
};

export default NavbarLink;
