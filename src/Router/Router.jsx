import { createBrowserRouter } from "react-router-dom";
import AdminDashboard from "../Layout/AdminDashboard";
import MainLayout from "../Layout/MainLayout";
import StudentDashboard from "../Layout/StudentDashboard";
import TeacherDashboard from "../Layout/TeacherDashboard";
import AdminAllClasses from "../Pages/AdminDashboard/AdminAllClasses";
import AdminProfile from "../Pages/AdminDashboard/AdminProfile";
import TeacherRequest from "../Pages/AdminDashboard/TeacherRequest";
import Users from "../Pages/AdminDashboard/Users";
import AllClasses from "../Pages/AllClasses/AllClasses";
import ClassDetails from "../Pages/AllClasses/ClassDetails";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import PaymentFail from "../Pages/PaymentFail/PaymentFail";
import PaymentSuccessful from "../Pages/PaymentSuccessful/PaymentSuccessful";
import Register from "../Pages/Register/Register";
import MyEnrollClass from "../Pages/StudentDashboard/MyEnrollClass";
import MyEnrollClassDetails from "../Pages/StudentDashboard/MyEnrollClassDetails";
import StudentProfile from "../Pages/StudentDashboard/StudentProfile";
import AddClass from "../Pages/TeacherDashboard/AddClass";
import MyClass from "../Pages/TeacherDashboard/MyClass";
import MyClassDetails from "../Pages/TeacherDashboard/MyClassDetails";
import TeacherProfile from "../Pages/TeacherDashboard/TeacherProfile";
import UpdateClasses from "../Pages/TeacherDashboard/UpdateClasses";
import TechOnPoralekha from "../Pages/TechOnPoralekha/TechOnPoralekha";
import FeedbackView from "../Pages/AdminDashboard/FeedbackView";
import MyRequest from "../Pages/StudentDashboard/MyRequest";
import ModuleDetails from "../components/TeacherDashboard/ModuleDetails";

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
        path: "class-details/:id",
        element: <ClassDetails />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/api/class/find/${params.id}`),
      },
      {
        path: "techOnPoralekha",
        element: <TechOnPoralekha />,
      },
      {
        path: "payment/success/:tranId",
        element: <PaymentSuccessful />,
      },
      {
        path: "payment/fail/:tranId",
        element: <PaymentFail />,
      },
    ],
  },

  // admin route
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
        element: <AdminAllClasses />,
      },
      {
        path: "/admin-dashboard/profile",
        element: <AdminProfile />,
      },
      {
        path: "/admin-dashboard/class-feedback-view/:id",
        element: <FeedbackView />,
      },
    ],
  },

  // teacher route
  {
    path: "/teacher-dashboard",
    element: <TeacherDashboard />,
    children: [
      {
        path: "/teacher-dashboard/add-class",
        element: <AddClass />,
      },
      {
        path: "/teacher-dashboard/my-classes",
        element: <MyClass />,
      },
      {
        path: "/teacher-dashboard/profile",
        element: <TeacherProfile />,
      },
      {
        path: "/teacher-dashboard/update-class/:id",
        element: <UpdateClasses />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/api/class/find/${params.id}`),
      },
      {
        path: "/teacher-dashboard/my-class/:id",
        element: <MyClassDetails />,
      },
      {
        path: "/teacher-dashboard/module-details/:id",
        element: <ModuleDetails />,
      },
    ],
  },

  // student route
  {
    path: "/student-dashboard",
    element: <StudentDashboard />,
    children: [
      {
        path: "/student-dashboard/my-enroll-class",
        element: <MyEnrollClass />,
      },
      {
        path: "/student-dashboard/my-enroll-class",
        element: <MyEnrollClass />,
      },
      {
        path: "/student-dashboard/my-enroll-class/:id",
        element: <MyEnrollClassDetails />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/api/Order/single/${params.id}`),
      },
      {
        path: "/student-dashboard/profile",
        element: <StudentProfile />,
      },
      {
        path: "/student-dashboard/my-request",
        element: <MyRequest />,
      },
    ],
  },
]);

export default router;
