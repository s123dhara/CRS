import { useEffect, useState } from 'react';
import { Search, Filter, MapPin, Clock, Briefcase, ChevronRight, Star, StarOff, X, Sliders, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import BACKEND_API from '../../../services/JobApi';
import { toast } from 'react-toastify';

export default function JobCards() {
    const navigate = useNavigate();
    const { loggedUser } = useAuth();

    const [jobs, setJobs] = useState([]);
    const [savedJobs, setSavedJobs] = useState({
        1: false,
        2: true,
        3: false,
        4: false,
    });
    const [showApplyJobModal, setShowApplyJobModal] = useState(false);
    const [applyJob, setApplyJob] = useState({});
    const [showFilters, setShowFilters] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        jobType: [],
        location: [],
        salary: '',
        experience: [],
        remote: false,
    });


    const toggleSaved = (id) => {
        setSavedJobs(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const toggleFilter = (category, value) => {
        setFilters(prev => {
            if (category === 'salary') {
                return { ...prev, salary: value };
            }

            if (category === 'remote') {
                return { ...prev, remote: !prev.remote };
            }

            const updatedCategory = prev[category].includes(value)
                ? prev[category].filter(item => item !== value)
                : [...prev[category], value];

            return { ...prev, [category]: updatedCategory };
        });
    };

    const clearFilters = () => {
        setFilters({
            jobType: [],
            location: [],
            salary: '',
            experience: [],
            remote: false,
        });
    };

    const handleApplyJobSubmit = async (job) => {
        try {
            const { status, message } = await BACKEND_API.applyJob(job, loggedUser);

            if (status) {
                setShowApplyJobModal(true);
                toast.success(message || "Successfully applied for the job");
            } else {
                toast.info(message || "Failed to apply for the job");
            }
        } catch (error) {
            console.error("Apply Job Error:", error);
            toast.error("Something went wrong while applying for the job");
        }
    };



    // const jobs = [
    //     {
    //         id: 1,
    //         title: "Senior Frontend Developer",
    //         company: "TechFlow Solutions",
    //         location: "San Francisco, CA",
    //         type: "Full-time",
    //         posted: "2 days ago",
    //         salary: "$120k - $150k",
    //         logo: "T",
    //         experience: "Senior Level",
    //         skills: ["React", "TypeScript", "CSS"]
    //     },
    //     {
    //         id: 2,
    //         title: "UX/UI Designer",
    //         company: "Creative Minds",
    //         location: "Remote",
    //         type: "Contract",
    //         posted: "5 hours ago",
    //         salary: "$80k - $100k",
    //         logo: "C",
    //         experience: "Mid Level",
    //         skills: ["Figma", "Adobe XD", "User Research"]
    //     },
    //     {
    //         id: 3,
    //         title: "Backend Engineer",
    //         company: "DataDrive Inc.",
    //         location: "New York, NY",
    //         type: "Full-time",
    //         posted: "1 week ago",
    //         salary: "$130k - $160k",
    //         logo: "D",
    //         experience: "Senior Level",
    //         skills: ["Python", "Node.js", "AWS"]
    //     },
    //     {
    //         id: 4,
    //         title: "Product Manager",
    //         company: "InnoVision",
    //         location: "Austin, TX",
    //         type: "Full-time",
    //         posted: "3 days ago",
    //         salary: "$110k - $140k",
    //         logo: "I",
    //         experience: "Mid Level",
    //         skills: ["Agile", "User Stories", "Roadmapping"]
    //     },
    //     {
    //         id: 5,
    //         title: "Data Scientist",
    //         company: "AnalyticsPro",
    //         location: "Boston, MA",
    //         type: "Full-time",
    //         posted: "1 day ago",
    //         salary: "$130k - $150k",
    //         logo: "A",
    //         experience: "Senior Level",
    //         skills: ["Python", "Machine Learning", "SQL"]
    //     },
    //     {
    //         id: 6,
    //         title: "Marketing Coordinator",
    //         company: "BrandBoost",
    //         location: "Remote",
    //         type: "Part-time",
    //         posted: "4 days ago",
    //         salary: "$50k - $65k",
    //         logo: "B",
    //         experience: "Entry Level",
    //         skills: ["Social Media", "Content Creation", "Analytics"]
    //     }
    // ];

    const fetchAllJobs = async () => {
        const { status, message, jobs } = await BACKEND_API.allJobs();
        if (status) {
            setJobs(jobs);
        } else {
            toast.error("Failed to fetch the jobs");
        }
    };

    useEffect(() => {
        fetchAllJobs();
    }, []);

    // Apply filters and search
    const filteredJobs = jobs.filter(job => {
        // Search filter
        if (searchTerm &&
            !job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            !job.company.toLowerCase().includes(searchTerm.toLowerCase()) &&
            !job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))) {
            return false;
        }

        // Job type filter
        if (filters.jobType.length > 0 && !filters.jobType.includes(job.type)) {
            return false;
        }

        // Location filter
        if (filters.location.length > 0 && !filters.location.includes(job.location)) {
            return false;
        }

        // Experience level filter
        if (filters.experience.length > 0 && !filters.experience.includes(job.experience)) {
            return false;
        }

        // Salary range filter
        if (filters.salary) {
            const jobSalary = parseInt(job.salary.replace(/[^0-9]/g, ''));
            const rangeLimits = filters.salary.match(/\$(\d+)k\s*-\s*\$(\d+)k|\$(\d+)k\+/);

            if (rangeLimits) {
                if (rangeLimits[3]) { // Handle "$150k+" format
                    const lowerLimit = parseInt(rangeLimits[3]) * 1000;
                    if (jobSalary < lowerLimit) return false;
                } else { // Handle "$50k - $100k" format
                    const lowerLimit = parseInt(rangeLimits[1]) * 1000;
                    const upperLimit = parseInt(rangeLimits[2]) * 1000;
                    if (jobSalary < lowerLimit || jobSalary > upperLimit) return false;
                }
            }
        }

        return true;
    });

    return (
        <>
            <div className="p-6 bg-gray-50 min-h-screen">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Find Your Dream Job</h1>
                    <p className="text-gray-600 mt-2">Discover opportunities that match your skills and career goals</p>
                </div>

                {/* Search and Filter Section */}
                <div className="mb-8 flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            placeholder="Search for jobs, companies, or keywords"
                            className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
                    </div>

                    <button
                        className={`px-4 py-3 border rounded-lg flex items-center justify-center gap-2 ${showFilters ? 'bg-violet-100 border-violet-300 text-violet-700' : 'bg-white border-gray-300 hover:bg-gray-50'}`}
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <Filter size={18} />
                        <span>Filters {Object.values(filters).flat().filter(Boolean).length > 0 && `(${Object.values(filters).flat().filter(Boolean).length})`}</span>
                    </button>

                    <button className="px-6 py-3 bg-violet-500 text-white rounded-lg font-medium hover:bg-violet-600">
                        Search Jobs
                    </button>
                </div>

                {/* Expanded Filters */}
                {showFilters && (
                    <div className="mb-8 bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                                <Sliders size={18} className="text-violet-500" />
                                Filter Jobs
                            </h3>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={clearFilters}
                                    className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
                                >
                                    <X size={14} />
                                    Clear All
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* Job Type Filter */}
                            <div>
                                <h4 className="font-medium text-gray-700 mb-2">Job Type</h4>
                                <div className="space-y-2">
                                    {['Full-time', 'Part-time', 'Contract', 'Internship'].map(type => (
                                        <label key={type} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={filters.jobType.includes(type)}
                                                onChange={() => toggleFilter('jobType', type)}
                                                className="rounded text-violet-500 focus:ring-violet-500"
                                            />
                                            <span className="text-gray-600">{type}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Location Filter */}
                            <div>
                                <h4 className="font-medium text-gray-700 mb-2">Location</h4>
                                <div className="space-y-2">
                                    {['Remote', 'New York, NY', 'San Francisco, CA', 'Austin, TX', 'Boston, MA'].map(location => (
                                        <label key={location} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={filters.location.includes(location)}
                                                onChange={() => toggleFilter('location', location)}
                                                className="rounded text-violet-500 focus:ring-violet-500"
                                            />
                                            <span className="text-gray-600">{location}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Salary Range Filter */}
                            <div>
                                <h4 className="font-medium text-gray-700 mb-2">Salary Range</h4>
                                <div className="space-y-2">
                                    {['$0 - $50k', '$50k - $100k', '$100k - $150k', '$150k+'].map(range => (
                                        <label key={range} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="salary"
                                                checked={filters.salary === range}
                                                onChange={() => toggleFilter('salary', range)}
                                                className="rounded-full text-violet-500 focus:ring-violet-500"
                                            />
                                            <span className="text-gray-600">{range}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Experience Level Filter */}
                            <div>
                                <h4 className="font-medium text-gray-700 mb-2">Experience Level</h4>
                                <div className="space-y-2">
                                    {['Entry Level', 'Mid Level', 'Senior Level', 'Director', 'Executive'].map(level => (
                                        <label key={level} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={filters.experience.includes(level)}
                                                onChange={() => toggleFilter('experience', level)}
                                                className="rounded text-violet-500 focus:ring-violet-500"
                                            />
                                            <span className="text-gray-600">{level}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
                            <button className="px-5 py-2 bg-violet-500 text-white rounded-lg font-medium hover:bg-violet-600">
                                Apply Filters
                            </button>
                        </div>
                    </div>
                )}

                {/* Job Cards Section */}
                <div className="mb-4 flex flex-wrap gap-2">
                    <button className="px-3 py-1 bg-violet-500 text-white rounded-full text-sm hover:bg-violet-600">
                        All Jobs ({jobs.length})
                    </button>
                    <button className="px-3 py-1 bg-white border border-violet-200 text-violet-700 rounded-full text-sm hover:bg-violet-50">
                        Recent
                    </button>
                    <button className="px-3 py-1 bg-white border border-gray-200 text-gray-700 rounded-full text-sm hover:bg-gray-50">
                        Saved ({Object.values(savedJobs).filter(Boolean).length})
                    </button>
                    {filters.jobType.map(type => (
                        <div key={type} className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm flex items-center gap-1">
                            {type}
                            <button onClick={() => toggleFilter('jobType', type)} className="hover:text-violet-900">
                                <X size={14} />
                            </button>
                        </div>
                    ))}
                    {filters.location.map(location => (
                        <div key={location} className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm flex items-center gap-1">
                            {location}
                            <button onClick={() => toggleFilter('location', location)} className="hover:text-violet-900">
                                <X size={14} />
                            </button>
                        </div>
                    ))}
                    {filters.experience.map(exp => (
                        <div key={exp} className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm flex items-center gap-1">
                            {exp}
                            <button onClick={() => toggleFilter('experience', exp)} className="hover:text-violet-900">
                                <X size={14} />
                            </button>
                        </div>
                    ))}
                    {filters.salary && (
                        <div className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm flex items-center gap-1">
                            {filters.salary}
                            <button onClick={() => setFilters(prev => ({ ...prev, salary: '' }))} className="hover:text-violet-900">
                                <X size={14} />
                            </button>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {filteredJobs.length === 0 ? (
                        <div className="col-span-3 py-16 flex flex-col items-center justify-center text-center">
                            <div className="bg-gray-100 rounded-full p-4 mb-4">
                                <Search size={32} className="text-gray-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">No jobs found</h3>
                            <p className="text-gray-600 max-w-md">
                                We couldn't find any jobs matching your current filters. Try adjusting your search criteria.
                            </p>
                            <button
                                onClick={clearFilters}
                                className="mt-4 px-4 py-2 bg-violet-500 text-white rounded-lg font-medium hover:bg-violet-600"
                            >
                                Clear Filters
                            </button>
                        </div>
                    ) : (
                        filteredJobs.map(job => (
                            <div key={job.id} className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-violet-500 text-white rounded-lg flex items-center justify-center font-bold text-xl">
                                                {job.logo}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{job.title}</h3>
                                                <p className="text-sm text-gray-600">{job.company}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => toggleSaved(job.id)}
                                            className="text-gray-400 hover:text-violet-500"
                                        >
                                            {savedJobs[job.id] ?
                                                <Star size={20} className="fill-violet-500 text-violet-500" /> :
                                                <StarOff size={20} />
                                            }
                                        </button>
                                    </div>

                                    <div className="mt-3 mb-3 flex flex-wrap gap-1">
                                        {job.skills.map(skill => (
                                            <span key={skill} className="bg-violet-50 text-violet-700 text-xs px-2 py-1 rounded">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <MapPin size={16} />
                                            <span>{job.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Briefcase size={16} />
                                            <span>{job.type}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Clock size={16} />
                                            <span>Posted {job.posted}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <DollarSign size={16} />
                                            <span>{job.salary}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="font-medium text-gray-900">{job.salary}</span>
                                        <button className="flex items-center text-violet-500 font-medium hover:text-violet-600 cursor-pointer"
                                            onClick={() => {
                                                setApplyJob(job);
                                                handleApplyJobSubmit(job);
                                            }}
                                        >
                                            Apply Now
                                            <ChevronRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))

                    )}
                </div>

                {/* Results Summary */}
                {filteredJobs.length > 0 && (
                    <div className="mb-12 text-center">
                        <p className="text-gray-600">
                            Showing <span className="font-semibold text-gray-800">{filteredJobs.length}</span> of <span className="font-semibold text-gray-800">{jobs.length}</span> jobs
                        </p>
                        <button className="mt-2 text-violet-600 font-medium hover:text-violet-700">
                            Load More
                        </button>
                    </div>
                )}

                {/* Recommended Jobs Section */}
                <div className="mt-12">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-800">Recommended For You</h2>
                        <button className="text-violet-500 font-medium hover:text-violet-600">View All</button>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 mb-6">
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-violet-500 text-white rounded-lg flex items-center justify-center font-bold text-xl">
                                    A
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">AI Research Engineer</h3>
                                    <p className="text-sm text-gray-600">Alpha Technologies</p>
                                </div>
                            </div>
                            <span className="text-sm font-medium text-violet-500 bg-violet-50 px-3 py-1 rounded-full">
                                95% Match
                            </span>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                            <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">Machine Learning</span>
                            <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">Python</span>
                            <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">TensorFlow</span>
                            <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">Research</span>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <MapPin size={16} />
                                    <span>Boston, MA</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Briefcase size={16} />
                                    <span>Full-time</span>
                                </div>
                            </div>

                            <button className="px-4 py-2 bg-violet-500 text-white rounded-lg font-medium hover:bg-violet-600 cursor-pointer">
                                Apply Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {showApplyJobModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-opacity-30">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8 relative overflow-hidden">
                        {/* Animated checkmark */}
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100 mb-6">
                            <svg
                                className="w-10 h-10 text-emerald-500 animate-check"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <style>{`
                        .animate-check {
                            stroke-dasharray: 22;
                            stroke-dashoffset: 22;
                            animation: draw 0.6s cubic-bezier(0.65, 0, 0.45, 1) 0.2s forwards;
                        }
                        @keyframes draw {
                            to { stroke-dashoffset: 0; }
                        }
                    `}</style>
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">Application Submitted!</h2>

                        <p className="text-gray-600 text-center mb-1">
                            You've applied for <span className="font-semibold text-gray-800">{applyJob.title}</span>
                        </p>
                        <p className="text-gray-600 text-center mb-6">
                            at <span className="font-semibold text-gray-800">{applyJob.company}</span>
                        </p>

                        <div className="bg-blue-50 rounded-lg p-4 mb-6">
                            <p className="text-sm text-violet-700 text-center">
                                <svg className="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                                </svg>
                                Check your email for confirmation
                            </p>
                        </div>

                        <button
                            onClick={() => setShowApplyJobModal(false)}
                            className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Got it!
                        </button>

                        {/* Close button */}
                        <button
                            className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
                            onClick={() => setShowApplyJobModal(false)}
                        >
                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}

        </>


    );
}


