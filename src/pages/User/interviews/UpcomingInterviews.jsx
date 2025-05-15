import React from 'react';

const UpcomingInterviews = () => {
    const interviews = [
        {
            company: "Google",
            role: "Software Engineer Intern",
            date: "May 12, 2025",
            time: "10:00 AM",
            mode: "Online",
            color: "indigo",
        },
        {
            company: "TCS",
            role: "Business Analyst",
            date: "May 14, 2025",
            time: "2:00 PM",
            mode: "Offline",
            color: "green",
        },
        // Add more objects as needed
    ];

    return (
        <div className="bg-gradient-to-br from-violet-200 to-violet-400 min-h-screen p-6 font-sans">
            <div className="max-w-6xl mx-auto">
                {/* Page Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-extrabold text-gray-800 mb-2">📅 Upcoming Interviews</h1>
                    <p className="text-gray-600">Keep track of your scheduled placement interviews below.</p>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {interviews.map((interview, index) => (
                        <div
                            key={index}
                            className={`
                bg-white rounded-2xl shadow-lg p-6 transition-transform duration-300
                hover:-translate-y-1 border-l-4 border-${interview.color}-500
              `}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <h2 className="text-2xl font-semibold text-gray-800">{interview.company}</h2>
                                    <p className="text-gray-500">{interview.role}</p>
                                </div>
                                <span className={`bg-${interview.color}-100 text-${interview.color}-600 px-3 py-1 rounded-full text-sm`}>
                                    {interview.mode}
                                </span>
                            </div>
                            <div className="text-gray-600">
                                <p className="mb-1">📅 <span className="font-medium">{interview.date}</span></p>
                                <p>🕒 <span className="font-medium">{interview.time}</span></p>
                            </div>
                            <div className="mt-4">
                                <a
                                    href="#"
                                    className={`inline-block px-6 py-2 rounded-xl bg-${interview.color}-600 text-white font-medium hover:bg-${interview.color}-700 transition`}
                                >
                                    Join Interview
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UpcomingInterviews;
