import { useState, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp, Eye, X, Check, Calendar, User, Briefcase, Clock } from 'lucide-react';

// Mock data based on the provided database schema
const MOCK_CANDIDATES = [
    {
        id: '1',
        profile_id: 'prof-001',
        first_name: 'John',
        last_name: 'Smith',
        contact_email: 'john.smith@example.com',
        phone: '555-123-4567',
        job_title: 'Frontend Developer',
        job_id: 'job-001',
        company_name: 'Tech Solutions Inc.',
        interview_date: '2025-05-10T14:00:00',
        status: 'Scheduled',
        skills: ['React', 'JavaScript', 'CSS']
    },
    {
        id: '2',
        profile_id: 'prof-002',
        first_name: 'Sarah',
        last_name: 'Johnson',
        contact_email: 'sarah.j@example.com',
        phone: '555-987-6543',
        job_title: 'Backend Engineer',
        job_id: 'job-002',
        company_name: 'Data Systems Corp',
        interview_date: '2025-05-08T10:30:00',
        status: 'Scheduled',
        skills: ['Python', 'Django', 'PostgreSQL']
    },
    {
        id: '3',
        profile_id: 'prof-003',
        first_name: 'Michael',
        last_name: 'Williams',
        contact_email: 'mike.w@example.com',
        phone: '555-456-7890',
        job_title: 'UX Designer',
        job_id: 'job-003',
        company_name: 'Creative Design Agency',
        interview_date: '2025-05-15T11:00:00',
        status: 'Scheduled',
        skills: ['Figma', 'UI/UX', 'User Research']
    },
    {
        id: '4',
        profile_id: 'prof-004',
        first_name: 'Emily',
        last_name: 'Brown',
        contact_email: 'emily.b@example.com',
        phone: '555-234-5678',
        job_title: 'Full Stack Developer',
        job_id: 'job-001',
        company_name: 'Tech Solutions Inc.',
        interview_date: '2025-05-07T15:30:00',
        status: 'Completed',
        skills: ['React', 'Node.js', 'MongoDB']
    },
    {
        id: '5',
        profile_id: 'prof-005',
        first_name: 'David',
        last_name: 'Lee',
        contact_email: 'david.lee@example.com',
        phone: '555-876-5432',
        job_title: 'DevOps Engineer',
        job_id: 'job-004',
        company_name: 'Cloud Technologies Ltd',
        interview_date: '2025-05-12T09:00:00',
        status: 'Scheduled',
        skills: ['AWS', 'Docker', 'Kubernetes']
    }
];

// Mock job data
const MOCK_JOBS = [
    { id: 'job-001', title: 'Frontend Developer', company: 'Tech Solutions Inc.' },
    { id: 'job-002', title: 'Backend Engineer', company: 'Data Systems Corp' },
    { id: 'job-003', title: 'UX Designer', company: 'Creative Design Agency' },
    { id: 'job-004', title: 'DevOps Engineer', company: 'Cloud Technologies Ltd' }
];

export default function CandidateManagement() {
    const [searchTerm, setSearchTerm] = useState('');
    const [candidates, setCandidates] = useState(MOCK_CANDIDATES);
    const [filteredCandidates, setFilteredCandidates] = useState(MOCK_CANDIDATES);
    const [sortConfig, setSortConfig] = useState({ key: 'interview_date', direction: 'asc' });
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [showCandidateDetails, setShowCandidateDetails] = useState(false);
    const [statusFilter, setStatusFilter] = useState('All');
    const [jobFilter, setJobFilter] = useState('All');

    // Handle search and filtering
    useEffect(() => {
        let results = [...candidates];

        // Apply search term filter
        if (searchTerm) {
            results = results.filter(
                candidate =>
                    `${candidate.first_name} ${candidate.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    candidate.contact_email.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply status filter
        if (statusFilter !== 'All') {
            results = results.filter(candidate => candidate.status === statusFilter);
        }

        // Apply job filter
        if (jobFilter !== 'All') {
            results = results.filter(candidate => candidate.job_id === jobFilter);
        }

        // Apply sorting
        if (sortConfig.key) {
            results.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }

        setFilteredCandidates(results);
    }, [searchTerm, candidates, sortConfig, statusFilter, jobFilter]);

    // Handle sorting
    const requestSort = key => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // Format date for display
    const formatDate = dateString => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    // View candidate details
    const viewCandidateDetails = candidate => {
        setSelectedCandidate(candidate);
        setShowCandidateDetails(true);
    };

    // Handle candidate selection (approve/reject)
    const handleCandidateSelection = (candidateId, selected) => {
        setCandidates(
            candidates.map(candidate => {
                if (candidate.id === candidateId) {
                    return {
                        ...candidate,
                        status: selected ? 'Approved' : 'Rejected'
                    };
                }
                return candidate;
            })
        );
        setShowCandidateDetails(false);
    };

    // Render sort indicator
    const renderSortIndicator = key => {
        if (sortConfig.key !== key) return null;
        return sortConfig.direction === 'asc' ? (
            <ChevronUp className="w-4 h-4 inline-block ml-1" />
        ) : (
            <ChevronDown className="w-4 h-4 inline-block ml-1" />
        );
    };

    return (
        <div className="bg-gray-50 min-h-screen p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Interview Candidate Management</h1>

                {/* Search and Filters */}
                <div className="bg-white p-4 rounded-lg shadow mb-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                        {/* Search */}
                        <div className="relative flex-grow max-w-lg">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Search candidates by name or email"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Filters */}
                        <div className="flex flex-wrap gap-3">
                            {/* Status filter */}
                            <select
                                className="block w-full md:w-auto px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                value={statusFilter}
                                onChange={e => setStatusFilter(e.target.value)}
                            >
                                <option value="All">All Statuses</option>
                                <option value="Scheduled">Scheduled</option>
                                <option value="Completed">Completed</option>
                                <option value="Approved">Approved</option>
                                <option value="Rejected">Rejected</option>
                            </select>

                            {/* Job filter */}
                            <select
                                className="block w-full md:w-auto px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                value={jobFilter}
                                onChange={e => setJobFilter(e.target.value)}
                            >
                                <option value="All">All Jobs</option>
                                {MOCK_JOBS.map(job => (
                                    <option key={job.id} value={job.id}>
                                        {job.title} - {job.company}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Candidates Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                        onClick={() => requestSort('last_name')}
                                    >
                                        <span className="flex items-center">
                                            Candidate
                                            {renderSortIndicator('last_name')}
                                        </span>
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                        onClick={() => requestSort('job_title')}
                                    >
                                        <span className="flex items-center">
                                            Position
                                            {renderSortIndicator('job_title')}
                                        </span>
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                        onClick={() => requestSort('interview_date')}
                                    >
                                        <span className="flex items-center">
                                            Interview Date
                                            {renderSortIndicator('interview_date')}
                                        </span>
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                        onClick={() => requestSort('status')}
                                    >
                                        <span className="flex items-center">
                                            Status
                                            {renderSortIndicator('status')}
                                        </span>
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredCandidates.length > 0 ? (
                                    filteredCandidates.map(candidate => (
                                        <tr key={candidate.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                        <span className="text-blue-600 font-medium">
                                                            {candidate.first_name.charAt(0)}{candidate.last_name.charAt(0)}
                                                        </span>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {candidate.first_name} {candidate.last_name}
                                                        </div>
                                                        <div className="text-sm text-gray-500">{candidate.contact_email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{candidate.job_title}</div>
                                                <div className="text-sm text-gray-500">{candidate.company_name}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {formatDate(candidate.interview_date)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${candidate.status === 'Scheduled' ? 'bg-yellow-100 text-yellow-800' :
                                                        candidate.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                                                            candidate.status === 'Approved' ? 'bg-green-100 text-green-800' :
                                                                'bg-red-100 text-red-800'}`}>
                                                    {candidate.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    onClick={() => viewCandidateDetails(candidate)}
                                                    className="text-blue-600 hover:text-blue-900 inline-flex items-center"
                                                >
                                                    <Eye className="w-4 h-4 mr-1" />
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                                            No candidates found matching your criteria
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Candidate Details Modal */}
                {showCandidateDetails && selectedCandidate && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
                            <div className="flex justify-between items-center px-6 py-4 border-b">
                                <h2 className="text-xl font-semibold text-gray-800">Candidate Details</h2>
                                <button
                                    onClick={() => setShowCandidateDetails(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="p-6">
                                {/* Basic Info */}
                                <div className="mb-6">
                                    <div className="flex items-center mb-4">
                                        <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                                            <span className="text-blue-600 text-xl font-medium">
                                                {selectedCandidate.first_name.charAt(0)}{selectedCandidate.last_name.charAt(0)}
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-900">
                                                {selectedCandidate.first_name} {selectedCandidate.last_name}
                                            </h3>
                                            <p className="text-gray-600">{selectedCandidate.job_title} Candidate</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                        <div className="flex items-center">
                                            <User className="w-5 h-5 text-gray-400 mr-2" />
                                            <span className="text-gray-700">{selectedCandidate.contact_email}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <User className="w-5 h-5 text-gray-400 mr-2" />
                                            <span className="text-gray-700">{selectedCandidate.phone}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Briefcase className="w-5 h-5 text-gray-400 mr-2" />
                                            <span className="text-gray-700">{selectedCandidate.job_title} at {selectedCandidate.company_name}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                                            <span className="text-gray-700">Interview: {formatDate(selectedCandidate.interview_date)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Skills */}
                                <div className="mb-6">
                                    <h4 className="text-lg font-medium text-gray-900 mb-2">Skills</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedCandidate.skills.map((skill, index) => (
                                            <span
                                                key={index}
                                                className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Sample Resume Data - In a real app, this would be real data */}
                                <div className="mb-6">
                                    <h4 className="text-lg font-medium text-gray-900 mb-2">Experience</h4>
                                    <div className="border-l-2 border-gray-200 pl-4 space-y-4">
                                        <div>
                                            <div className="flex items-center">
                                                <Clock className="w-4 h-4 text-gray-400 mr-2" />
                                                <span className="text-gray-500 text-sm">2022 - Present</span>
                                            </div>
                                            <h5 className="font-medium text-gray-900">Senior Developer</h5>
                                            <p className="text-gray-600">Tech Company XYZ</p>
                                        </div>
                                        <div>
                                            <div className="flex items-center">
                                                <Clock className="w-4 h-4 text-gray-400 mr-2" />
                                                <span className="text-gray-500 text-sm">2019 - 2022</span>
                                            </div>
                                            <h5 className="font-medium text-gray-900">Developer</h5>
                                            <p className="text-gray-600">Tech Startup ABC</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h4 className="text-lg font-medium text-gray-900 mb-2">Education</h4>
                                    <div className="border-l-2 border-gray-200 pl-4">
                                        <div className="flex items-center">
                                            <Clock className="w-4 h-4 text-gray-400 mr-2" />
                                            <span className="text-gray-500 text-sm">2015 - 2019</span>
                                        </div>
                                        <h5 className="font-medium text-gray-900">Bachelor of Science in Computer Science</h5>
                                        <p className="text-gray-600">University of Technology</p>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex justify-end space-x-3 pt-4 border-t">
                                    <button
                                        onClick={() => handleCandidateSelection(selectedCandidate.id, false)}
                                        className="px-4 py-2 bg-red-50 text-red-700 rounded-md hover:bg-red-100 flex items-center"
                                    >
                                        <X className="w-4 h-4 mr-2" />
                                        Reject Candidate
                                    </button>
                                    <button
                                        onClick={() => handleCandidateSelection(selectedCandidate.id, true)}
                                        className="px-4 py-2 bg-green-50 text-green-700 rounded-md hover:bg-green-100 flex items-center"
                                    >
                                        <Check className="w-4 h-4 mr-2" />
                                        Approve Candidate
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}