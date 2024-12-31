import React from "react";
import { Outlet } from "react-router-dom";
import LeftSidebarNavigation from "./LeftSidebarNavigation";

const Layout = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <LeftSidebarNavigation />

      {/* Main Content */}
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
