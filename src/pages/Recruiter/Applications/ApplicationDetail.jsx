import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { format } from 'date-fns';

const ApplicationDetail = () => {
    // const { jobId, applicationId } = useParams();
    const { applicationId } = useParams();
    const jobId = '123';
    const dummyApplication = {
        application_id: 'a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8',
        job_id: 'j1k2l3m4-n5o6-7890-p1q2-r3s4t5u6v7w8',
        profile_id: 'p1q2r3s4-t5u6-7890-v1w2-x3y4z5a6b7c8',
        applied_at: '2023-05-15T10:30:00Z',
        status: 'review',
        match_score: 85,
        resume_url: 'https://example.com/resumes/john_doe_resume.pdf',
        cover_letter: 'Dear Hiring Manager,\n\nI am excited to apply for the Frontend Developer position...',
        current_title: 'Senior Frontend Developer at TechCorp',
        candidate_name: 'John Doe',
        candidate_image: 'https://randomuser.me/api/portraits/men/32.jpg',
        skills: ['React', 'TypeScript', 'JavaScript', 'Redux', 'HTML5', 'CSS3', 'GraphQL'],
        applicant_profile: {
            profile_id: 'p1q2r3s4-t5u6-7890-v1w2-x3y4z5a6b7c8',
            user_id: 'u1v2w3x4-y5z6-7890-a1b2-c3d4e5f6g7h8',
            first_name: 'John',
            last_name: 'Doe',
            date_of_birth: '1990-07-15',
            gender: 'male',
            contact_email: 'john.doe@example.com',
            phone: '+1 (555) 123-4567',
            address: '123 Main Street',
            city: 'San Francisco',
            state: 'California',
            country: 'United States',
            postal_code: '94105',
            headline: 'Senior Frontend Developer with 5+ years of React experience',
            summary: 'Passionate frontend developer with expertise in building responsive and accessible web applications. Specialized in React ecosystem with experience in mentoring junior developers and leading frontend architecture decisions.',
            is_profile_complete: true,
            is_public: true,
            created_at: '2021-03-10T08:15:30Z',
            updated_at: '2023-05-01T14:20:45Z'
        },
        education: [
            {
                education_id: 'e1f2g3h4-i5j6-7890-k1l2-m3n4o5p6q7r8',
                institution: 'Stanford University',
                degree: 'Bachelor of Science',
                field_of_study: 'Computer Science',
                start_date: '2008-09-01',
                end_date: '2012-06-15',
                grade: '3.8 GPA',
                activities: 'Computer Science Club, Hackathon Team',
                description: 'Specialized in Human-Computer Interaction and Web Technologies',
                is_current: false,
                created_at: '2021-03-10T08:15:30Z',
                updated_at: '2021-03-10T08:15:30Z'
            }
        ],
        experience: [
            {
                experience_id: 'x1y2z3a4-b5c6-7890-d1e2-f3g4h5i6j7k8',
                company: 'TechCorp',
                title: 'Senior Frontend Developer',
                location: 'San Francisco, CA',
                start_date: '2020-01-15',
                end_date: null,
                is_current: true,
                description: 'Lead developer for the customer dashboard project using React and TypeScript. Mentored junior developers and established frontend best practices.',
                created_at: '2021-03-10T08:15:30Z',
                updated_at: '2023-05-01T14:20:45Z'
            },
            {
                experience_id: 'l1m2n3o4-p5q6-7890-r1s2-t3u4v5w6x7y8',
                company: 'WebSolutions Inc.',
                title: 'Frontend Developer',
                location: 'San Jose, CA',
                start_date: '2017-06-01',
                end_date: '2019-12-20',
                is_current: false,
                description: 'Developed and maintained multiple client-facing applications using React. Collaborated with UX designers to implement responsive interfaces.',
                created_at: '2021-03-10T08:15:30Z',
                updated_at: '2021-03-10T08:15:30Z'
            }
        ],
        applicant_skills: [
            {
                skill_id: 's1t2u3v4-w5x6-7890-y1z2-a3b4c5d6e7f8',
                name: 'React',
                category: 'Frontend',
                proficiency_level: 'Expert',
                is_verified: true,
                endorsement_count: 12,
                created_at: '2021-03-10T08:15:30Z'
            },
            {
                skill_id: 'g1h2i3j4-k5l6-7890-m1n2-o3p4q5r6s7t8',
                name: 'TypeScript',
                category: 'Frontend',
                proficiency_level: 'Advanced',
                is_verified: true,
                endorsement_count: 8,
                created_at: '2021-05-15T10:30:45Z'
            },
            {
                skill_id: 'u1v2w3x4-y5z6-7890-a1b2-c3d4e5f6g7h8',
                name: 'JavaScript',
                category: 'Frontend',
                proficiency_level: 'Expert',
                is_verified: true,
                endorsement_count: 15,
                created_at: '2021-03-10T08:15:30Z'
            }
        ]
    };

    // Usage in your component:
    const [application, setApplication] = useState(dummyApplication);

    // const [application, setApplication] = useState(null);
    const [applicantProfile, setApplicantProfile] = useState(dummyApplication);
    const [education, setEducation] = useState([]);
    const [experience, setExperience] = useState([]);
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('profile');
    const navigate = useNavigate();

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             setLoading(true);

    //             // Fetch application details
    //             const appResponse = await fetch(`/api/applications/${applicationId}`);
    //             const appData = await appResponse.json();
    //             setApplication(appData);

    //             // Fetch applicant profile
    //             const profileResponse = await fetch(`/api/applicant-profiles/${appData.profile_id}`);
    //             const profileData = await profileResponse.json();
    //             setApplicantProfile(profileData);

    //             // Fetch education
    //             const eduResponse = await fetch(`/api/education?profile_id=${appData.profile_id}`);
    //             const eduData = await eduResponse.json();
    //             setEducation(eduData);

    //             // Fetch experience
    //             const expResponse = await fetch(`/api/experience?profile_id=${appData.profile_id}`);
    //             const expData = await expResponse.json();
    //             setExperience(expData);

    //             // Fetch skills
    //             const skillsResponse = await fetch(`/api/applicant-skills?profile_id=${appData.profile_id}`);
    //             const skillsData = await skillsResponse.json();
    //             setSkills(skillsData);

    //             setLoading(false);
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //             setLoading(false);
    //         }
    //     };

    //     fetchData();
    // }, [applicationId]);

    const updateApplicationStatus = async (newStatus) => {
        // try {
        //     const response = await fetch(`/api/applications/${applicationId}`, {
        //         method: 'PATCH',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({ status: newStatus }),
        //     });

        //     if (response.ok) {
        //         setApplication({ ...application, status: newStatus });
        //     }
        // } catch (error) {
        //     console.error('Error updating status:', error);
        // }
    };

    // if (loading) {
    //     return (
    //         <div className="flex justify-center items-center h-64">
    //             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    //         </div>
    //     );
    // }

    if (!application || !applicantProfile) {
        return <div className="p-4 text-center text-gray-500">Application not found</div>;
    }

    const getStatusBadge = (status) => {
        const statusMap = {
            new: { color: 'bg-blue-100 text-blue-800', text: 'New' },
            review: { color: 'bg-purple-100 text-purple-800', text: 'In Review' },
            interview: { color: 'bg-green-100 text-green-800', text: 'Interview' },
            rejected: { color: 'bg-red-100 text-red-800', text: 'Rejected' },
            hired: { color: 'bg-emerald-100 text-emerald-800', text: 'Hired' }
        };

        return (
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${statusMap[status]?.color || 'bg-gray-100 text-gray-800'}`}>
                {statusMap[status]?.text || status}
            </span>
        );
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
                <Link to={`/jobs/${jobId}/applications`} className="text-blue-600 hover:text-blue-800 flex items-center">
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to applications
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 h-16 w-16">
                                <img
                                    className="h-16 w-16 rounded-full"
                                    src={applicantProfile.profile_image || 'https://via.placeholder.com/64'}
                                    alt={applicantProfile.first_name}
                                />
                            </div>
                            <div className="ml-4">
                                <h2 className="text-xl font-bold text-gray-900">
                                    {applicantProfile.first_name} {applicantProfile.last_name}
                                </h2>
                                <p className="text-gray-600">{application.current_title}</p>
                                <p className="text-sm text-gray-500 mt-1">
                                    Applied on {format(new Date(application.applied_at), 'MMMM d, yyyy')}
                                </p>
                            </div>
                        </div>
                        <div className="mt-4 md:mt-0 flex items-center space-x-4">
                            <div>
                                <label htmlFor="status" className="sr-only">Status</label>
                                <select
                                    id="status"
                                    value={application.status}
                                    onChange={(e) => updateApplicationStatus(e.target.value)}
                                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                >
                                    <option value="new">New</option>
                                    <option value="review">In Review</option>
                                    <option value="interview">Interview</option>
                                    <option value="hired">Hired</option>
                                    <option value="rejected">Rejected</option>
                                </select>
                            </div>
                            <div className="hidden md:block">
                                {getStatusBadge(application.status)}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex">
                        <button
                            onClick={() => setActiveTab('profile')}
                            className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${activeTab === 'profile' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                        >
                            Profile
                        </button>
                        <button
                            onClick={() => setActiveTab('resume')}
                            className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${activeTab === 'resume' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                        >
                            Resume
                        </button>
                        <button
                            onClick={() => setActiveTab('experience')}
                            className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${activeTab === 'experience' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                        >
                            Experience
                        </button>
                        <button
                            onClick={() => setActiveTab('education')}
                            className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${activeTab === 'education' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                        >
                            Education
                        </button>
                        <button
                            onClick={() => setActiveTab('skills')}
                            className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${activeTab === 'skills' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                        >
                            Skills
                        </button>
                    </nav>
                </div>

                <div className="p-6">
                    {activeTab === 'profile' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Full Name</p>
                                        <p className="mt-1 text-sm text-gray-900">
                                            {applicantProfile.first_name} {applicantProfile.last_name}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Email</p>
                                        <p className="mt-1 text-sm text-gray-900">
                                            <a href={`mailto:${applicantProfile.contact_email}`} className="text-blue-600 hover:text-blue-800">
                                                {applicantProfile.contact_email}
                                            </a>
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Phone</p>
                                        <p className="mt-1 text-sm text-gray-900">
                                            {applicantProfile.phone || 'Not provided'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Location</p>
                                        <p className="mt-1 text-sm text-gray-900">
                                            {[applicantProfile.city, applicantProfile.state, applicantProfile.country].filter(Boolean).join(', ') || 'Not provided'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Date of Birth</p>
                                        <p className="mt-1 text-sm text-gray-900">
                                            {applicantProfile.date_of_birth ? format(new Date(applicantProfile.date_of_birth), 'MMMM d, yyyy') : 'Not provided'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Professional Summary</h3>
                                {applicantProfile.summary ? (
                                    <p className="text-sm text-gray-700 whitespace-pre-line">{applicantProfile.summary}</p>
                                ) : (
                                    <p className="text-sm text-gray-500">No summary provided</p>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'resume' && (
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Resume</h3>
                            {application.resume_url ? (
                                <div className="border border-gray-200 rounded-lg p-4">
                                    <iframe
                                        src={`https://docs.google.com/gview?url=${encodeURIComponent(application.resume_url)}&embedded=true`}
                                        className="w-full h-96"
                                        frameBorder="0"
                                    ></iframe>
                                    <div className="mt-4">
                                        <a
                                            href={application.resume_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        >
                                            Download Resume
                                        </a>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500">No resume uploaded</p>
                            )}
                        </div>
                    )}

                    {activeTab === 'experience' && (
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Work Experience</h3>
                            {experience.length > 0 ? (
                                <div className="space-y-6">
                                    {experience.map((exp) => (
                                        <div key={exp.experience_id} className="border-l-4 border-blue-200 pl-4 py-2">
                                            <div className="flex justify-between">
                                                <h4 className="text-md font-medium text-gray-900">{exp.title}</h4>
                                                <p className="text-sm text-gray-500">
                                                    {format(new Date(exp.start_date), 'MMM yyyy')} - {exp.is_current ? 'Present' : format(new Date(exp.end_date), 'MMM yyyy')}
                                                </p>
                                            </div>
                                            <p className="text-sm font-medium text-gray-600">{exp.company}</p>
                                            {exp.location && (
                                                <p className="text-sm text-gray-500">{exp.location}</p>
                                            )}
                                            {exp.description && (
                                                <p className="mt-2 text-sm text-gray-700 whitespace-pre-line">{exp.description}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500">No work experience provided</p>
                            )}
                        </div>
                    )}

                    {activeTab === 'education' && (
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Education</h3>
                            {education.length > 0 ? (
                                <div className="space-y-6">
                                    {education.map((edu) => (
                                        <div key={edu.education_id} className="border-l-4 border-blue-200 pl-4 py-2">
                                            <div className="flex justify-between">
                                                <h4 className="text-md font-medium text-gray-900">{edu.degree} in {edu.field_of_study}</h4>
                                                <p className="text-sm text-gray-500">
                                                    {format(new Date(edu.start_date), 'MMM yyyy')} - {edu.is_current ? 'Present' : format(new Date(edu.end_date), 'MMM yyyy')}
                                                </p>
                                            </div>
                                            <p className="text-sm font-medium text-gray-600">{edu.institution}</p>
                                            {edu.grade && (
                                                <p className="text-sm text-gray-500">Grade: {edu.grade}</p>
                                            )}
                                            {edu.description && (
                                                <p className="mt-2 text-sm text-gray-700 whitespace-pre-line">{edu.description}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500">No education information provided</p>
                            )}
                        </div>
                    )}

                    {activeTab === 'skills' && (
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Skills</h3>
                            {skills.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {skills.map((skill) => (
                                        <div key={skill.skill_id} className="bg-white border border-gray-200 rounded-full px-3 py-1 shadow-sm">
                                            <div className="flex items-center">
                                                <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                                                {skill.proficiency_level && (
                                                    <span className="ml-2 text-xs text-gray-500">({skill.proficiency_level})</span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500">No skills listed</p>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex justify-end space-x-3">
                <button
                    onClick={() => navigate(`/jobs/${jobId}/applications`)}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Back to List
                </button>
                <button
                    onClick={() => updateApplicationStatus('rejected')}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                    Reject Application
                </button>
                <button
                    onClick={() => updateApplicationStatus('hired')}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                    Hire Candidate
                </button>
            </div>
        </div>
    );
};

export default ApplicationDetail;