import React, { useState } from 'react';

const ApplicationStatus = () => {
    const [filter, setFilter] = useState("All");

    const applications = [
        { company: "Google", role: "Software Engineering Intern", status: "Under Review", updated: "2 days ago", color: "blue" },
        { company: "Microsoft", role: "Data Analyst Intern", status: "Selected", updated: "1 week ago", color: "green" },
        { company: "Amazon", role: "Product Manager Intern", status: "Rejected", updated: "4 days ago", color: "red" },
        { company: "Netflix", role: "UX Designer Intern", status: "Under Review", updated: "3 days ago", color: "blue" },
        { company: "Adobe", role: "Design Intern", status: "Selected", updated: "5 days ago", color: "green" },
    ];

    const filteredApps = filter === "All"
        ? applications
        : applications.filter(app => app.status === filter);

    return (
        <div className="min-h-screen bg-gray-50 font-inter">
            <main className="max-w-6xl mx-auto px-6 py-12">
                <h2 className="text-3xl font-semibold mb-6 text-gray-800">Your Application Status</h2>

                {/* Filter Dropdown */}
                <div className="mb-6">
                    <label htmlFor="statusFilter" className="text-sm font-medium text-gray-700">Filter by Status:</label>
                    <select
                        id="statusFilter"
                        className="ml-2 border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="All">All</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Selected">Selected</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>

                {/* Application Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredApps.length > 0 ? (
                        filteredApps.map((app, index) => (
                            <div
                                key={index}
                                className={`
                  bg-white rounded-2xl border border-gray-100 p-6 shadow
                  transition-all duration-300 transform hover:scale-105 hover:shadow-xl
                  hover:border-${app.color}-400 group cursor-pointer
                `}
                            >
                                <div className="mb-6">
                                    <h3 className={`text-lg font-semibold text-gray-800 group-hover:text-${app.color}-600 transition`}>
                                        {app.company}
                                    </h3>
                                    <p className="text-sm text-gray-500">{app.role}</p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className={`px-3 py-1 text-sm rounded-full bg-${app.color}-100 text-${app.color}-700 font-medium`}>
                                        {app.status}
                                    </span>
                                    <span className="text-xs text-gray-400">Last updated: {app.updated}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 col-span-full text-center text-sm">
                            No applications found for &quot;{filter}&quot;.
                        </p>
                    )}
                </div>
            </main>            
        </div>
    );
};

export default ApplicationStatus;
