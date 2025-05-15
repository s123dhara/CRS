import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import BACKEND_API from '../../../services/applicationApi';

const JobApplicationsListing = () => {
    const { jobId } = useParams();
    console.log(jobId);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [sortConfig, setSortConfig] = useState({ key: 'applied_at', direction: 'desc' });
    const [jobname, setJobname] = useState('');
    const navigate = useNavigate();

    // Mock data - in a real app, this would come from an API
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Simulate API call
                setTimeout(async () => {
                    // const mockApplications = [
                    //     {
                    //         application_id: '1',
                    //         job_id: '101',
                    //         job_title: 'Frontend Developer',
                    //         profile_id: 'p1',
                    //         candidate_name: 'Alex Johnson',
                    //         candidate_image: 'https://randomuser.me/api/portraits/men/32.jpg',
                    //         current_title: 'UI Developer at TechCorp',
                    //         skills: ['React', 'JavaScript', 'TypeScript', 'CSS'],
                    //         applied_at: '2023-05-15T10:30:00Z',
                    //         status: 'review',
                    //         match_score: 85,
                    //         education: 'BS Computer Science, Stanford University',
                    //         experience: '5 years'
                    //     },
                    //     {
                    //         application_id: '2',
                    //         job_id: '101',
                    //         job_title: 'Frontend Developer',
                    //         profile_id: 'p2',
                    //         candidate_name: 'Maria Garcia',
                    //         candidate_image: 'https://randomuser.me/api/portraits/women/44.jpg',
                    //         current_title: 'Frontend Engineer at DesignHub',
                    //         skills: ['React', 'Redux', 'GraphQL', 'Jest'],
                    //         applied_at: '2023-05-14T14:15:00Z',
                    //         status: 'interview',
                    //         match_score: 92,
                    //         education: 'MS Software Engineering, MIT',
                    //         experience: '7 years'
                    //     },
                    //     {
                    //         application_id: '3',
                    //         job_id: '101',
                    //         job_title: 'Frontend Developer',
                    //         profile_id: 'p3',
                    //         candidate_name: 'Sam Wilson',
                    //         candidate_image: 'https://randomuser.me/api/portraits/men/22.jpg',
                    //         current_title: 'JavaScript Developer at WebSolutions',
                    //         skills: ['Vue', 'JavaScript', 'Node.js', 'HTML5'],
                    //         applied_at: '2023-05-16T09:45:00Z',
                    //         status: 'new',
                    //         match_score: 78,
                    //         education: 'BS Information Technology, University of Texas',
                    //         experience: '4 years'
                    //     },
                    //     {
                    //         application_id: '4',
                    //         job_id: '101',
                    //         job_title: 'Frontend Developer',
                    //         profile_id: 'p4',
                    //         candidate_name: 'Priya Patel',
                    //         candidate_image: 'https://randomuser.me/api/portraits/women/67.jpg',
                    //         current_title: 'Senior React Developer at FinTech Inc',
                    //         skills: ['React', 'TypeScript', 'Next.js', 'Tailwind'],
                    //         applied_at: '2023-05-13T16:20:00Z',
                    //         status: 'rejected',
                    //         match_score: 88,
                    //         education: 'BE Computer Engineering, IIT Bombay',
                    //         experience: '6 years'
                    //     },
                    //     {
                    //         application_id: '5',
                    //         job_id: '101',
                    //         job_title: 'Frontend Developer',
                    //         profile_id: 'p5',
                    //         candidate_name: 'David Kim',
                    //         candidate_image: 'https://randomuser.me/api/portraits/men/55.jpg',
                    //         current_title: 'Frontend Lead at StartupX',
                    //         skills: ['Angular', 'RxJS', 'SCSS', 'Webpack'],
                    //         applied_at: '2023-05-17T11:10:00Z',
                    //         status: 'new',
                    //         match_score: 75,
                    //         education: 'BS Computer Science, UC Berkeley',
                    //         experience: '8 years'
                    //     }
                    // ];

                    const result = await BACKEND_API.viewApplicationDetails(jobId);
                    console.log(result.applicants)
                    // setApplications(mockApplications);
                    setApplications(result.applicants);
                    setJobname(result.jobname);

                    console.log(jobname);
                    setLoading(false);
                }, 800);
            } catch (error) {
                console.error('Error fetching applications:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedApplications = [...applications].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });

    const filteredApplications = sortedApplications.filter(application => {
        const matchesSearch = application.candidate_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            application.current_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            application.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesStatus = statusFilter === 'all' || application.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const getStatusBadge = (status) => {
        const statusMap = {
            new: { color: 'bg-blue-100 text-blue-800', text: 'New' },
            review: { color: 'bg-purple-100 text-purple-800', text: 'In Review' },
            interview: { color: 'bg-green-100 text-green-800', text: 'Interview' },
            rejected: { color: 'bg-red-100 text-red-800', text: 'Rejected' },
            hired: { color: 'bg-emerald-100 text-emerald-800', text: 'Hired' }
        };

        return (
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusMap[status]?.color || 'bg-gray-100 text-gray-800'}`}>
                {statusMap[status]?.text || status}
            </span>
        );
    };

    const viewApplicationDetails = (applicationId) => {
        navigate(`/applications/${applicationId}`);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">{jobname} Applications</h1>
                <p className="text-gray-600">{filteredApplications.length} candidates applied</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
                <div className="p-4 border-b border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="relative flex-grow max-w-md">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Search candidates..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center space-x-4">
                            <div>
                                <label htmlFor="status-filter" className="sr-only">Filter by status</label>
                                <select
                                    id="status-filter"
                                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                >
                                    <option value="all">All Statuses</option>
                                    <option value="new">New</option>
                                    <option value="review">In Review</option>
                                    <option value="interview">Interview</option>
                                    <option value="hired">Hired</option>
                                    <option value="rejected">Rejected</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('candidate_name')}>
                                    <div className="flex items-center">
                                        Candidate
                                        {sortConfig.key === 'candidate_name' && (
                                            <span className="ml-1">
                                                {sortConfig.direction === 'asc' ? '↑' : '↓'}
                                            </span>
                                        )}
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Skills
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('match_score')}>
                                    <div className="flex items-center">
                                        Match
                                        {sortConfig.key === 'match_score' && (
                                            <span className="ml-1">
                                                {sortConfig.direction === 'asc' ? '↑' : '↓'}
                                            </span>
                                        )}
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('applied_at')}>
                                    <div className="flex items-center">
                                        Applied
                                        {sortConfig.key === 'applied_at' && (
                                            <span className="ml-1">
                                                {sortConfig.direction === 'asc' ? '↑' : '↓'}
                                            </span>
                                        )}
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredApplications.length > 0 ? (
                                filteredApplications.map((application) => (
                                    <tr key={application.application_id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    <img className="h-10 w-10 rounded-full" src={application.candidate_image} alt={application.candidate_name} />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{application.candidate_name}</div>
                                                    <div className="text-sm text-gray-500">{application.current_title}</div>
                                                    <div className="text-xs text-gray-400 mt-1">
                                                        {application.education.split(',')[0]}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-1 max-w-xs">
                                                {application.skills.slice(0, 4).map((skill, index) => (
                                                    <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                        {skill}
                                                    </span>
                                                ))}
                                                {application.skills.length > 4 && (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                        +{application.skills.length - 4}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="w-16 bg-gray-200 rounded-full h-2.5">
                                                    <div
                                                        className={`h-2.5 rounded-full ${application.match_score > 85 ? 'bg-green-500' : application.match_score > 70 ? 'bg-blue-500' : 'bg-yellow-500'}`}
                                                        style={{ width: `${application.match_score}%` }}
                                                    ></div>
                                                </div>
                                                <span className="ml-2 text-sm font-medium text-gray-700">{application.match_score}%</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {format(new Date(application.applied_at), 'MMM d, yyyy')}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getStatusBadge(application.status)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => viewApplicationDetails(application.application_id)}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                                        No applications found matching your criteria
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Status summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-500">New</h3>
                        <span className="text-lg font-semibold text-blue-600">
                            {applications.filter(a => a.status === 'new').length}
                        </span>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-500">In Review</h3>
                        <span className="text-lg font-semibold text-purple-600">
                            {applications.filter(a => a.status === 'review').length}
                        </span>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-500">Interview</h3>
                        <span className="text-lg font-semibold text-green-600">
                            {applications.filter(a => a.status === 'interview').length}
                        </span>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-500">Hired</h3>
                        <span className="text-lg font-semibold text-emerald-600">
                            {applications.filter(a => a.status === 'hired').length}
                        </span>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-500">Rejected</h3>
                        <span className="text-lg font-semibold text-red-600">
                            {applications.filter(a => a.status === 'rejected').length}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobApplicationsListing;