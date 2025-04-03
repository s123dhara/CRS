import React from 'react'

export const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">CampusRecruit</h3>
                        <p className="text-gray-300">Connecting talented students with leading employers for career opportunities and growth.</p>
                    </div>

                    <div>
                        <h4 className="text-md font-semibold mb-4">For Students</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-300 hover:text-white">Browse Jobs</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white">Upcoming Events</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white">Company Profiles</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white">Career Resources</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-md font-semibold mb-4">For Employers</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-300 hover:text-white">Post Jobs</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white">Schedule Events</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white">Talent Search</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white">University Partnerships</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-md font-semibold mb-4">Connect</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-300 hover:text-white">Contact Us</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white">Support</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} CampusRecruit. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}