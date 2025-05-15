import React from "react";

const EmployeeDashboard = () => {

    const UpcomingInterviews = [
        {
            name: "Samantha Lee",
            role: "UI Designer",
            datetime: "May 7, 10:00 AM",
            status: "Scheduled",
            color: "blue",
        },
        {
            name: "David Kim",
            role: "Backend Dev",
            datetime: "May 8, 1:00 PM",
            status: "Confirmed",
            color: "green",
        },
        {
            name: "Alicia Wong",
            role: "QA Analyst",
            datetime: "May 9, 9:00 AM",
            status: "Pending",
            color: "yellow",
        },
    ];

    const DashboardCards = [
        {
            title: "Current Job Postings",
            count: 15,
            color: "violet",
            tooltip: "Current job openings you posted",
        },
        {
            title: "Applicants per Posting",
            count: 50,
            color: "indigo",
            tooltip: "Average number of applicants per job",
        },
        {
            title: "Upcoming Interviews",
            count: 10,
            color: "emerald",
            tooltip: "Scheduled interviews this week",
        },
        {
            title: "Active Recruitment Drives",
            count: 5,
            color: "pink",
            tooltip: "Ongoing campus and off-campus drives",
        },
    ];

    const JobCards = [
        {
            role: "Frontend Developer",
            date: "April 20, 2025",
            status: "Open",
            color: "green",
        },
        {
            role: "Backend Engineer",
            date: "April 15, 2025",
            status: "Reviewing",
            color: "yellow",
        },
        {
            role: "UI/UX Designer",
            date: "April 10, 2025",
            status: "Closed",
            color: "red",
        },
    ];


    return (
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800 min-h-screen font-['Inter']">
            <div className="p-6 max-w-7xl mx-auto animate-fadeIn">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-6">
                    <h1 className="text-4xl font-extrabold tracking-tight">Recruiter Dashboard</h1>
                </div>

                {/* Dashboard Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {DashboardCards.map((card, idx) => (
                        <div
                            key={idx}
                            className={`bg-gradient-to-br from-${card.color}-100 to-${card.color}-200 p-6 rounded-2xl shadow-xl card-hover relative`}
                            title={card.tooltip}
                        >
                            <h3 className="text-sm font-medium text-gray-600">{card.title}</h3>
                            <p className={`text-4xl font-extrabold text-${card.color}-700 mt-2 transition duration-300`}>
                                {card.count}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Job Posting History */}
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Job Posting History</h2>
                    <ul className="divide-y divide-gray-200">
                        {JobCards.map((job, idx) => (
                            <li key={idx} className="py-3 flex justify-between items-center hover:bg-gray-100 px-2 rounded">
                                <div>
                                    <p className="font-medium text-gray-800">{job.role}</p>
                                    <p className="text-sm text-gray-500">Posted on {job.date}</p>
                                </div>
                                <span
                                    className={`text-sm bg-${job.color}-100 text-${job.color}-700 px-2 py-1 rounded-full`}
                                >
                                    {job.status}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Upcoming Interviews */}
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow p-6 mb-10">
                    <h2 className="text-xl font-semibold mb-4">Upcoming Interviews</h2>
                    <ul className="divide-y divide-gray-200">
                        {UpcomingInterviews.map((interview, idx) => (
                            <li key={idx} className="py-3 flex justify-between items-center hover:bg-gray-100 px-2 rounded">
                                <div>
                                    <p className="font-medium text-gray-800">{interview.name}</p>
                                    <p className="text-sm text-gray-500">
                                        {interview.role} - {interview.datetime}
                                    </p>
                                </div>
                                <span
                                    className={`text-sm bg-${interview.color}-100 text-${interview.color}-800 px-3 py-1 rounded-full`}
                                >
                                    {interview.status}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard;
