import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';


const ActiveJobListing = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('ACTIVE');
    const [sortConfig, setSortConfig] = useState({ key: 'publish_date', direction: 'desc' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchActiveJobs = async () => {
            try {
                setLoading(true);
                // In a real app, this would be an API call
                // const response = await fetch('/api/jobs?status=ACTIVE');
                // const data = await response.json();

                // Mock data
                const mockJobs = [
                    {
                        job_id: 'j1k2l3m4-n5o6-7890-p1q2-r3s4t5u6v7w8',
                        title: 'Senior Frontend Developer',
                        description: 'We are looking for an experienced frontend developer to join our team...',
                        location: 'San Francisco, CA',
                        is_remote: true,
                        job_type: 'Full-time',
                        experience_level: 'Senior',
                        salary_min: 120000,
                        salary_max: 150000,
                        salary_currency: 'USD',
                        status: 'ACTIVE',
                        applications_count: 15,
                        views_count: 245,
                        publish_date: '2023-05-10T09:00:00Z',
                        skills: ['React', 'TypeScript', 'Redux']
                    },
                    {
                        job_id: 'a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8',
                        title: 'UX/UI Designer',
                        description: 'Join our design team to create beautiful user experiences...',
                        location: 'Remote',
                        is_remote: true,
                        job_type: 'Full-time',
                        experience_level: 'Mid-level',
                        salary_min: 90000,
                        salary_max: 110000,
                        salary_currency: 'USD',
                        status: 'ACTIVE',
                        applications_count: 8,
                        views_count: 180,
                        publish_date: '2023-05-15T09:00:00Z',
                        skills: ['Figma', 'Sketch', 'UI Design', 'UX Research']
                    },
                    {
                        job_id: 'p1q2r3s4-t5u6-7890-v1w2-x3y4z5a6b7c8',
                        title: 'Backend Engineer (Node.js)',
                        description: 'Looking for a backend engineer to develop our API services...',
                        location: 'New York, NY',
                        is_remote: false,
                        job_type: 'Full-time',
                        experience_level: 'Mid-level',
                        salary_min: 110000,
                        salary_max: 140000,
                        salary_currency: 'USD',
                        status: 'ACTIVE',
                        applications_count: 12,
                        views_count: 210,
                        publish_date: '2023-05-05T09:00:00Z',
                        skills: ['Node.js', 'Express', 'MongoDB', 'AWS']
                    }
                ];

                setJobs(mockJobs);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching jobs:', error);
                setLoading(false);
            }
        };

        fetchActiveJobs();
    }, []);

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedJobs = [...jobs].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });

    const filteredJobs = sortedJobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesStatus = statusFilter === 'all' || job.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const viewApplications = (jobId) => {
        navigate(`/jobs/${jobId}/applications`);
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
                <h1 className="text-2xl font-bold text-gray-900">Active Job Listings</h1>
                <p className="text-gray-600">{filteredJobs.length} active jobs posted</p>
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
                                placeholder="Search jobs..."
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
                                    <option value="ACTIVE">Active</option>
                                    <option value="DRAFT">Draft</option>
                                    <option value="CLOSED">Closed</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('title')}>
                                    <div className="flex items-center">
                                        Job Title
                                        {sortConfig.key === 'title' && (
                                            <span className="ml-1">
                                                {sortConfig.direction === 'asc' ? '↑' : '↓'}
                                            </span>
                                        )}
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Skills
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Location
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('publish_date')}>
                                    <div className="flex items-center">
                                        Posted
                                        {sortConfig.key === 'publish_date' && (
                                            <span className="ml-1">
                                                {sortConfig.direction === 'asc' ? '↑' : '↓'}
                                            </span>
                                        )}
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('applications_count')}>
                                    <div className="flex items-center">
                                        Applications
                                        {sortConfig.key === 'applications_count' && (
                                            <span className="ml-1">
                                                {sortConfig.direction === 'asc' ? '↑' : '↓'}
                                            </span>
                                        )}
                                    </div>
                                </th>
                                <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredJobs.length > 0 ? (
                                filteredJobs.map((job) => (
                                    <tr key={job.job_id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{job.title}</div>
                                                    <div className="text-sm text-gray-500 line-clamp-2">{job.description}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-1 max-w-xs">
                                                {job.skills.slice(0, 3).map((skill, index) => (
                                                    <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                        {skill}
                                                    </span>
                                                ))}
                                                {job.skills.length > 3 && (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                        +{job.skills.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                {job.is_remote ? (
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                        Remote
                                                    </span>
                                                ) : (
                                                    <span className="text-sm text-gray-900">{job.location}</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {format(new Date(job.publish_date), 'MMM d, yyyy')}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{job.applications_count}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => viewApplications(job.job_id)}
                                                className="text-blue-600 hover:text-blue-900 mr-4"
                                            >
                                                View Applications
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                                        No jobs found matching your criteria
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ActiveJobListing;