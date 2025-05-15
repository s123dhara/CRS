import React, { useState } from "react";
import { Briefcase, Building2, MapPin, Clock, ExternalLink } from "lucide-react";

// Enhanced job data with more professional details
const onCampusJobs = [
    {
        id: 1,
        title: "Software Developer Intern",
        company: "Tech Inc.",
        location: "Building A, Room 204",
        type: "Part-time",
        posted: "2 days ago",
        description: "Join our team to develop cutting-edge web applications using React and Node.js.",
        requirements: ["JavaScript/React", "Node.js", "Git", "CS Fundamentals"]
    },
    {
        id: 2,
        title: "Data Scientist Intern",
        company: "DataCorp",
        location: "Science Building, Wing B",
        type: "Part-time",
        posted: "1 week ago",
        description: "Work with our data team to analyze and visualize complex datasets.",
        requirements: ["Python", "SQL", "Statistics", "Data Visualization"]
    },
    {
        id: 3,
        title: "Research Assistant",
        company: "University Research Lab",
        location: "Engineering Building, Lab 305",
        type: "Part-time",
        posted: "3 days ago",
        description: "Support research initiatives in machine learning applications.",
        requirements: ["ML Basics", "Python", "Research Methodology"]
    }
];

const offCampusJobs = [
    {
        id: 1,
        title: "Frontend Developer",
        company: "WebDev Co.",
        location: "Downtown (Remote Possible)",
        type: "Full-time",
        posted: "1 day ago",
        description: "Create responsive web interfaces for our enterprise clients.",
        requirements: ["React", "TypeScript", "SCSS", "UI/UX Experience"]
    },
    {
        id: 2,
        title: "Backend Developer",
        company: "Backend Solutions",
        location: "Tech Park (Hybrid)",
        type: "Full-time",
        posted: "3 days ago",
        description: "Build scalable APIs and microservices for our cloud platform.",
        requirements: ["Java/Spring", "AWS", "MongoDB", "Microservices"]
    },
    {
        id: 3,
        title: "Full Stack Engineer",
        company: "InnoTech",
        location: "Innovation District",
        type: "Full-time",
        posted: "Just today",
        description: "Develop end-to-end solutions for our healthcare clients.",
        requirements: ["JavaScript", "Python", "SQL", "REST APIs"]
    }
];

// Enhanced JobCard component with more details and styling
const JobCard = ({ job }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 border border-gray-100">
            <div className="flex justify-between items-start">
                <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {job.type}
                </span>
            </div>

            <div className="mt-2 flex items-center text-gray-700">
                <Building2 size={16} className="mr-1 text-gray-500" />
                <span className="font-medium">{job.company}</span>
            </div>

            <div className="mt-2 flex items-center text-gray-600">
                <MapPin size={16} className="mr-1 text-gray-500" />
                <span>{job.location}</span>
            </div>

            <div className="mt-2 flex items-center text-gray-600">
                <Clock size={16} className="mr-1 text-gray-500" />
                <span>Posted {job.posted}</span>
            </div>

            <div className="mt-4">
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm focus:outline-none"
                >
                    {expanded ? "Show less" : "Show more"}
                </button>
            </div>

            {expanded && (
                <div className="mt-4 border-t border-gray-100 pt-4">
                    <p className="text-gray-700 mb-3">{job.description}</p>

                    <h4 className="font-medium text-gray-800 mb-2">Requirements:</h4>
                    <ul className="list-disc pl-5 text-gray-700">
                        {job.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                        ))}
                    </ul>

                    <button className="mt-4 inline-flex items-center text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-4 py-2">
                        Apply Now
                        <ExternalLink size={16} className="ml-1" />
                    </button>
                </div>
            )}
        </div>
    );
};

// Professional Filter Component
const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
    return (
        <div className="flex border border-gray-200 rounded-lg overflow-hidden mb-8 shadow-sm">
            <button
                className={`flex-1 py-3 px-6 text-center font-medium transition ${selectedCategory === 'onCampus'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                onClick={() => onCategoryChange('onCampus')}
            >
                <span className="flex items-center justify-center">
                    <Briefcase size={18} className="mr-2" />
                    On-Campus Opportunities
                </span>
            </button>

            <button
                className={`flex-1 py-3 px-6 text-center font-medium transition ${selectedCategory === 'offCampus'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                onClick={() => onCategoryChange('offCampus')}
            >
                <span className="flex items-center justify-center">
                    <Building2 size={18} className="mr-2" />
                    Off-Campus Positions
                </span>
            </button>
        </div>
    );
};

// Main component with count and empty state handling
const JobCards = () => {
    const [selectedCategory, setSelectedCategory] = useState('onCampus');

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const jobsToDisplay = selectedCategory === 'onCampus' ? onCampusJobs : offCampusJobs;

    return (
        <div className="container mx-auto p-4 max-w-6xl">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Career Opportunities</h1>
            <p className="text-gray-600 mb-6">Find your next professional opportunity on or off campus</p>

            <CategoryFilter
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
            />

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                    {selectedCategory === 'onCampus' ? 'On-Campus Opportunities' : 'Off-Campus Positions'}
                </h2>
                <span className="bg-gray-100 text-gray-700 py-1 px-3 rounded-full text-sm">
                    {jobsToDisplay.length} positions
                </span>
            </div>

            {jobsToDisplay.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jobsToDisplay.map((job) => (
                        <JobCard key={job.id} job={job} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 bg-gray-50 rounded-lg">
                    <Briefcase size={48} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-medium text-gray-700">No positions available</h3>
                    <p className="text-gray-500 mt-2">
                        Check back later for new opportunities
                    </p>
                </div>
            )}
        </div>
    );
};

export default JobCards;