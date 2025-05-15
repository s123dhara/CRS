import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

const CandidateInterviewManagement = () => {
    const { candidateId } = useParams();
    const navigate = useNavigate();
    const [candidate, setCandidate] = useState(null);
    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [newInterview, setNewInterview] = useState({
        interview_type: 'TECHNICAL',
        title: '',
        description: '',
        scheduled_date: '',
        scheduled_time: '',
        duration_minutes: 60,
        timezone: 'America/New_York',
        location: 'Virtual',
        meeting_link: '',
        interviewers: []
    });

    // Dummy data
    const dummyCandidate = {
        id: candidateId,
        name: 'Alex Johnson',
        email: 'alex.johnson@example.com',
        position: 'Senior Frontend Developer',
        assessment_score: 92,
        resume_url: '/resumes/alex_johnson.pdf',
        skills: ['React', 'TypeScript', 'JavaScript', 'Redux']
    };

    const dummyInterviews = [
        {
            _id: 'i1',
            interview_type: 'TECHNICAL',
            title: 'Technical Assessment',
            description: 'Coding challenge and system design discussion',
            scheduled_start: '2023-06-15T14:00:00Z',
            scheduled_end: '2023-06-15T15:00:00Z',
            duration_minutes: 60,
            timezone: 'America/New_York',
            location: 'Virtual',
            meeting_link: 'https://zoom.us/j/123456789',
            status: 'SCHEDULED',
            interviewers: [
                {
                    user_id: 'u1',
                    name: 'John Smith',
                    email: 'john.smith@company.com',
                    is_confirmed: true
                }
            ],
            created_at: '2023-06-01T10:00:00Z'
        },
        {
            _id: 'i2',
            interview_type: 'HR',
            title: 'Culture Fit Interview',
            description: 'Discuss company values and team fit',
            scheduled_start: '2023-06-20T10:00:00Z',
            scheduled_end: '2023-06-20T10:45:00Z',
            duration_minutes: 45,
            timezone: 'America/New_York',
            location: 'Office - Room 201',
            meeting_link: '',
            status: 'UPCOMING',
            interviewers: [
                {
                    user_id: 'u2',
                    name: 'Sarah Johnson',
                    email: 'sarah.j@company.com',
                    is_confirmed: false
                }
            ],
            created_at: '2023-06-05T09:00:00Z'
        }
    ];

    useEffect(() => {
        // Simulate API calls
        setTimeout(() => {
            setCandidate(dummyCandidate);
            setInterviews(dummyInterviews);
            setLoading(false);
        }, 800);
    }, [candidateId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewInterview({
            ...newInterview,
            [name]: value
        });
    };

    const handleScheduleInterview = () => {
        // In a real app, this would call an API
        const scheduledStart = `${newInterview.scheduled_date}T${newInterview.scheduled_time}:00Z`;
        const scheduledEnd = new Date(new Date(scheduledStart).getTime() + newInterview.duration_minutes * 60000).toISOString();

        const interview = {
            _id: `i${interviews.length + 1}`,
            ...newInterview,
            scheduled_start: scheduledStart,
            scheduled_end: scheduledEnd,
            status: 'SCHEDULED',
            created_at: new Date().toISOString(),
            interviewers: [
                {
                    user_id: 'u3',
                    name: 'Michael Brown',
                    email: 'michael.b@company.com',
                    is_confirmed: false
                }
            ]
        };

        setInterviews([...interviews, interview]);
        setShowScheduleModal(false);
        resetNewInterviewForm();
    };

    const resetNewInterviewForm = () => {
        setNewInterview({
            interview_type: 'TECHNICAL',
            title: '',
            description: '',
            scheduled_date: '',
            scheduled_time: '',
            duration_minutes: 60,
            timezone: 'America/New_York',
            location: 'Virtual',
            meeting_link: '',
            interviewers: []
        });
    };

    const updateInterviewStatus = (interviewId, newStatus) => {
        setInterviews(interviews.map(interview =>
            interview._id === interviewId ? { ...interview, status: newStatus } : interview
        ));
    };

    const getStatusBadge = (status) => {
        const statusMap = {
            SCHEDULED: { color: 'bg-blue-100 text-blue-800', text: 'Scheduled' },
            UPCOMING: { color: 'bg-purple-100 text-purple-800', text: 'Upcoming' },
            COMPLETED: { color: 'bg-green-100 text-green-800', text: 'Completed' },
            CANCELLED: { color: 'bg-red-100 text-red-800', text: 'Cancelled' },
            RESCHEDULED: { color: 'bg-yellow-100 text-yellow-800', text: 'Rescheduled' }
        };

        return (
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusMap[status]?.color || 'bg-gray-100 text-gray-800'}`}>
                {statusMap[status]?.text || status}
            </span>
        );
    };

    const getInterviewTypeBadge = (type) => {
        const typeMap = {
            TECHNICAL: { color: 'bg-orange-100 text-orange-800', text: 'Technical' },
            HR: { color: 'bg-indigo-100 text-indigo-800', text: 'HR' },
            PHONE: { color: 'bg-teal-100 text-teal-800', text: 'Phone' },
            VIDEO: { color: 'bg-cyan-100 text-cyan-800', text: 'Video' },
            IN_PERSON: { color: 'bg-lime-100 text-lime-800', text: 'In Person' }
        };

        return (
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${typeMap[type]?.color || 'bg-gray-100 text-gray-800'}`}>
                {typeMap[type]?.text || type}
            </span>
        );
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
            <div className="mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-blue-600 hover:text-blue-800"
                >
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Candidates
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-start justify-between">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center">
                                <span className="text-2xl text-gray-600">{candidate.name.charAt(0)}</span>
                            </div>
                            <div className="ml-4">
                                <h2 className="text-xl font-bold text-gray-900">{candidate.name}</h2>
                                <p className="text-gray-600">{candidate.position}</p>
                                <p className="text-sm text-gray-500 mt-1">{candidate.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800`}>
                                Score: {candidate.assessment_score}%
                            </span>
                            <a
                                href={candidate.resume_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                View Resume
                            </a>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-medium text-gray-900">Interview Schedule</h3>
                        <button
                            onClick={() => setShowScheduleModal(true)}
                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Schedule New Interview
                        </button>
                    </div>

                    {interviews.length === 0 ? (
                        <div className="text-center py-12">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No interviews scheduled</h3>
                            <p className="mt-1 text-sm text-gray-500">Get started by scheduling a new interview.</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {interviews.map((interview) => (
                                <div key={interview._id} className="border border-gray-200 rounded-lg overflow-hidden">
                                    <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                                        <div className="flex items-center">
                                            {getInterviewTypeBadge(interview.interview_type)}
                                            <h4 className="ml-3 text-md font-medium text-gray-900">{interview.title}</h4>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            {getStatusBadge(interview.status)}
                                            <div className="text-sm text-gray-500">
                                                {format(parseISO(interview.scheduled_start), 'MMM d, yyyy h:mm a')}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div>
                                                <h5 className="text-sm font-medium text-gray-500 mb-1">Description</h5>
                                                <p className="text-sm text-gray-900">{interview.description}</p>
                                            </div>
                                            <div>
                                                <h5 className="text-sm font-medium text-gray-500 mb-1">Details</h5>
                                                <div className="space-y-1">
                                                    <p className="text-sm text-gray-900">
                                                        <span className="font-medium">Duration:</span> {interview.duration_minutes} minutes
                                                    </p>
                                                    <p className="text-sm text-gray-900">
                                                        <span className="font-medium">Location:</span> {interview.location}
                                                    </p>
                                                    {interview.meeting_link && (
                                                        <p className="text-sm text-gray-900">
                                                            <span className="font-medium">Link:</span>
                                                            <a href={interview.meeting_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 ml-1">
                                                                Join Meeting
                                                            </a>
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div>
                                                <h5 className="text-sm font-medium text-gray-500 mb-1">Interviewers</h5>
                                                <div className="space-y-2">
                                                    {interview.interviewers.map((interviewer, idx) => (
                                                        <div key={idx} className="flex items-center">
                                                            <div className="flex-shrink-0 h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                                                                <span className="text-xs text-gray-600">{interviewer.name.charAt(0)}</span>
                                                            </div>
                                                            <div className="ml-3">
                                                                <p className="text-sm font-medium text-gray-900">{interviewer.name}</p>
                                                                <p className="text-xs text-gray-500">{interviewer.email}</p>
                                                            </div>
                                                            {interviewer.is_confirmed ? (
                                                                <span className="ml-auto inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                                                    Confirmed
                                                                </span>
                                                            ) : (
                                                                <span className="ml-auto inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                                                                    Pending
                                                                </span>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end space-x-3">
                                            {interview.status === 'SCHEDULED' || interview.status === 'UPCOMING' ? (
                                                <>
                                                    <button
                                                        onClick={() => updateInterviewStatus(interview._id, 'CANCELLED')}
                                                        className="px-3 py-1 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        onClick={() => updateInterviewStatus(interview._id, 'RESCHEDULED')}
                                                        className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                                    >
                                                        Reschedule
                                                    </button>
                                                </>
                                            ) : null}
                                            <button
                                                onClick={() => navigate(`/interviews/${interview._id}`)}
                                                className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                            >
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Schedule Interview Modal */}
            {showScheduleModal && (
                <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold text-gray-900">Schedule New Interview</h2>
                                <button
                                    onClick={() => {
                                        setShowScheduleModal(false);
                                        resetNewInterviewForm();
                                    }}
                                    className="text-gray-400 hover:text-gray-500"
                                >
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Interview Type</label>
                                    <select
                                        name="interview_type"
                                        value={newInterview.interview_type}
                                        onChange={handleInputChange}
                                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                    >
                                        <option value="TECHNICAL">Technical</option>
                                        <option value="HR">HR</option>
                                        <option value="PHONE">Phone Screen</option>
                                        <option value="VIDEO">Video Call</option>
                                        <option value="IN_PERSON">In Person</option>
                                        <option value="PANEL">Panel Interview</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={newInterview.title}
                                        onChange={handleInputChange}
                                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                        placeholder="e.g. Technical Assessment"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                    <input
                                        type="date"
                                        name="scheduled_date"
                                        value={newInterview.scheduled_date}
                                        onChange={handleInputChange}
                                        min={format(new Date(), 'yyyy-MM-dd')}
                                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                                    <input
                                        type="time"
                                        name="scheduled_time"
                                        value={newInterview.scheduled_time}
                                        onChange={handleInputChange}
                                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
                                    <input
                                        type="number"
                                        name="duration_minutes"
                                        value={newInterview.duration_minutes}
                                        onChange={handleInputChange}
                                        min="15"
                                        max="240"
                                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                                    <select
                                        name="timezone"
                                        value={newInterview.timezone}
                                        onChange={handleInputChange}
                                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                    >
                                        <option value="America/New_York">Eastern Time (ET)</option>
                                        <option value="America/Chicago">Central Time (CT)</option>
                                        <option value="America/Denver">Mountain Time (MT)</option>
                                        <option value="America/Los_Angeles">Pacific Time (PT)</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                    <select
                                        name="location"
                                        value={newInterview.location}
                                        onChange={handleInputChange}
                                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                    >
                                        <option value="Virtual">Virtual</option>
                                        <option value="Office - Room 101">Office - Room 101</option>
                                        <option value="Office - Room 201">Office - Room 201</option>
                                        <option value="Office - Conference Room">Office - Conference Room</option>
                                    </select>
                                </div>

                                {newInterview.location === 'Virtual' && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Link</label>
                                        <input
                                            type="text"
                                            name="meeting_link"
                                            value={newInterview.meeting_link}
                                            onChange={handleInputChange}
                                            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                            placeholder="https://zoom.us/j/..."
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    name="description"
                                    value={newInterview.description}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                    placeholder="Describe what the interview will cover..."
                                />
                            </div>

                            <div className="flex justify-end space-x-3">
                                <button
                                    onClick={() => {
                                        setShowScheduleModal(false);
                                        resetNewInterviewForm();
                                    }}
                                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleScheduleInterview}
                                    disabled={!newInterview.scheduled_date || !newInterview.scheduled_time}
                                    className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${(!newInterview.scheduled_date || !newInterview.scheduled_time) ? 'opacity-50 cursor-not-allowed' : ''}`}
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

export default CandidateInterviewManagement;