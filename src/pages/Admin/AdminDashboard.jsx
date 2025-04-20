import { useState, useEffect } from 'react';
import MyQRCodeComponent from '../../components/ui/Qrcode/MyQRCodeComponent';

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
      {/* <QrCode
        value="https://yourapp.com/user/123"
        size={200}
        level="H"
        bgColor="#ffffff"
        fgColor="#333333"
      /> */}

      <MyQRCodeComponent />
      <img src="data:image/png;base64,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" alt="" />

    </main>
  );
}
