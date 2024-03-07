import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AllClasses from "../Pages/AllClasses/AllClasses";
import TechOnPoralekha from "../Pages/TechOnPoralekha/TechOnPoralekha";
import AdminDashboard from "../Layout/AdminDashboard";
import TeacherRequest from "../Pages/AdminDashboard/TeacherRequest";
import Users from "../Pages/AdminDashboard/Users";
import AdminProfile from "../Pages/AdminDashboard/AdminProfile";
import TeacherDashboard from "../Layout/TeacherDashboard";
import AddClass from "../Pages/TeacherDashboard/AddClass";
import MyClass from "../Pages/TeacherDashboard/MyClass";
import TeacherProfile from "../Pages/TeacherDashboard/TeacherProfile";

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
        element: <AllClasses />,
      },
      {
        path: "techOnPoralekha",
        element: <TechOnPoralekha />,
      },
    ],
  },
  {
    path: "/admin-dashboard",
    element: <AdminDashboard />,
    children: [
      {
        path: "/admin-dashboard/teacherRequest",
        element: <TeacherRequest />,
      },
      {
        path: "/admin-dashboard/users",
        element: <Users />,
      },
      {
        path: "/admin-dashboard/allClasses",
        element: <AllClasses />,
      },
      {
        path: "/admin-dashboard/profile",
        element: <AdminProfile />,
      },
    ],
  },
  {
    path: "/teacher-dashboard",
    element: <TeacherDashboard />,
    children: [
      {
        path: "/teacher-dashboard/add-class",
        element: <AddClass />,
      },
      {
        path: "/teacher-dashboard/my-class",
        element: <MyClass />,
      },
      {
        path: "/teacher-dashboard/profile",
        element: <TeacherProfile />,
      },
    ],
  },
]);

export default router;
