import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";

import SidebarLinkGroup from "./SidebarLinkGroup";

function Sidebar({
    sidebarOpen,
    setSidebarOpen,
    variant = 'default',
}) {
    const location = useLocation();
    const { pathname } = location;

    const trigger = useRef(null);
    const sidebar = useRef(null);

    const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
    const [sidebarExpanded, setSidebarExpanded] = useState(storedSidebarExpanded === null ? false : storedSidebarExpanded === "true");

    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!sidebar.current || !trigger.current) return;
            if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
            setSidebarOpen(false);
        };
        document.addEventListener("click", clickHandler);
        return () => document.removeEventListener("click", clickHandler);
    });

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!sidebarOpen || keyCode !== 27) return;
            setSidebarOpen(false);
        };
        document.addEventListener("keydown", keyHandler);
        return () => document.removeEventListener("keydown", keyHandler);
    });

    useEffect(() => {
        localStorage.setItem("sidebar-expanded", sidebarExpanded);
        if (sidebarExpanded) {
            document.querySelector("body").classList.add("sidebar-expanded");
        } else {
            document.querySelector("body").classList.remove("sidebar-expanded");
        }
    }, [sidebarExpanded]);

    return (
        <div className="min-w-fit">
            {/* Sidebar backdrop (mobile only) */}
            <div className={`fixed inset-0 bg-gray-900/30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} aria-hidden="true"></div>
            {/* Sidebar */}
            <div
                id="sidebar"
                ref={sidebar}
                className={`flex lg:flex! flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:w-64! shrink-0 bg-white p-4 transition-all duration-200 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-64"} ${variant === 'v2' ? 'border-r border-gray-200' : 'rounded-r-2xl shadow-xs'}`}
            >
                {/* Sidebar header */}
                <div className="flex justify-between mb-10 pr-3 sm:px-2">
                    {/* Close button */}
                    <button
                        ref={trigger}
                        className="lg:hidden text-gray-800 hover:text-gray-400"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        aria-controls="sidebar"
                        aria-expanded={sidebarOpen}
                    >
                        <span className="sr-only">Close sidebar</span>
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
                        </svg>
                    </button>
                    {/* Logo */}
                    <NavLink end to="/" className="block">
                        <svg className="fill-violet-500" xmlns="http://www.w3.org/2000/svg" width={32} height={32}>
                            <path d="M31.956 14.8C31.372 6.92 25.08.628 17.2.044V5.76a9.04 9.04 0 0 0 9.04 9.04h5.716ZM14.8 26.24v5.716C6.92 31.372.63 25.08.044 17.2H5.76a9.04 9.04 0 0 1 9.04 9.04Zm11.44-9.04h5.716c-.584 7.88-6.876 14.172-14.756 14.756V26.24a9.04 9.04 0 0 1 9.04-9.04ZM.044 14.8C.63 6.92 6.92.628 14.8.044V5.76a9.04 9.04 0 0 1-9.04 9.04H.044Z" />
                        </svg>
                    </NavLink>
                </div>

                {/* Links */}
                <div className="space-y-8">
                    {/* Pages group */}
                    <div>
                        <h3 className="text-xs uppercase text-gray-400 font-semibold pl-3">
                            <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">
                                •••
                            </span>
                            <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">Pages</span>
                        </h3>
                        <ul className="mt-3">
                            {/* Dashboard */}
                            <SidebarLinkGroup activecondition={pathname === "/" || pathname.includes("dashboard")}>
                                {(handleClick, open) => {
                                    return (
                                        <React.Fragment>
                                            <a
                                                href="#0"
                                                className={`block text-gray-800 truncate transition duration-150 ${pathname === "/employee-dashboard" || pathname.includes("employee-dashboard") ? "" : "hover:text-gray-900"
                                                    }`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleClick();
                                                    setSidebarExpanded(true);
                                                }}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <svg className={`shrink-0 fill-current ${pathname === "/employee-dashboard" || pathname.includes("dashboard") ? 'text-violet-500' : 'text-gray-400'}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                                            <path d="M5.936.278A7.983 7.983 0 0 1 8 0a8 8 0 1 1-8 8c0-.722.104-1.413.278-2.064a1 1 0 1 1 1.932.516A5.99 5.99 0 0 0 2 8a6 6 0 1 0 6-6c-.53 0-1.045.076-1.548.21A1 1 0 1 1 5.936.278Z" />
                                                            <path d="M6.068 7.482A2.003 2.003 0 0 0 8 10a2 2 0 1 0-.518-3.932L3.707 2.293a1 1 0 0 0-1.414 1.414l3.775 3.775Z" />
                                                        </svg>
                                                        <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                            Dashboard
                                                        </span>
                                                    </div>
                                                    {/* Icon */}
                                                    <div className="flex shrink-0 ml-2">
                                                        <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 ${open && "rotate-180"}`} viewBox="0 0 12 12">
                                                            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </a>
                                            <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                                                <ul className={`pl-8 mt-1 ${!open && "hidden"}`}>
                                                    <li className="mb-1 last:mb-0">
                                                        <NavLink
                                                            end
                                                            to="/employee-dashboard"
                                                            className={({ isActive }) =>
                                                                "block transition duration-150 truncate " + (isActive ? "text-violet-500" : "text-gray-500/90  hover:text-gray-700 ")
                                                            }
                                                        >
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Main
                                                            </span>
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                            </div>
                                        </React.Fragment>
                                    );
                                }}
                            </SidebarLinkGroup>

                            {/* Company Profile Management */}
                            <SidebarLinkGroup activecondition={pathname === "/comapny-profile" || pathname.includes("comapany-profile")}>
                                {(handleClick, open) => {
                                    return (
                                        <React.Fragment>
                                            <a
                                                href="#0"
                                                className={`block text-gray-800 truncate transition duration-150 ${pathname === "/employee/company-profile" || pathname.includes("comapany-profile") ? "" : "hover:text-gray-900"
                                                    }`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleClick();
                                                    setSidebarExpanded(true);
                                                }}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <svg className={`shrink-0 fill-current ${pathname === "/employee/company-profile" || pathname.includes("comapany-profile") ? 'text-violet-500' : 'text-gray-400'}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                                            <path d="M5.936.278A7.983 7.983 0 0 1 8 0a8 8 0 1 1-8 8c0-.722.104-1.413.278-2.064a1 1 0 1 1 1.932.516A5.99 5.99 0 0 0 2 8a6 6 0 1 0 6-6c-.53 0-1.045.076-1.548.21A1 1 0 1 1 5.936.278Z" />
                                                            <path d="M6.068 7.482A2.003 2.003 0 0 0 8 10a2 2 0 1 0-.518-3.932L3.707 2.293a1 1 0 0 0-1.414 1.414l3.775 3.775Z" />
                                                        </svg>
                                                        <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                            Company Profile
                                                        </span>
                                                    </div>
                                                    {/* Icon */}
                                                    <div className="flex shrink-0 ml-2">
                                                        <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 ${open && "rotate-180"}`} viewBox="0 0 12 12">
                                                            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </a>
                                            <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                                                <ul className={`pl-8 mt-1 ${!open && "hidden"}`}>
                                                    <li className="mb-1 last:mb-0">
                                                        <NavLink
                                                            end
                                                            to="/employee/company-profile"
                                                            className={({ isActive }) =>
                                                                "block transition duration-150 truncate " + (isActive ? "text-violet-500" : "text-gray-500/90  hover:text-gray-700 ")
                                                            }
                                                        >
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Profile
                                                            </span>
                                                        </NavLink>
                                                    </li>
                                                    <li className="mb-1 last:mb-0">
                                                        <NavLink
                                                            end
                                                            to="/employee/company-profile/edit"
                                                            className={({ isActive }) =>
                                                                "block transition duration-150 truncate " + (isActive ? "text-violet-500" : "text-gray-500/90  hover:text-gray-700 ")
                                                            }
                                                        >
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Change Profile
                                                            </span>
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                            </div>
                                        </React.Fragment>
                                    );
                                }}
                            </SidebarLinkGroup>

                            {/* Job Postings  */}
                            <SidebarLinkGroup activecondition={pathname === "/employee" || pathname.includes("job")}>
                                {(handleClick, open) => {
                                    return (
                                        <React.Fragment>
                                            <a
                                                href="#0"
                                                className={`block text-gray-800 truncate transition duration-150 ${pathname === "/" || pathname.includes("users") ? "" : "hover:text-gray-900"
                                                    }`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleClick();
                                                    setSidebarExpanded(true);
                                                }}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <svg className={`shrink-0 fill-current ${pathname === "/employee/jobs" || pathname.includes("job") ? 'text-violet-500' : 'text-gray-400'}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                                            <path d="M5.936.278A7.983 7.983 0 0 1 8 0a8 8 0 1 1-8 8c0-.722.104-1.413.278-2.064a1 1 0 1 1 1.932.516A5.99 5.99 0 0 0 2 8a6 6 0 1 0 6-6c-.53 0-1.045.076-1.548.21A1 1 0 1 1 5.936.278Z" />
                                                            <path d="M6.068 7.482A2.003 2.003 0 0 0 8 10a2 2 0 1 0-.518-3.932L3.707 2.293a1 1 0 0 0-1.414 1.414l3.775 3.775Z" />
                                                        </svg>
                                                        <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                            Job Postings
                                                        </span>
                                                    </div>
                                                    {/* Icon */}
                                                    <div className="flex shrink-0 ml-2">
                                                        <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 ${open && "rotate-180"}`} viewBox="0 0 12 12">
                                                            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </a>
                                            <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                                                <ul className={`pl-8 mt-1 ${!open && "hidden"}`}>
                                                    <li className="mb-1 last:mb-0">
                                                        <NavLink
                                                            end
                                                            to="/employee/job/add"
                                                            className={({ isActive }) =>
                                                                "block transition duration-150 truncate " + (isActive ? "text-violet-500" : "text-gray-500/90  hover:text-gray-700 ")
                                                            }
                                                        >
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Create Job
                                                            </span>
                                                        </NavLink>
                                                    </li>                                                    
                                                    <li className="mb-1 last:mb-0">
                                                        <NavLink
                                                            end
                                                            to="/employee/jobs"
                                                            className={({ isActive }) =>
                                                                "block transition duration-150 truncate " + (isActive ? "text-violet-500" : "text-gray-500/90  hover:text-gray-700 ")
                                                            }
                                                        >
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                List of Jobs
                                                            </span>
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                            </div>
                                        </React.Fragment>
                                    );
                                }}
                            </SidebarLinkGroup>
                            
                            {/* Assesment Management */}
                            <SidebarLinkGroup activecondition={pathname === "/" || pathname.includes("")}>
                                {(handleClick, open) => {
                                    return (
                                        <React.Fragment>
                                            <a
                                                href="#0"
                                                className={`block text-gray-800 truncate transition duration-150 ${pathname === "/" || pathname.includes("users") ? "" : "hover:text-gray-900"
                                                    }`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleClick();
                                                    setSidebarExpanded(true);
                                                }}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <svg className={`shrink-0 fill-current ${pathname === "/" || pathname.includes("applicant-form") ? 'text-violet-500' : 'text-gray-400'}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                                            <path d="M5.936.278A7.983 7.983 0 0 1 8 0a8 8 0 1 1-8 8c0-.722.104-1.413.278-2.064a1 1 0 1 1 1.932.516A5.99 5.99 0 0 0 2 8a6 6 0 1 0 6-6c-.53 0-1.045.076-1.548.21A1 1 0 1 1 5.936.278Z" />
                                                            <path d="M6.068 7.482A2.003 2.003 0 0 0 8 10a2 2 0 1 0-.518-3.932L3.707 2.293a1 1 0 0 0-1.414 1.414l3.775 3.775Z" />
                                                        </svg>
                                                        <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                            Assesment Management
                                                        </span>
                                                    </div>
                                                    {/* Icon */}
                                                    <div className="flex shrink-0 ml-2">
                                                        <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 ${open && "rotate-180"}`} viewBox="0 0 12 12">
                                                            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </a>
                                            <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                                                <ul className={`pl-8 mt-1 ${!open && "hidden"}`}>
                                                    <li className="mb-1 last:mb-0">
                                                        <NavLink
                                                            end
                                                            to="/applicant-form"
                                                            className={({ isActive }) =>
                                                                "block transition duration-150 truncate " + (isActive ? "text-violet-500" : "text-gray-500/90  hover:text-gray-700 ")
                                                            }
                                                        >
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                List of Assesment
                                                            </span>
                                                        </NavLink>
                                                    </li> 
                                                    <li className="mb-1 last:mb-0">
                                                        <NavLink
                                                            end
                                                            to="/applicant-form"
                                                            className={({ isActive }) =>
                                                                "block transition duration-150 truncate " + (isActive ? "text-violet-500" : "text-gray-500/90  hover:text-gray-700 ")
                                                            }
                                                        >
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Create Assesment
                                                            </span>
                                                        </NavLink>
                                                    </li>  
                                                    <li className="mb-1 last:mb-0">
                                                        <NavLink
                                                            end
                                                            to="/interview-history"
                                                            className={({ isActive }) =>
                                                                "block transition duration-150 truncate " + (isActive ? "text-violet-500" : "text-gray-500/90  hover:text-gray-700 ")
                                                            }
                                                        >
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Assesment Result
                                                            </span>
                                                        </NavLink>
                                                    </li>                                                                                                  
                                                </ul>
                                            </div>
                                        </React.Fragment>
                                    );
                                }}
                            </SidebarLinkGroup>

                            {/* Interview Management */}
                            <SidebarLinkGroup activecondition={pathname === "/" || pathname.includes("")}>
                                {(handleClick, open) => {
                                    return (
                                        <React.Fragment>
                                            <a
                                                href="#0"
                                                className={`block text-gray-800 truncate transition duration-150 ${pathname === "/" || pathname.includes("users") ? "" : "hover:text-gray-900"
                                                    }`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleClick();
                                                    setSidebarExpanded(true);
                                                }}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <svg className={`shrink-0 fill-current ${pathname === "/" || pathname.includes("applicant-form") ? 'text-violet-500' : 'text-gray-400'}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                                            <path d="M5.936.278A7.983 7.983 0 0 1 8 0a8 8 0 1 1-8 8c0-.722.104-1.413.278-2.064a1 1 0 1 1 1.932.516A5.99 5.99 0 0 0 2 8a6 6 0 1 0 6-6c-.53 0-1.045.076-1.548.21A1 1 0 1 1 5.936.278Z" />
                                                            <path d="M6.068 7.482A2.003 2.003 0 0 0 8 10a2 2 0 1 0-.518-3.932L3.707 2.293a1 1 0 0 0-1.414 1.414l3.775 3.775Z" />
                                                        </svg>
                                                        <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                            Interview Schedule
                                                        </span>
                                                    </div>
                                                    {/* Icon */}
                                                    <div className="flex shrink-0 ml-2">
                                                        <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 ${open && "rotate-180"}`} viewBox="0 0 12 12">
                                                            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </a>
                                            <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                                                <ul className={`pl-8 mt-1 ${!open && "hidden"}`}>
                                                    <li className="mb-1 last:mb-0">
                                                        <NavLink
                                                            end
                                                            to="/upcoming-interviews"
                                                            className={({ isActive }) =>
                                                                "block transition duration-150 truncate " + (isActive ? "text-violet-500" : "text-gray-500/90  hover:text-gray-700 ")
                                                            }
                                                        >
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Interview Management
                                                            </span>
                                                        </NavLink>
                                                    </li>                                                    
                                                    <li className="mb-1 last:mb-0">
                                                        <NavLink
                                                            end
                                                            to="/interview-history"
                                                            className={({ isActive }) =>
                                                                "block transition duration-150 truncate " + (isActive ? "text-violet-500" : "text-gray-500/90  hover:text-gray-700 ")
                                                            }
                                                        >
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                View Interviews
                                                            </span>
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                            </div>
                                        </React.Fragment>
                                    );
                                }}
                            </SidebarLinkGroup>

                              {/* Analytics and Reports */}
                            <SidebarLinkGroup activecondition={pathname === "/" || pathname.includes("")}>
                                {(handleClick, open) => {
                                    return (
                                        <React.Fragment>
                                            <a
                                                href="#0"
                                                className={`block text-gray-800 truncate transition duration-150 ${pathname === "/" || pathname.includes("users") ? "" : "hover:text-gray-900"
                                                    }`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleClick();
                                                    setSidebarExpanded(true);
                                                }}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <svg className={`shrink-0 fill-current ${pathname === "/" || pathname.includes("applicant-form") ? 'text-violet-500' : 'text-gray-400'}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                                            <path d="M5.936.278A7.983 7.983 0 0 1 8 0a8 8 0 1 1-8 8c0-.722.104-1.413.278-2.064a1 1 0 1 1 1.932.516A5.99 5.99 0 0 0 2 8a6 6 0 1 0 6-6c-.53 0-1.045.076-1.548.21A1 1 0 1 1 5.936.278Z" />
                                                            <path d="M6.068 7.482A2.003 2.003 0 0 0 8 10a2 2 0 1 0-.518-3.932L3.707 2.293a1 1 0 0 0-1.414 1.414l3.775 3.775Z" />
                                                        </svg>
                                                        <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                            Analytics Reports
                                                        </span>
                                                    </div>
                                                    {/* Icon */}
                                                    <div className="flex shrink-0 ml-2">
                                                        <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 ${open && "rotate-180"}`} viewBox="0 0 12 12">
                                                            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </a>
                                            <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                                                <ul className={`pl-8 mt-1 ${!open && "hidden"}`}>
                                                    <li className="mb-1 last:mb-0">
                                                        <NavLink
                                                            end
                                                            to="/upcoming-interviews"
                                                            className={({ isActive }) =>
                                                                "block transition duration-150 truncate " + (isActive ? "text-violet-500" : "text-gray-500/90  hover:text-gray-700 ")
                                                            }
                                                        >
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Received Applications
                                                            </span>
                                                        </NavLink>
                                                    </li>                                                    
                                                    <li className="mb-1 last:mb-0">
                                                        <NavLink
                                                            end
                                                            to="/interview-history"
                                                            className={({ isActive }) =>
                                                                "block transition duration-150 truncate " + (isActive ? "text-violet-500" : "text-gray-500/90  hover:text-gray-700 ")
                                                            }
                                                        >
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Hirings
                                                            </span>
                                                        </NavLink>
                                                    </li>
                                                    <li className="mb-1 last:mb-0">
                                                        <NavLink
                                                            end
                                                            to="/interview-history"
                                                            className={({ isActive }) =>
                                                                "block transition duration-150 truncate " + (isActive ? "text-violet-500" : "text-gray-500/90  hover:text-gray-700 ")
                                                            }
                                                        >
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                
                                                            </span>
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                            </div>
                                        </React.Fragment>
                                    );
                                }}
                            </SidebarLinkGroup>  


                        </ul>
                    </div>

                    {/* General Settings group */}
                    <div>
                        <h3 className="text-xs uppercase text-gray-400 font-semibold pl-3">
                            <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">
                                •••
                            </span>
                            <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">General Settings</span>
                        </h3>
                        <ul className="mt-3">
                            {/* settings */}
                            <SidebarLinkGroup activecondition={pathname === "/admin/settings" || pathname.includes("general-settings")}>
                                {(handleClick, open) => {
                                    return (
                                        <React.Fragment>
                                            <a
                                                href="#0"
                                                className={`block text-gray-800 truncate transition duration-150 ${pathname === "/admin/settings" || pathname.includes("general-settings") ? "" : "hover:text-gray-900"
                                                    }`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleClick();
                                                    setSidebarExpanded(true);
                                                }}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <svg className={`shrink-0 fill-current ${pathname === "/admin/settings" || pathname.includes("general-settings") ? 'text-violet-500' : 'text-gray-400'}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                                            <path d="M11.442 4.576a1 1 0 1 0-1.634-1.152L4.22 11.35 1.773 8.366A1 1 0 1 0 .227 9.634l3.281 4a1 1 0 0 0 1.59-.058l6.344-9ZM15.817 4.576a1 1 0 1 0-1.634-1.152l-5.609 7.957a1 1 0 0 0-1.347 1.453l.656.8a1 1 0 0 0 1.59-.058l6.344-9Z" />
                                                        </svg>
                                                        <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                            Authentication
                                                        </span>
                                                    </div>
                                                    {/* Icon */}
                                                    <div className="flex shrink-0 ml-2">
                                                        <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 ${open && "rotate-180"}`} viewBox="0 0 12 12">
                                                            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </a>
                                            <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                                                <ul className={`pl-8 mt-1 ${!open && "hidden"}`}>
                                                    <li className="mb-1 last:mb-0">
                                                        <NavLink
                                                            end
                                                            to="/admin/settings"
                                                            className={({ isActive }) =>
                                                                "block transition duration-150 truncate " + (isActive ? "text-violet-500" : "text-gray-500/90  hover:text-gray-700 ")
                                                            }
                                                        >
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Two Factor Auth
                                                            </span>
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                            </div>
                                        </React.Fragment>
                                    );
                                }}
                            </SidebarLinkGroup>

                            {/* Support Section */}
                            <SidebarLinkGroup activecondition={pathname === "/" || pathname.includes("")}>
                                {(handleClick, open) => {
                                    return (
                                        <React.Fragment>
                                            <a
                                                href="#0"
                                                className={`block text-gray-800 truncate transition duration-150 ${pathname === "/" || pathname.includes("users") ? "" : "hover:text-gray-900"
                                                    }`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleClick();
                                                    setSidebarExpanded(true);
                                                }}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <svg className={`shrink-0 fill-current ${pathname === "/" || pathname.includes("applicant-form") ? 'text-violet-500' : 'text-gray-400'}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                                            <path d="M5.936.278A7.983 7.983 0 0 1 8 0a8 8 0 1 1-8 8c0-.722.104-1.413.278-2.064a1 1 0 1 1 1.932.516A5.99 5.99 0 0 0 2 8a6 6 0 1 0 6-6c-.53 0-1.045.076-1.548.21A1 1 0 1 1 5.936.278Z" />
                                                            <path d="M6.068 7.482A2.003 2.003 0 0 0 8 10a2 2 0 1 0-.518-3.932L3.707 2.293a1 1 0 0 0-1.414 1.414l3.775 3.775Z" />
                                                        </svg>
                                                        <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                            Support
                                                        </span>
                                                    </div>
                                                    {/* Icon */}
                                                    <div className="flex shrink-0 ml-2">
                                                        <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 ${open && "rotate-180"}`} viewBox="0 0 12 12">
                                                            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </a>
                                            <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                                                <ul className={`pl-8 mt-1 ${!open && "hidden"}`}>                                                                                              
                                                    <li className="mb-1 last:mb-0">
                                                        <NavLink
                                                            end
                                                            to="/feedback"
                                                            className={({ isActive }) =>
                                                                "block transition duration-150 truncate " + (isActive ? "text-violet-500" : "text-gray-500/90  hover:text-gray-700 ")
                                                            }
                                                        >
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Feedback
                                                            </span>
                                                        </NavLink>
                                                    </li>
                                                    <li className="mb-1 last:mb-0">
                                                        <NavLink
                                                            end
                                                            to="/report-bugs"
                                                            className={({ isActive }) =>
                                                                "block transition duration-150 truncate " + (isActive ? "text-violet-500" : "text-gray-500/90  hover:text-gray-700 ")
                                                            }
                                                        >
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Report Issue & Bugs 
                                                            </span>
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                            </div>
                                        </React.Fragment>
                                    );
                                }}
                            </SidebarLinkGroup>
                        </ul>
                    </div>

                </div>

                {/* Expand / collapse button */}
                <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
                    <div className="w-12 pl-4 pr-3 py-2">
                        <button className="text-gray-400 hover:text-gray-500 cursor-pointer" onClick={() => setSidebarExpanded(!sidebarExpanded)}>
                            <span className="sr-only">Expand / collapse sidebar</span>
                            <svg className="shrink-0 fill-current text-gray-400 sidebar-expanded:rotate-180" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                <path d="M15 16a1 1 0 0 1-1-1V1a1 1 0 1 1 2 0v14a1 1 0 0 1-1 1ZM8.586 7H1a1 1 0 1 0 0 2h7.586l-2.793 2.793a1 1 0 1 0 1.414 1.414l4.5-4.5A.997.997 0 0 0 12 8.01M11.924 7.617a.997.997 0 0 0-.217-.324l-4.5-4.5a1 1 0 0 0-1.414 1.414L8.586 7M12 7.99a.996.996 0 0 0-.076-.373Z" />
                            </svg>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Sidebar;
