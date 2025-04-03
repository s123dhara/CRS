import React from 'react'
import Button from '../../ui/Button'

export const Navbar = () => {
    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <div className="bg-blue-600 text-white p-2 rounded-md">
                        <span className="font-bold">CRS</span>
                    </div>
                    <span className="font-semibold text-xl text-gray-800">CampusRecruit</span>
                </div>

                <div className="hidden md:flex space-x-6">
                    <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Home</a>
                    <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Jobs</a>
                    <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Companies</a>
                    <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Events</a>
                    <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">About</a>
                </div>

                <div className="flex items-center space-x-4">
                    <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">Sign In</a>
                    <Button>Get Started</Button>
                </div>
            </div>
        </nav>
    )
}
