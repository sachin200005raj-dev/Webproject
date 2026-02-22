import React from "react";
import { Outlet } from "react-router-dom";
import NavbarContainer from "../components/navbar/Navbarcontainer";

const Layout = () => {
  return (
    <div>
      <NavbarContainer/>
      <Outlet />
    </div>
  );
};

export default Layout;
