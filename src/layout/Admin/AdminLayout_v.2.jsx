import React, { useState } from 'react';
import { Outlet } from "react-router-dom";

import Sidebar from '../../components/Admin/Partials/Sidebar';
import Header from '../../components/Admin/Partials/Header';

export const AdminLayout = () => {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden">

            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

                {/*  Site header */}
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                <main className="grow">
                    <Outlet />
                </main>

                {/* <Banner /> */}

            </div>
        </div>
    );
}
