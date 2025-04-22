"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../../context/AuthContext"

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { loggedUser } = useAuth();

    const handleScroll = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
        setIsOpen(false) // Close menu after clicking a link
    }

    return (
        <nav className="bg-white shadow-md py-4 relative z-10">
            <div className="container mx-auto flex justify-between items-center px-6">
                <h1 className="text-2xl font-bold text-blue-600">CampusRecruit</h1>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-gray-600 z-20" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
                    {isOpen ? "✕" : "☰"}
                </button>

                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-6">
                    <li>
                        <a href="javascript:void(0)" className="text-gray-700 hover:text-blue-600">
                            Home
                        </a>
                    </li>
                    <li>
                        <a
                            href="javascript:void(0)"
                            onClick={() => handleScroll("features")}
                            className="text-gray-700 hover:text-blue-600"
                        >
                            Features
                        </a>
                    </li>
                    <li>
                        <a
                            href="javascript:void(0)"
                            onClick={() => handleScroll("footer")}
                            className="text-gray-700 hover:text-blue-600"
                        >
                            Contact
                        </a>
                    </li>
                </ul>

                {/* Mobile Menu - Slide from left */}
                <div
                    className={`fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                    onClick={() => setIsOpen(false)}
                ></div>

                <div
                    className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-20 transform transition-transform duration-300 ease-in-out md:hidden ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
                >
                    <div className="p-6">
                        <h2 className="text-xl font-bold text-blue-600 mb-6">CampusRecruit</h2>
                        <ul className="space-y-4">
                            <li>
                                <a
                                    href="javascript:void(0)"
                                    className="block text-gray-700 hover:text-blue-600 py-2"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="javascript:void(0)"
                                    className="block text-gray-700 hover:text-blue-600 py-2"
                                    onClick={() => handleScroll("features")}
                                >
                                    Features
                                </a>
                            </li>
                            <li>
                                <a
                                    href="javascript:void(0)"
                                    className="block text-gray-700 hover:text-blue-600 py-2"
                                    onClick={() => handleScroll("footer")}
                                >
                                    Contact
                                </a>
                            </li>
                            <li className="pt-4">
                                <a
                                    href="javascript:void(0)"
                                    className="block w-full bg-blue-600 text-white px-4 py-2 rounded-md text-center"
                                >
                                    Employee Login
                                </a>
                                {/* <Link to="/admin" className="block w-full bg-blue-600 text-white px-4 py-2 rounded-md text-center cursor-pointer">
                                    Employee Login
                                </Link> */}
                            </li>
                            <li className="pt-2">
                                <a
                                    href="javascript:void(0)"
                                    className="block w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-center cursor-pointer"
                                >
                                    Candidate Login
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="hidden md:flex space-x-3">
                    {loggedUser ? (
                        <a href="/admin-dashboard" className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer">
                            Go to Dashboard
                        </a>
                    ) : (
                        <>
                            <a href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer">
                                Employee Login
                            </a>
                            <a href="/login" className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md cursor-pointer">
                                Candidate Login
                            </a>
                        </>
                    )}


                </div>
            </div>
        </nav>
    )
}

export default Navbar

