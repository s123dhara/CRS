import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

const InterviewManagement = () => {
    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [sortConfig, setSortConfig] = useState({ key: 'scheduled_start', direction: 'desc' });
    const [editingInterview, setEditingInterview] = useState(null);
    const navigate = useNavigate();

    // Dummy data matching the schema
    const dummyInterviews = [
        {
            _id: '1',
            application_id: 'a1',
            job_id: 'j1',
            applicant_id: 'p1',
            interview_type: 'TECHNICAL',
            title: 'Technical Assessment',
            description: 'Coding challenge and system design discussion',
            scheduled_start: '2023-06-15T14:00:00Z',
            scheduled_end: '2023-06-15T15:00:00Z',
            duration_minutes: 60,
            timezone: 'America/New_York',
            location: 'Virtual',
            meeting_link: 'https://zoom.us/j/123456789',
            meeting_id: '123456789',
            meeting_password: 'tech123',
            status: 'SCHEDULED',
            interviewers: [
                {
                    user_id: 'u1',
                    name: 'John Smith',
                    email: 'john.smith@company.com',
                    is_confirmed: true
                }
            ],
            created_by: 'u2',
            created_at: '2023-06-01T10:00:00Z',
            updated_at: '2023-06-01T10:00:00Z'
        },
        {
            _id: '2',
            application_id: 'a2',
            job_id: 'j1',
            applicant_id: 'p2',
            interview_type: 'HR',
            title: 'Culture Fit Interview',
            description: 'Discuss company values and team fit',
            scheduled_start: '2023-06-16T10:00:00Z',
            scheduled_end: '2023-06-16T10:45:00Z',
            duration_minutes: 45,
            timezone: 'America/New_York',
            location: 'Office - Room 201',
            meeting_link: '',
            meeting_id: '',
            meeting_password: '',
            status: 'COMPLETED',
            interviewers: [
                {
                    user_id: 'u3',
                    name: 'Sarah Johnson',
                    email: 'sarah.j@company.com',
                    is_confirmed: true
                }
            ],
            created_by: 'u2',
            created_at: '2023-06-02T09:00:00Z',
            updated_at: '2023-06-16T11:00:00Z'
        },
        {
            _id: '3',
            application_id: 'a3',
            job_id: 'j2',
            applicant_id: 'p3',
            interview_type: 'VIDEO',
            title: 'Initial Screening',
            description: 'General qualifications and experience review',
            scheduled_start: '2023-06-20T13:00:00Z',
            scheduled_end: '2023-06-20T13:30:00Z',
            duration_minutes: 30,
            timezone: 'America/Los_Angeles',
            location: 'Virtual',
            meeting_link: 'https://teams.microsoft.com/l/meetup-join/123',
            meeting_id: '456789',
            meeting_password: 'screen456',
            status: 'SCHEDULED',
            interviewers: [
                {
                    user_id: 'u4',
                    name: 'Michael Brown',
                    email: 'michael.b@company.com',
                    is_confirmed: false
                }
            ],
            created_by: 'u2',
            created_at: '2023-06-05T14:00:00Z',
            updated_at: '2023-06-05T14:00:00Z'
        }
    ];

    useEffect(() => {
        // Simulate API fetch
        setTimeout(() => {
            setInterviews(dummyInterviews);
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

    const sortedInterviews = [...interviews].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });

    const filteredInterviews = sortedInterviews.filter(interview => {
        return filter === 'all' || interview.status === filter;
    });

    const handleEdit = (interview) => {
        setEditingInterview(interview);
    };

    const handleSave = () => {
        // In a real app, this would update the backend
        setInterviews(interviews.map(i =>
            i._id === editingInterview._id ? editingInterview : i
        ));
        setEditingInterview(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditingInterview({
            ...editingInterview,
            [name]: value
        });
    };

    const getStatusBadge = (status) => {
        const statusMap = {
            SCHEDULED: { color: 'bg-blue-100 text-blue-800', text: 'Scheduled' },
            COMPLETED: { color: 'bg-green-100 text-green-800', text: 'Completed' },
            CANCELLED: { color: 'bg-red-100 text-red-800', text: 'Cancelled' },
            RESCHEDULED: { color: 'bg-purple-100 text-purple-800', text: 'Rescheduled' },
            NO_SHOW: { color: 'bg-yellow-100 text-yellow-800', text: 'No Show' }
        };

        return (
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusMap[status]?.color || 'bg-gray-100 text-gray-800'}`}>
                {statusMap[status]?.text || status}
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
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Interview Management</h1>
                <p className="text-gray-600">Manage scheduled interviews and candidate evaluations</p>
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
                                    <option value="all">All Interviews</option>
                                    <option value="SCHEDULED">Scheduled</option>
                                    <option value="COMPLETED">Completed</option>
                                    <option value="CANCELLED">Cancelled</option>
                                    <option value="RESCHEDULED">Rescheduled</option>
                                    <option value="NO_SHOW">No Show</option>
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
                                        Interview
                                        {sortConfig.key === 'title' && (
                                            <span className="ml-1">
                                                {sortConfig.direction === 'asc' ? '↑' : '↓'}
                                            </span>
                                        )}
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('interview_type')}>
                                    Type
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Candidate
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('scheduled_start')}>
                                    <div className="flex items-center">
                                        Scheduled
                                        {sortConfig.key === 'scheduled_start' && (
                                            <span className="ml-1">
                                                {sortConfig.direction === 'asc' ? '↑' : '↓'}
                                            </span>
                                        )}
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Interviewers
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
                            {filteredInterviews.length > 0 ? (
                                filteredInterviews.map((interview) => (
                                    <tr key={interview._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900">{interview.title}</div>
                                            <div className="text-sm text-gray-500">{interview.description}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900 capitalize">{interview.interview_type.toLowerCase().replace('_', ' ')}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">Candidate #{interview.applicant_id.substring(0, 4)}</div>
                                            <div className="text-sm text-gray-500">For Job #{interview.job_id.substring(0, 4)}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {format(parseISO(interview.scheduled_start), 'MMM d, yyyy h:mm a')}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {interview.timezone} ({interview.duration_minutes} mins)
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {interview.interviewers.map((interviewer, idx) => (
                                                <div key={idx} className="text-sm text-gray-900">
                                                    {interviewer.name}
                                                    {interviewer.is_confirmed ? (
                                                        <span className="ml-2 text-xs text-green-600">✓ Confirmed</span>
                                                    ) : (
                                                        <span className="ml-2 text-xs text-yellow-600">Pending</span>
                                                    )}
                                                </div>
                                            ))}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getStatusBadge(interview.status)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => handleEdit(interview)}
                                                className="text-blue-600 hover:text-blue-900 mr-4"
                                            >
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                                        No interviews found matching your criteria
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Edit Modal */}
            {editingInterview && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Edit Interview</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Interview Type</label>
                                    <select
                                        name="interview_type"
                                        value={editingInterview.interview_type}
                                        onChange={handleChange}
                                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                    >
                                        <option value="PHONE">Phone Screen</option>
                                        <option value="VIDEO">Video Call</option>
                                        <option value="IN_PERSON">In Person</option>
                                        <option value="TECHNICAL">Technical</option>
                                        <option value="HR">HR Interview</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <select
                                        name="status"
                                        value={editingInterview.status}
                                        onChange={handleChange}
                                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                    >
                                        <option value="SCHEDULED">Scheduled</option>
                                        <option value="COMPLETED">Completed</option>
                                        <option value="CANCELLED">Cancelled</option>
                                        <option value="RESCHEDULED">Rescheduled</option>
                                        <option value="NO_SHOW">No Show</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Scheduled Start</label>
                                    <input
                                        type="datetime-local"
                                        name="scheduled_start"
                                        value={format(parseISO(editingInterview.scheduled_start), "yyyy-MM-dd'T'HH:mm")}
                                        onChange={handleChange}
                                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
                                    <input
                                        type="number"
                                        name="duration_minutes"
                                        value={editingInterview.duration_minutes}
                                        onChange={handleChange}
                                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                                    <select
                                        name="timezone"
                                        value={editingInterview.timezone}
                                        onChange={handleChange}
                                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                    >
                                        <option value="America/New_York">Eastern Time (ET)</option>
                                        <option value="America/Chicago">Central Time (CT)</option>
                                        <option value="America/Denver">Mountain Time (MT)</option>
                                        <option value="America/Los_Angeles">Pacific Time (PT)</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Location/Meeting Link</label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={editingInterview.location}
                                        onChange={handleChange}
                                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                    />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    name="description"
                                    value={editingInterview.description}
                                    onChange={handleChange}
                                    rows={3}
                                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                />
                            </div>

                            <div className="flex justify-end space-x-3">
                                <button
                                    onClick={() => setEditingInterview(null)}
                                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InterviewManagement;