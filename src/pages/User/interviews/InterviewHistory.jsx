import React from 'react';

const InterviewHistory = () => {
    const interviewData = [
        {
            title: "Frontend Developer - ABC Corp",
            date: "April 15, 2025",
            datetime: "2025-04-15",
            description: "Completed a technical round focusing on React and Tailwind CSS. Received positive feedback on UI skills.",
            skills: ["React", "Tailwind CSS", "UI Design"],
        },
        {
            title: "Backend Developer - XYZ Ltd",
            date: "March 28, 2025",
            datetime: "2025-03-28",
            description: "Focused on Node.js and database queries. Interviewers appreciated problem-solving approach.",
            skills: ["Node.js", "Database Queries", "Problem Solving"],
        },
        {
            title: "UI/UX Designer - Creative Inc.",
            date: "February 10, 2025",
            datetime: "2025-02-10",
            description: "Portfolio review and discussion about UI trends. Strong emphasis on accessibility and animations.",
            skills: ["UI Design", "UX", "Accessibility"],
        },
        {
            title: "Software Engineer - DEF Tech",
            date: "May 3, 2025",
            datetime: "2025-05-03",
            description: "Interview focused on system design and problem-solving.",
            skills: ["System Design", "Problem Solving", "Algorithms"],
        },
    ];

    return (
        <div className="bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-600 min-h-screen flex items-center justify-center px-4 py-10">
            <div className="bg-white shadow-2xl rounded-2xl p-6 sm:p-10 md:p-12 max-w-6xl w-full">
                <h1 className="text-4xl font-bold text-violet-700 mb-8 text-center">Interview History</h1>

                <div className="relative border-l-4 border-violet-600 ml-4 pl-6 space-y-10">
                    {interviewData.map((interview, index) => {
                        const formattedDate = new Date(interview.datetime).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        });

                        return (
                            <article key={index} className="group relative">
                                <div className="absolute -left-7 top-5 w-4 h-4 bg-violet-600 border-2 border-white rounded-full"></div>
                                <div className="bg-violet-100 p-6 rounded-xl shadow-md hover:shadow-2xl transition-shadow duration-300">
                                    <h2 className="text-xl font-semibold text-violet-800">{interview.title}</h2>
                                    <time className="text-sm text-violet-700" dateTime={interview.datetime}>
                                        {formattedDate}
                                    </time>
                                    <p className="mt-3 text-violet-800">{interview.description}</p>
                                    <div className="mt-3">
                                        <h3 className="text-sm text-violet-600 font-semibold">Key Skills:</h3>
                                        <ul className="list-disc ml-5 text-violet-800">
                                            {interview.skills.map((skill, i) => (
                                                <li key={i}>{skill}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>

                <button className="mt-8 px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition">
                    Show More
                </button>
            </div>
        </div>
    );
};

export default InterviewHistory;
