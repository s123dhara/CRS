import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Admin/Sidebar";

export const AdminLayout = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};
