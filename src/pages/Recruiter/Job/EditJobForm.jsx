import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import BACKEND_API from "../../../services/JobApi";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-toastify";

const EditJobForm = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const { loggedUser } = useAuth();
    const [job, setJob] = useState({
        title: "",
        description: "",
        responsibilities: "",
        requirements: "",
        location: "",
        is_remote: false,
        job_type: "",
        experience_level: "",
        education_level: "",
        salary_min: "",
        salary_max: "",
        salary_currency: "USD",
        is_salary_visible: false,
        application_deadline: "",
        application_url: "",
        is_featured: false,
        publish_date: "",
        // skills: [],
        // categories: [],
    });

    useEffect(() => {
        const fetchJob = async () => {
            if (jobId) {
                try {
                    const { status, job } = await BACKEND_API.fetchJobByJobId(jobId);
                    if (status) {
                        setJob(job);
                    } else {
                        toast.error("Failed to fetch the job");
                    }
                } catch (error) {
                    console.error("Error fetching job:", error);
                    toast.error("Something went wrong while fetching the job.");
                }
            }
        };

        fetchJob();
    }, [jobId]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setJob((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting Job:", job);

        try {
            const { status, message } = await BACKEND_API.updateJobByJobId(jobId, job);
            if (status) {
                navigate('/employee/jobs');
                toast.success(message);
            } else {
                toast.error(message);
            }
        } catch (error) {
            toast.error(error.message);
        }

        return;
        // send to API
    };

    return (
        <div className="min-h-screen bg-violet-100 flex items-center justify-center px-4 py-10">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-4xl">
                <h2 className="text-3xl font-bold text-violet-700 mb-6 text-center">
                    Edit Job
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block font-medium text-gray-700">Job Title</label>
                        <input
                            type="text"
                            name="title"
                            value={job.title}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block font-medium text-gray-700">Location</label>
                            <input
                                type="text"
                                name="location"
                                value={job.location}
                                onChange={handleChange}
                                className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                            />
                        </div>

                        <div className="flex items-center gap-2 mt-8 md:mt-0">
                            <input
                                type="checkbox"
                                name="is_remote"
                                checked={job.is_remote}
                                onChange={handleChange}
                                className="w-5 h-5 text-violet-600"
                            />
                            <label className="text-gray-700">Remote</label>
                        </div>
                    </div>

                    <div>
                        <label className="block font-medium text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={job.description}
                            onChange={handleChange}
                            rows={3}
                            className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block font-medium text-gray-700">Responsibilities</label>
                            <textarea
                                name="responsibilities"
                                value={job.responsibilities}
                                onChange={handleChange}
                                rows={3}
                                className="w-full mt-1 p-3 border rounded-lg"
                            ></textarea>
                        </div>
                        <div>
                            <label className="block font-medium text-gray-700">Requirements</label>
                            <textarea
                                name="requirements"
                                value={job.requirements}
                                onChange={handleChange}
                                rows={3}
                                className="w-full mt-1 p-3 border rounded-lg"
                            ></textarea>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block font-medium text-gray-700">Job Type</label>
                            <input
                                type="text"
                                name="job_type"
                                value={job.job_type}
                                onChange={handleChange}
                                placeholder="Full-time, Part-time"
                                className="w-full mt-1 p-3 border rounded-lg"
                            />
                        </div>

                        <div>
                            <label className="block font-medium text-gray-700">Experience Level</label>
                            <input
                                type="text"
                                name="experience_level"
                                value={job.experience_level}
                                onChange={handleChange}
                                placeholder="Junior, Mid, Senior"
                                className="w-full mt-1 p-3 border rounded-lg"
                            />
                        </div>

                        <div>
                            <label className="block font-medium text-gray-700">Education Level</label>
                            <input
                                type="text"
                                name="education_level"
                                value={job.education_level}
                                onChange={handleChange}
                                placeholder="Bachelor’s, Master’s"
                                className="w-full mt-1 p-3 border rounded-lg"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block font-medium text-gray-700">Min Salary</label>
                            <input
                                type="number"
                                name="salary_min"
                                value={job.salary_min}
                                onChange={handleChange}
                                maxLength={10}
                                className="w-full mt-1 p-3 border rounded-lg"
                            />
                        </div>

                        <div>
                            <label className="block font-medium text-gray-700">Max Salary</label>
                            <input
                                type="number"
                                name="salary_max"
                                value={job.salary_max}
                                onChange={handleChange}
                                maxLength={10}
                                className="w-full mt-1 p-3 border rounded-lg"
                            />
                        </div>

                        <div>
                            <label className="block font-medium text-gray-700">Currency</label>
                            <input
                                type="text"
                                name="salary_currency"
                                value={job.salary_currency}
                                onChange={handleChange}
                                maxLength={10}
                                className="w-full mt-1 p-3 border rounded-lg"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <input
                            type="checkbox"
                            name="is_salary_visible"
                            checked={job.is_salary_visible}
                            onChange={handleChange}
                            className="w-5 h-5 text-violet-600"
                        />
                        <label className="text-gray-700">Show Salary on Job Post</label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block font-medium text-gray-700">Application Deadline</label>
                            <input
                                type="date"
                                name="application_deadline"
                                value={job.application_deadline}
                                onChange={handleChange}
                                className="w-full mt-1 p-3 border rounded-lg"
                            />
                        </div>

                        <div>
                            <label className="block font-medium text-gray-700">Application URL</label>
                            <input
                                type="text"
                                name="application_url"
                                value={job.application_url}
                                onChange={handleChange}
                                className="w-full mt-1 p-3 border rounded-lg"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block font-medium text-gray-700">Publish Date</label>
                            <input
                                type="datetime-local"
                                name="publish_date"
                                value={job.publish_date}
                                onChange={handleChange}
                                className="w-full mt-1 p-3 border rounded-lg"
                            />
                        </div>

                        <div className="flex items-center gap-4 mt-8 md:mt-0">
                            <input
                                type="checkbox"
                                name="is_featured"
                                checked={job.is_featured}
                                onChange={handleChange}
                                className="w-5 h-5 text-violet-600"
                            />
                            <label className="text-gray-700">Feature this job</label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-violet-600 text-white font-semibold text-lg py-3 rounded-lg hover:bg-violet-700 transition"
                    >
                        Post Job
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditJobForm;
