import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../../components/Admin/Common/Sidebar";
import { Header } from '../../components/Admin/Common/Header'


export const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};
