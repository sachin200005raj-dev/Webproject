import { createBrowserRouter } from "react-router-dom";
import UserAccount from "../components/user/UserAccount";

import Layout from "../pages/Layout";
import Home from "../pages/Home";
import Login from "../auth/Login";
import Register from "../auth/Register";
import PageNotFound from "../pages/PageNotFound";
import ForgetPassword from "../auth/ForgetPassword";
import UserLayout from "../components/user/UserLayout";

import UpdatePassword from "../components/user/UpdatePassword";
import UpdatePicture from "../components/user/UpdatePicture";
import UpdateProfile from "../components/user/UpdateProfile";
import AdminLayout from "../components/admin/AdminLayout";
import AdminDashboard from "../components/admin/AdminDashboard";
import AddAlbum from "../components/admin/AddAlbum";
import AdminSidebar from "../components/admin/AdminSidebar";
import Delete from "../components/user/Delete";
import DashBoard from "../home/DashBoard";
import Sidebar from "../home/Siderbar";
import AlbumDetails from "../home/AlbumDetails";
import PublicRoutes from "./PublicRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import AdminRoutes from "./AdminRoutes";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {
            index: true,
            element: <DashBoard />,
          },
          {
            path: "side-bar",
            element: <Sidebar />,
          },
          {
            path: "album-detail",
            element: <AlbumDetails />,
          },
        ],
      },
      {
        path: "auth/login",
        element: (
          <PublicRoutes>
            <Login />
          </PublicRoutes>
        ),
      },
      {
        path: "auth/register",
        element: (
          <PublicRoutes>
            <Register />
          </PublicRoutes>
        ),
      },
      {
        path: "auth/forget-password",
        element: (
          <PublicRoutes>
            <ForgetPassword />
          </PublicRoutes>
        ),
      },
      {
        path: "admin",
        element: (
          <ProtectedRoutes>
            <AdminRoutes>
              <AdminLayout />
            </AdminRoutes>
          </ProtectedRoutes>
        ),
        children: [
          {
            index: true,
            element: (
              <ProtectedRoutes>
                <AdminRoutes>
                  <AdminDashboard />
                </AdminRoutes>
              </ProtectedRoutes>
            ),
          },
          {
            path: "add-album",
            element: (
              <ProtectedRoutes>
                <AdminRoutes>
                  <AddAlbum />
                </AdminRoutes>
              </ProtectedRoutes>
            ),
          },
          {
            path: "admin-sidebar",
            element: (
              <ProtectedRoutes>
                <AdminRoutes>
                  <AdminSidebar />
                </AdminRoutes>
              </ProtectedRoutes>
            ),
          },
        ],
      },

      {
        path: "user-profile",
        element: (
          <ProtectedRoutes>
            <UserLayout />,
          </ProtectedRoutes>
        ),
        children: [
          {
            index: true,
            element: (
              <ProtectedRoutes>
                {" "}
                <UserAccount />{" "}
              </ProtectedRoutes>
            ),
          },
          {
            path: "update-password",
            element: (
              <ProtectedRoutes>
                {" "}
                <UpdatePassword />{" "}
              </ProtectedRoutes>
            ),
          },
          {
            path: "update-picture",
            element: (
              <ProtectedRoutes>
                {" "}
                <UpdatePicture />{" "}
              </ProtectedRoutes>
            ),
          },
          {
            path: "update-profile",
            element: (
              <ProtectedRoutes>
                {" "}
                <UpdateProfile />{" "}
              </ProtectedRoutes>
            ),
          },
          {
            path: "Delete-user",
            element: (
              <ProtectedRoutes>
                {" "}
                <Delete />{" "}
              </ProtectedRoutes>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default routes;
