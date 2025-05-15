// import React, { useEffect, useState } from "react";

// // Dummy job data (replace with API call or props)
// const dummyJobs = [
//     {
//         job_id: "1",
//         title: "Frontend Developer",
//         company: { name: "TechCorp" },
//         location: "Remote",
//         job_type: "Full-time",
//         experience_level: "Mid-level",
//         is_remote: true,
//         salary_min: 60000,
//         salary_max: 90000,
//         salary_currency: "USD",
//         is_salary_visible: true,
//         publish_date: "2025-05-01T12:00:00Z",
//         status: "ACTIVE",
//     },
//     {
//         job_id: "2",
//         title: "Backend Engineer",
//         company: { name: "CodeNest" },
//         location: "New York, NY",
//         job_type: "Contract",
//         experience_level: "Senior",
//         is_remote: false,
//         salary_min: null,
//         salary_max: null,
//         salary_currency: "USD",
//         is_salary_visible: false,
//         publish_date: "2025-05-03T09:00:00Z",
//         status: "REVIEW",
//     },
// ];

// const JobListTable = () => {
//     const [jobs, setJobs] = useState([]);

//     useEffect(() => {
//         // Replace with actual API call
//         setJobs(dummyJobs);
//     }, []);

//     return (
//         <div className="min-h-screen bg-violet-200 p-10">
//             <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
//                 <h1 className="text-3xl font-bold text-violet-700 p-6 border-b border-gray-200">
//                     Job Listings
//                 </h1>

//                 <div className="overflow-x-auto">
//                     <table className="min-w-full text-left">
//                         <thead className="bg-violet-100 text-violet-800 text-sm uppercase tracking-wider">
//                             <tr>
//                                 <th className="px-6 py-3">Job Title</th>
//                                 <th className="px-6 py-3">Company</th>
//                                 <th className="px-6 py-3">Location</th>
//                                 <th className="px-6 py-3">Job Type</th>
//                                 <th className="px-6 py-3">Experience</th>
//                                 <th className="px-6 py-3">Salary</th>
//                                 <th className="px-6 py-3">Posted On</th>
//                                 <th className="px-6 py-3">Status</th>
//                                 <th className="px-6 py-3">Action</th>
//                             </tr>
//                         </thead>
//                         <tbody className="text-gray-700 divide-y divide-gray-200">
//                             {jobs.length === 0 ? (
//                                 <tr>
//                                     <td colSpan="8" className="text-center py-8 text-gray-500">
//                                         No jobs available.
//                                     </td>
//                                 </tr>
//                             ) : (
//                                 jobs.map((job) => (
//                                     <tr key={job.job_id} className="hover:bg-gray-50 transition">
//                                         <td className="px-6 py-4 font-medium text-violet-700">
//                                             {job.title}
//                                         </td>
//                                         <td className="px-6 py-4">{job.company.name}</td>
//                                         <td className="px-6 py-4">
//                                             {job.location}
//                                             {job.is_remote && (
//                                                 <span className="ml-1 text-xs text-green-600">(Remote)</span>
//                                             )}
//                                         </td>
//                                         <td className="px-6 py-4">{job.job_type}</td>
//                                         <td className="px-6 py-4">{job.experience_level}</td>
//                                         <td className="px-6 py-4">
//                                             {job.is_salary_visible && job.salary_min
//                                                 ? `${job.salary_currency} ${job.salary_min.toLocaleString()} - ${job.salary_max?.toLocaleString()}`
//                                                 : "—"}
//                                         </td>
//                                         <td className="px-6 py-4">
//                                             {new Date(job.publish_date).toLocaleDateString()}
//                                         </td>
//                                         <td className="px-6 py-4">
//                                             <span
//                                                 className={`px-2 py-1 text-xs font-medium rounded-full ${job.status === "ACTIVE"
//                                                         ? "bg-green-100 text-green-700"
//                                                         : "bg-yellow-100 text-yellow-700"
//                                                     }`}
//                                             >
//                                                 {job.status}
//                                             </span>
//                                         </td>

//                                         <td>
//                                             <a href="" className="bg-blue-400 text-white p-2 mr-3 hover:bg-blue-500 rounded-md">Edit</a>
//                                             <a href="" className="bg-red-400 text-white p-2 mr-3 hover:bg-red-500 rounded-md">Delete</a>
//                                         </td>
//                                     </tr>
//                                 ))
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default JobListTable;

import React, { useEffect, useState } from "react";
import { FiEdit2, FiTrash2, FiEye, FiClock, FiCheckCircle, FiMapPin, FiDollarSign, FiBriefcase, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import BACKEND_API from "../../../services/JobApi";
import { toast } from "react-toastify";
import { Modal } from "../../../components/common/Modal";

const dummyJobs = [
    {
        job_id: "1",
        title: "Frontend Developer",
        company: { name: "TechCorp", logo: "https://via.placeholder.com/40" },
        location: "Remote",
        job_type: "Full-time",
        experience_level: "Mid-level",
        is_remote: true,
        salary_min: 60000,
        salary_max: 90000,
        salary_currency: "USD",
        is_salary_visible: true,
        publish_date: "2025-05-01T12:00:00Z",
        status: "ACTIVE",
        applications: 24,
    },
    {
        job_id: "2",
        title: "Backend Engineer",
        company: { name: "CodeNest", logo: "https://via.placeholder.com/40" },
        location: "New York, NY",
        job_type: "Contract",
        experience_level: "Senior",
        is_remote: false,
        salary_min: null,
        salary_max: null,
        salary_currency: "USD",
        is_salary_visible: false,
        publish_date: "2025-05-03T09:00:00Z",
        status: "REVIEW",
        applications: 8,
    },
    {
        job_id: "3",
        title: "UX Designer",
        company: { name: "DesignHub", logo: "https://via.placeholder.com/40" },
        location: "San Francisco, CA",
        job_type: "Full-time",
        experience_level: "Junior",
        is_remote: true,
        salary_min: 70000,
        salary_max: 95000,
        salary_currency: "USD",
        is_salary_visible: true,
        publish_date: "2025-05-05T14:00:00Z",
        status: "ACTIVE",
        applications: 15,
    },
];

const statusStyles = {
    ACTIVE: "bg-emerald-100 text-emerald-800",
    REVIEW: "bg-amber-100 text-amber-800",
    CLOSED: "bg-rose-100 text-rose-800",
};

const JobList = () => {
    const [jobs, setJobs] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("ALL");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteJobId, setDeleteJobId] = useState("");

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const navigate = useNavigate();
    const { loggedUser } = useAuth();

    const handleAddJob = () => {
        navigate('/employee/job/add');
    };

    const handleNavigateViewApplication = (job) => {
        navigate(`/employee/applications/${job.job_id}`);
    }

    const handleDeleteJob = (job) => {
        setDeleteJobId(job.job_id);
        // Show the logout confirmation modal instead of immediately logging out
        openModal();
    };

    const confirmDeleteJob = async () => {
        if (deleteJobId != undefined) {
            const { status, message } = await BACKEND_API.deleteJobByJobId(deleteJobId);
            if (status) {
                toast.success(message);
                const filterJobsAfterDelete = jobs.filter(job => {
                    // console.log("Checking job_id:", job.job_id);
                    return job.job_id !== deleteJobId;
                });
                setJobs(filterJobsAfterDelete);
                closeModal();

            } else {
                toast.error("Failed to delete job");
                closeModal();

            }
        } else {
            toast.error('Failed to delete Job');
        }
    };

    const handleEditJob = (job) => {
        console.log('clicked job = ', job);
        navigate(`/employee/job/edit/${job.job_id}`);
    }

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const { status, jobs: fetchedJobs } = await BACKEND_API.fetchJobByCompanyId(loggedUser);
                if (status) {
                    setJobs(fetchedJobs);
                } else {
                    toast.error("Failed to load jobs.");
                }
            } catch (error) {
                console.error("Job fetch error:", error);
                toast.error("Something went wrong while fetching jobs.");
            }
        };

        fetchJobs();
    }, [loggedUser]);

    const filteredJobs = jobs.filter(job => {
        const matchesSearch =
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === "ALL" || job.status === filter;
        return matchesSearch && matchesFilter;
    });

    console.log('updated jobs = ', jobs);

    return (
        <div className="min-h-screen  p-4 md:p-5">
            <div className="mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Job Listings</h1>
                        <p className="text-gray-500 mt-2">Manage and review all job postings</p>
                    </div>
                    <button onClick={handleAddJob} className="mt-4 md:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105">
                        + Add New Job
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div className="relative w-full md:w-64">
                                <input
                                    type="text"
                                    placeholder="Search jobs..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <svg
                                    className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>
                            <div className="flex space-x-2">
                                <select
                                    className="border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all"
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                >
                                    <option value="ALL">All Statuses</option>
                                    <option value="ACTIVE">Active</option>
                                    <option value="REVIEW">In Review</option>
                                    <option value="CLOSED">Closed</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Job Title
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Company
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Details
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Applications
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Posted
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredJobs.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <svg
                                                    className="h-12 w-12 text-gray-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={1}
                                                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                                <h3 className="mt-4 text-lg font-medium text-gray-900">No jobs found</h3>
                                                <p className="mt-1 text-gray-500">Try adjusting your search or filter criteria</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredJobs.map((job) => (
                                        <tr key={job.job_id} className="hover:bg-gray-50 transition-all duration-150">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center mr-4">
                                                        <FiBriefcase className="h-5 w-5 text-indigo-600" />
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">{job.title}</div>
                                                        <div className="text-sm text-gray-500">{job.job_type}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    {/* <img className="h-8 w-8 rounded-full mr-3" src={job.company.logo} alt={job.company.name} /> */}
                                                    <div className="text-sm font-medium text-gray-900">{job.company.name}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="space-y-1">
                                                    <div className="flex items-center text-sm text-gray-500">
                                                        <FiMapPin className="mr-1.5 h-4 w-4 flex-shrink-0" />
                                                        {job.location}
                                                        {job.is_remote && (
                                                            <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800">Remote</span>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center text-sm text-gray-500">
                                                        <FiDollarSign className="mr-1.5 h-4 w-4 flex-shrink-0" />
                                                        {job.is_salary_visible && job.salary_min
                                                            ? `${job.salary_currency} ${job.salary_min.toLocaleString()} - ${job.salary_max?.toLocaleString()}`
                                                            : "Not specified"}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[job.status]}`}>
                                                    {job.status === "ACTIVE" && <FiCheckCircle className="mr-1.5 h-3.5 w-3.5" />}
                                                    {job.status === "REVIEW" && <FiClock className="mr-1.5 h-3.5 w-3.5" />}
                                                    {job.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <FiUser className="mr-1.5 h-4 w-4 text-gray-400" />
                                                    <span className="text-sm text-gray-900">{job.applications}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(job.publish_date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end space-x-2">
                                                    <button
                                                        onClick={() => {
                                                            handleNavigateViewApplication(job)
                                                        }}
                                                        className="text-indigo-600 hover:text-indigo-900 p-1.5 rounded-md hover:bg-indigo-50 transition-all">
                                                        <FiEye className="h-5 w-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            handleEditJob(job)
                                                        }} className="text-blue-600 hover:text-blue-900 p-1.5 rounded-md hover:bg-blue-50 transition-all">
                                                        <FiEdit2 className="h-5 w-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            handleDeleteJob(job);
                                                        }}
                                                        className="text-rose-600 hover:text-rose-900 p-1.5 rounded-md hover:bg-rose-50 transition-all">
                                                        <FiTrash2 className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* { filteredJobs.length > 0 && (
                        <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
                            <div className="flex-1 flex justify-between sm:hidden">
                                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                    Previous
                                </button>
                                <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                    Next
                                </button>
                            </div>
                            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-gray-700">
                                        Showing <span className="font-medium">1</span> to <span className="font-medium">3</span> of{' '}
                                        <span className="font-medium">{filteredJobs.length}</span> results
                                    </p>
                                </div>
                                <div>
                                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                        <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                            <span className="sr-only">Previous</span>
                                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                        <button aria-current="page" className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                                            1
                                        </button>
                                        <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                                            2
                                        </button>
                                        <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                                            3
                                        </button>
                                        <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                            <span className="sr-only">Next</span>
                                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    ) } */}
                </div>
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title="Confirm Delete"
            >
                <p className="mb-4">Are you sure you want to remove the job?</p>
                <div className="flex justify-end">
                    <button
                        className="bg-gray-300 hover:bg-gray-400 text-zinc-600 font-medium py-2 px-4 rounded mr-2 cursor-pointer"
                        onClick={closeModal}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded cursor-pointer"
                        onClick={confirmDeleteJob}
                    >
                        remove
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default JobList;   