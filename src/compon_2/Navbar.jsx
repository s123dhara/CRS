import { useState } from "react";


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleScroll = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };
    return (
        <nav className="bg-white shadow-md py-4">
            <div className="container mx-auto flex justify-between items-center px-6">
                <h1 className="text-2xl font-bold text-blue-600">CampusRecruit</h1>
                {/* Mobile Menu Button */}
                <button className="md:hidden text-gray-600" onClick={() => setIsOpen(!isOpen)}>
                    ☰
                </button>
                <ul className={`md:flex space-x-6 ${isOpen ? "block" : "hidden"} md:block`}>
                    <li><a href="javascript:void(0)" className="text-gray-700 hover:text-blue-600">Home</a></li>
                    <li><a href="javascript:void(0)" onClick={() => handleScroll("features")} className="text-gray-700 hover:text-blue-600">Features</a></li>
                    <li><a href="javascript:void(0)" onClick={() => handleScroll("footer")} className="text-gray-700 hover:text-blue-600">Contact</a></li>
                </ul>
                <button className="hidden md:block bg-blue-600 text-white px-4 py-2 rounded-md">
                    Sign Up
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
