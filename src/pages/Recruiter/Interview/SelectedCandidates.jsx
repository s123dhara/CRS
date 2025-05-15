import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const SelectedCandidates = () => {
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [sortConfig, setSortConfig] = useState({ key: 'assessment_score', direction: 'desc' });
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [currentCandidate, setCurrentCandidate] = useState(null);
    const [interviewDetails, setInterviewDetails] = useState({
        interview_type: 'TECHNICAL',
        scheduled_date: '',
        scheduled_time: '',
        duration: 60,
        interviewers: [],
        notes: ''
    });
    const navigate = useNavigate();

    // Dummy data for selected candidates
    const dummyCandidates = [
        {
            id: 'c1',
            application_id: 'a1',
            job_id: 'j1',
            name: 'Alex Johnson',
            email: 'alex.johnson@example.com',
            current_position: 'Frontend Developer at TechCorp',
            assessment_score: 92,
            assessment_breakdown: {
                technical: 95,
                problem_solving: 90,
                communication: 88,
                culture_fit: 85
            },
            status: 'selected',
            interview_status: 'not_scheduled',
            resume_url: '/resumes/alex_johnson.pdf',
            skills: ['React', 'TypeScript', 'JavaScript', 'Redux']
        },
        {
            id: 'c2',
            application_id: 'a2',
            job_id: 'j1',
            name: 'Maria Garcia',
            email: 'maria.garcia@example.com',
            current_position: 'UI Engineer at DesignHub',
            assessment_score: 88,
            assessment_breakdown: {
                technical: 85,
                problem_solving: 92,
                communication: 90,
                culture_fit: 88
            },
            status: 'selected',
            interview_status: 'scheduled',
            scheduled_interview: '2023-06-20T14:00:00Z',
            interview_type: 'TECHNICAL',
            resume_url: '/resumes/maria_garcia.pdf',
            skills: ['React', 'GraphQL', 'Jest', 'CSS']
        },
        {
            id: 'c3',
            application_id: 'a3',
            job_id: 'j2',
            name: 'Sam Wilson',
            email: 'sam.wilson@example.com',
            current_position: 'JavaScript Developer at WebSolutions',
            assessment_score: 85,
            assessment_breakdown: {
                technical: 82,
                problem_solving: 88,
                communication: 85,
                culture_fit: 90
            },
            status: 'selected',
            interview_status: 'completed',
            interview_type: 'HR',
            interview_result: 'positive',
            resume_url: '/resumes/sam_wilson.pdf',
            skills: ['Vue', 'JavaScript', 'Node.js']
        }
    ];

    useEffect(() => {
        // Simulate API fetch
        setTimeout(() => {
            setCandidates(dummyCandidates);
            setLoading(false);
        }, 800);
    }, []);

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedCandidates = [...candidates].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });

    const filteredCandidates = sortedCandidates.filter(candidate => {
        return filter === 'all' || candidate.interview_status === filter;
    });

    const openScheduleModal = (candidate) => {
        setCurrentCandidate(candidate);
        setShowScheduleModal(true);
    };

    const closeScheduleModal = () => {
        setShowScheduleModal(false);
        setCurrentCandidate(null);
        setInterviewDetails({
            interview_type: 'TECHNICAL',
            scheduled_date: '',
            scheduled_time: '',
            duration: 60,
            interviewers: [],
            notes: ''
        });
    };

    const handleInterviewChange = (e) => {
        const { name, value } = e.target;
        setInterviewDetails({
            ...interviewDetails,
            [name]: value
        });
    };

    const scheduleInterview = () => {
        // In a real app, this would call an API
        const updatedCandidates = candidates.map(candidate => {
            if (candidate.id === currentCandidate.id) {
                return {
                    ...candidate,
                    interview_status: 'scheduled',
                    interview_type: interviewDetails.interview_type,
                    scheduled_interview: `${interviewDetails.scheduled_date}T${interviewDetails.scheduled_time}:00Z`
                };
            }
            return candidate;
        });

        setCandidates(updatedCandidates);
        closeScheduleModal();
    };

    const getStatusBadge = (status) => {
        const statusMap = {
            not_scheduled: { color: 'bg-gray-100 text-gray-800', text: 'Not Scheduled' },
            scheduled: { color: 'bg-blue-100 text-blue-800', text: 'Scheduled' },
            completed: { color: 'bg-green-100 text-green-800', text: 'Completed' },
            cancelled: { color: 'bg-yellow-100 text-yellow-800', text: 'Cancelled' }
        };

        return (
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusMap[status]?.color || 'bg-gray-100 text-gray-800'}`}>
                {statusMap[status]?.text || status}
            </span>
        );
    };

    const getScoreColor = (score) => {
        if (score >= 90) return 'text-green-600';
        if (score >= 80) return 'text-blue-600';
        if (score >= 70) return 'text-yellow-600';
        return 'text-red-600';
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
                <h1 className="text-2xl font-bold text-gray-900">Selected Candidates</h1>
                <p className="text-gray-600">Review assessment scores and schedule interviews</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
                <div className="p-4 border-b border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-center space-x-4">
                            <div>
                                <label htmlFor="status-filter" className="sr-only">Filter by status</label>
                                <select
                                    id="status-filter"
                                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                >
                                    <option value="all">All Candidates</option>
                                    <option value="not_scheduled">Not Scheduled</option>
                                    <option value="scheduled">Scheduled</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Candidate
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('assessment_score')}>
                                    <div className="flex items-center">
                                        Assessment Score
                                        {sortConfig.key === 'assessment_score' && (
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
                                    Interview Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Scheduled Interview
                                </th>
                                <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredCandidates.length > 0 ? (
                                filteredCandidates.map((candidate) => (
                                    <tr key={candidate.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                                                    <span className="text-gray-600">{candidate.name.charAt(0)}</span>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{candidate.name}</div>
                                                    <div className="text-sm text-gray-500">{candidate.current_position}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className={`text-lg font-bold ${getScoreColor(candidate.assessment_score)}`}>
                                                {candidate.assessment_score}%
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                Tech: {candidate.assessment_breakdown.technical}% |
                                                PS: {candidate.assessment_breakdown.problem_solving}% |
                                                Comm: {candidate.assessment_breakdown.communication}%
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-1 max-w-xs">
                                                {candidate.skills.slice(0, 3).map((skill, index) => (
                                                    <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                        {skill}
                                                    </span>
                                                ))}
                                                {candidate.skills.length > 3 && (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                        +{candidate.skills.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getStatusBadge(candidate.interview_status)}
                                            {candidate.interview_type && (
                                                <div className="text-xs text-gray-500 mt-1 capitalize">
                                                    {candidate.interview_type.toLowerCase().replace('_', ' ')}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {candidate.scheduled_interview ? (
                                                <>
                                                    <div className="text-sm text-gray-900">
                                                        {format(new Date(candidate.scheduled_interview), 'MMM d, yyyy')}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {format(new Date(candidate.scheduled_interview), 'h:mm a')}
                                                    </div>
                                                </>
                                            ) : (
                                                <span className="text-sm text-gray-500">Not scheduled</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            {candidate.interview_status === 'not_scheduled' ? (
                                                <button
                                                    onClick={() => openScheduleModal(candidate)}
                                                    className="text-blue-600 hover:text-blue-900 mr-4"
                                                >
                                                    Schedule
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => navigate(`/candidates/${candidate.id}/interview`)}
                                                    className="text-green-600 hover:text-green-900 mr-4"
                                                >
                                                    View
                                                </button>
                                            )}
                                            <a
                                                href={candidate.resume_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-600 hover:text-gray-900"
                                            >
                                                Resume
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                                        No candidates found matching your criteria
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Schedule Interview Modal */}
            {showScheduleModal && currentCandidate && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                        <div className="p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">
                                Schedule Interview for {currentCandidate.name}
                            </h2>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Interview Type</label>
                                <select
                                    name="interview_type"
                                    value={interviewDetails.interview_type}
                                    onChange={handleInterviewChange}
                                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                >
                                    <option value="PHONE">Phone Screen</option>
                                    <option value="VIDEO">Video Call</option>
                                    <option value="IN_PERSON">In Person</option>
                                    <option value="TECHNICAL">Technical</option>
                                    <option value="HR">HR Interview</option>
                                    <option value="PANEL">Panel Interview</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                    <input
                                        type="date"
                                        name="scheduled_date"
                                        value={interviewDetails.scheduled_date}
                                        onChange={handleInterviewChange}
                                        min={format(new Date(), 'yyyy-MM-dd')}
                                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                                    <input
                                        type="time"
                                        name="scheduled_time"
                                        value={interviewDetails.scheduled_time}
                                        onChange={handleInterviewChange}
                                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
                                <input
                                    type="number"
                                    name="duration"
                                    value={interviewDetails.duration}
                                    onChange={handleInterviewChange}
                                    min="15"
                                    max="240"
                                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                                <textarea
                                    name="notes"
                                    value={interviewDetails.notes}
                                    onChange={handleInterviewChange}
                                    rows={3}
                                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                    placeholder="Any special instructions for the interview..."
                                />
                            </div>

                            <div className="flex justify-end space-x-3">
                                <button
                                    onClick={closeScheduleModal}
                                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={scheduleInterview}
                                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Schedule Interview
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SelectedCandidates;