import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

// Dummy profile data (replace with real API call)
const dummyProfile = {
    first_name: "Aditi",
    last_name: "Sen",
    contact_email: "aditi.sen@example.com",
    phone: "1234567890",
    headline: "React Developer | UI/UX Enthusiast",
    summary:
        "Passionate frontend developer with 3 years of experience building modern web apps with React, Tailwind, and Next.js.",
    city: "Bangalore",
    state: "Karnataka",
    country: "India",
    education: [
        {
            institution: "IIT Delhi",
            degree: "B.Tech",
            field_of_study: "Computer Science",
            start_date: "2018-08-01",
            end_date: "2022-06-30",
        },
    ],
    experience: [
        {
            company: "TechCorp",
            title: "Frontend Developer",
            location: "Bangalore",
            start_date: "2022-07-01",
            end_date: null,
            is_current: true,
            description: "Working on scalable UI components and improving performance.",
        },
    ],
    skills: [
        { name: "React", proficiency_level: "Advanced" },
        { name: "Tailwind CSS", proficiency_level: "Intermediate" },
        { name: "JavaScript", proficiency_level: "Advanced" },
    ],
};

const ApplicantProfileDetails = () => {
    const { profile_id } = useParams();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        // Replace with real API fetch
        setProfile(dummyProfile);
    }, [profile_id]);

    if (!profile) {
        return (
            <div className="text-center mt-20 text-gray-500 text-lg">
                Loading profile...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-violet-50 p-8">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6 space-y-6">
                <div className="flex justify-between items-center border-b pb-4">
                    <h1 className="text-2xl font-bold text-violet-700">
                        {profile.first_name} {profile.last_name}
                    </h1>
                    <Link
                        to="/applications"
                        className="text-sm text-violet-600 hover:underline"
                    >
                        ← Back to Applications
                    </Link>
                </div>

                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Contact</h2>
                    <div className="text-gray-700">
                        <p>Email: {profile.contact_email}</p>
                        <p>Phone: {profile.phone}</p>
                        <p>
                            Location: {profile.city}, {profile.state}, {profile.country}
                        </p>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Headline</h2>
                    <p className="text-gray-700 italic">{profile.headline}</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Summary</h2>
                    <p className="text-gray-700">{profile.summary}</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Education</h2>
                    <ul className="space-y-2">
                        {profile.education.map((edu, idx) => (
                            <li key={idx} className="text-gray-700">
                                <strong>{edu.institution}</strong> - {edu.degree} in{" "}
                                {edu.field_of_study} (
                                {new Date(edu.start_date).getFullYear()} -{" "}
                                {edu.end_date ? new Date(edu.end_date).getFullYear() : "Present"})
                            </li>
                        ))}
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Experience</h2>
                    <ul className="space-y-2">
                        {profile.experience.map((exp, idx) => (
                            <li key={idx} className="text-gray-700">
                                <strong>{exp.title}</strong> at {exp.company} ({exp.location})<br />
                                {new Date(exp.start_date).toLocaleDateString()} -{" "}
                                {exp.end_date
                                    ? new Date(exp.end_date).toLocaleDateString()
                                    : "Present"}
                                <br />
                                <span className="text-sm">{exp.description}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Skills</h2>
                    <ul className="flex flex-wrap gap-3">
                        {profile.skills.map((skill, idx) => (
                            <li
                                key={idx}
                                className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm"
                            >
                                {skill.name} ({skill.proficiency_level})
                            </li>
                        ))}
                    </ul>
                </section>

                <div className="flex justify-end gap-4 pt-6 border-t">
                    <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
                        Accept
                    </button>
                    <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">
                        Reject
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ApplicantProfileDetails;
