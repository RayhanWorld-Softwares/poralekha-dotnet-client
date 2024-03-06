import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AllClasses from "../Pages/AllClasses/AllClasses";
import TechOnPoralekha from "../Pages/TechOnPoralekha/TechOnPoralekha";
import AdminDashboard from "../Layout/AdminDashboard";
import AdminHome from "../Pages/AdminDashboard/AdminHome";
import TeacherRequest from "../Pages/AdminDashboard/TeacherRequest";
import Users from "../Pages/AdminDashboard/Users";
import AdminProfile from "../Pages/AdminDashboard/AdminProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "allClasses",
        element: <AllClasses/>
      },
      {
        path: "techOnPoralekha",
        element: <TechOnPoralekha/>
      }
    ],
  },
  {
    path: "/dashboard",
    element: <AdminDashboard/>,
    children: [
      {
        path: "/dashboard",
        element: <AdminHome/>
      },
      {
        path: "/dashboard/teacherRequest",
        element: <TeacherRequest/>
      },
      {
        path: "/dashboard/users",
        element: <Users/>
      },
      {
        path: "/dashboard/allClasses",
        element: <AllClasses/>
      },
      {
        path: "/dashboard/adminProfile",
        element: <AdminProfile/>
      },
    ]

  }
]);

export default router;
