import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Assumes you're using React Router

// Dummy application data (Replace with actual API response)
const dummyApplications = [
    {
        application_id: "1",
        job_title: "Frontend Developer",
        company_name: "TechCorp",
        applied_on: "2025-05-01",
        profile_id: "p1",
        first_name: "Aditi",
        last_name: "Sen",
        contact_email: "aditi.sen@example.com",
        phone: "1234567890",
        headline: "React Developer | UI/UX Enthusiast",
        city: "Bangalore",
        state: "Karnataka",
        country: "India",
    },
    {
        application_id: "2",
        job_title: "Backend Engineer",
        company_name: "CodeNest",
        applied_on: "2025-05-04",
        profile_id: "p2",
        first_name: "Ravi",
        last_name: "Mehta",
        contact_email: "ravi.mehta@example.com",
        phone: "9876543210",
        headline: "Node.js Expert | API Specialist",
        city: "Pune",
        state: "Maharashtra",
        country: "India",
    },
];

const JobApplicationsList = () => {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        // Replace with API call
        setApplications(dummyApplications);
    }, []);

    return (
        <div className="min-h-screen bg-violet-50 p-8">
            <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
                <h2 className="text-3xl font-semibold text-violet-700 p-6 border-b">
                    Job Applications
                </h2>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                        <thead className="bg-violet-100 text-violet-800 uppercase tracking-wide">
                            <tr>
                                <th className="px-6 py-3">Candidate</th>
                                <th className="px-6 py-3">Headline</th>
                                <th className="px-6 py-3">Job Title</th>
                                <th className="px-6 py-3">Company</th>
                                <th className="px-6 py-3">Location</th>
                                <th className="px-6 py-3">Contact</th>
                                <th className="px-6 py-3">Applied On</th>
                                <th className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 text-gray-700">
                            {applications.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="text-center py-10 text-gray-500">
                                        No applications found.
                                    </td>
                                </tr>
                            ) : (
                                applications.map((app) => (
                                    <tr key={app.application_id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 font-medium">
                                            {app.first_name} {app.last_name}
                                        </td>
                                        <td className="px-6 py-4">{app.headline}</td>
                                        <td className="px-6 py-4">{app.job_title}</td>
                                        <td className="px-6 py-4">{app.company_name}</td>
                                        <td className="px-6 py-4">
                                            {app.city}, {app.state}, {app.country}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm">{app.contact_email}</div>
                                            <div className="text-xs text-gray-500">{app.phone}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {new Date(app.applied_on).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link
                                                to={`/applications/${app.profile_id}`}
                                                className="text-violet-600 hover:underline text-sm font-medium"
                                            >
                                                View Details
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default JobApplicationsList;
