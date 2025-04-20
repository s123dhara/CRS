import React from "react";

import SystemConfig from '../../../config/config';
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-toastify";
import { replace, useNavigate } from "react-router-dom";



export const Sidebar = () => {
    const { BACKEND_URI } = SystemConfig();
    const { user, logOut } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // await axios.post(`${BACKEND_URI}auth/admin/logout`, { withCredentials: true });
            const result = await logOut();
            console.log(result);
            if (result.status) {
                toast.success(result.message);
                navigate('/login', replace);
            }
         
            // window.location.href = "/login"; // Redirect to login
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };


    return (
        <aside className="w-64 bg-white shadow-md p-4 flex flex-col">
            <h1 className="text-2xl font-bold text-gray-700 mb-4">CRMS</h1>
            <div className="flex items-center gap-2 mb-6">
                <span className="text-sm bg-green-100 text-green-600 px-2 py-1 rounded-full">Online</span>
                <button className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center">⚙️</button>
            </div>
            <nav className="flex-1">
                <ul className="space-y-2 text-gray-700">
                    <li className="hover:bg-gray-200 p-2 rounded cursor-pointer"><a href="/admin-dashboard">Dashboard</a></li>
                    <li className="hover:bg-gray-200 p-2 rounded cursor-pointer">Fill Education Form</li>
                    <li className="hover:bg-gray-200 p-2 rounded cursor-pointer">View Vacancy</li>
                    <li className="hover:bg-gray-200 p-2 rounded cursor-pointer">History of Applied Job</li>
                    <li className="hover:bg-gray-200 p-2 rounded cursor-pointer">Reports</li>
                    <li className="hover:bg-gray-200 p-2 rounded cursor-pointer">Search Job</li>
                    <li className="hover:bg-gray-200 p-2 rounded cursor-pointer">
                        <a href="/admin/settings">Settings</a>
                    </li>
                </ul>
            </nav>

            <button
                onClick={handleLogout}
                className="mt-4 text-sm text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full transition duration-200 shadow-md inline-flex items-center justify-center cursor-pointer"
            >
                ← Logout
            </button>
            <a
                href="/login"
                className="mt-4 text-sm text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full transition duration-200 shadow-md inline-flex items-center justify-center"
            >
                ← login
            </a>

            <a href="/" className="mt-4 text-sm text-gray-600">← Back to home page</a>
        </aside>
    );
};
