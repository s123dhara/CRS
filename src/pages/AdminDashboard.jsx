import React from "react";

const AdminDashboard = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-gray-500">Total Users</p>
          <h2 className="text-2xl font-bold">120</h2>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-gray-500">Active Jobs</p>
          <h2 className="text-2xl font-bold">58</h2>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-gray-500">Applications</p>
          <h2 className="text-2xl font-bold">348</h2>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
