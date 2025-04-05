import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Users, Briefcase, Settings } from "lucide-react";

export const Sidebar = () => {
    const navItemClass =
        "flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-200 transition";

    return (
        <aside className="w-64 bg-white border-r shadow-sm min-h-screen">
            <div className="p-6 text-xl font-bold text-gray-800 border-b">
                Admin Panel
            </div>
            <nav className="p-4 flex flex-col gap-2">
                <NavLink to="/admin" className={navItemClass}>
                    <Home size={18} /> Dashboard
                </NavLink>
                <NavLink to="/admin/users" className={navItemClass}>
                    <Users size={18} /> Users
                </NavLink>
                <NavLink to="/admin/jobs" className={navItemClass}>
                    <Briefcase size={18} /> Jobs
                </NavLink>
                <NavLink to="/admin/settings" className={navItemClass}>
                    <Settings size={18} /> Settings
                </NavLink>
            </nav>
        </aside>
    );
};
