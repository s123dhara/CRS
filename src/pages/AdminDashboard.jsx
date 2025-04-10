// import React from "react";

// const AdminDashboard = () => {
//   return (
//     <div className="space-y-4">
//       <h1 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h1>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div className="bg-white p-6 rounded-xl shadow-sm border">
//           <p className="text-gray-500">Total Users</p>
//           <h2 className="text-2xl font-bold">120</h2>
//         </div>
//         <div className="bg-white p-6 rounded-xl shadow-sm border">
//           <p className="text-gray-500">Active Jobs</p>
//           <h2 className="text-2xl font-bold">58</h2>
//         </div>
//         <div className="bg-white p-6 rounded-xl shadow-sm border">
//           <p className="text-gray-500">Applications</p>
//           <h2 className="text-2xl font-bold">348</h2>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

import React from 'react';

export default function AdminDashboard() {
  return (
    <main className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      <div className="bg-blue-500 text-white p-4 rounded shadow flex flex-col justify-center items-center">
        <div className="text-sm">Today's Applied Jobs</div>
        <div className="text-3xl font-bold">0</div>
      </div>
      <div className="bg-white p-4 rounded shadow flex flex-col justify-center items-center">
        <div className="text-sm text-gray-500">Yesterday Applied Jobs</div>
        <div className="text-3xl text-green-600 font-bold">0</div>
      </div>
      <div className="bg-gray-100 p-4 rounded shadow flex flex-col justify-center items-center">
        <div className="text-sm text-gray-500">Last 7 Days Applied Jobs</div>
        <div className="text-3xl text-blue-400 font-bold">0</div>
      </div>
      <div className="bg-white p-4 rounded shadow flex flex-col justify-center items-center">
        <div className="text-sm text-gray-500">Total Applied Jobs</div>
        <div className="text-3xl text-yellow-500 font-bold">0</div>
      </div>
      <div className="bg-gray-100 p-4 rounded shadow flex flex-col justify-center items-center">
        <div className="text-sm text-gray-500">Total Vacancy</div>
        <div className="text-3xl text-gray-700 font-bold">11</div>
      </div>
    </main>

  );
}

