import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BACKEND_API from "../../../services/recruiterApi";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";
const EditCompanyForm = () => {
    const { loggedUser } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        industry: "",
        website: "",
        // logo_url: "",
        employee_count_range: "",
        headquarters: "",
        founded_year: "",
    });


    useEffect(() => {
        if (loggedUser) {
            fetchCompanyData();
        }
    }, [loggedUser]);

    const fetchCompanyData = async () => {
        let { status, message, profile } = await BACKEND_API.getCompanyProfile(loggedUser);
        if (status && profile) {
            setFormData(profile);
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting:", formData);

        try {
            const { status, message } = await BACKEND_API.updateCompanyProfile(formData);
            if (status) {
                setFormData({
                    name: "",
                    description: "",
                    industry: "",
                    website: "",
                    // logo_url: "",
                    employee_count_range: "",
                    headquarters: "",
                    founded_year: "",
                });
                navigate('/employee-dashboard');
                toast.success(message);
            } else {
                toast.error(message);
            }
        } catch (error) {
            toast.error("Something went Wrong, Please try again later");
        }
    };

    return (
        <div className="min-h-screen bg-violet-500 flex items-center justify-center px-4 py-10">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-3xl">
                <h2 className="text-3xl font-bold text-violet-700 mb-6 text-center">Update Company Registration</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block font-medium text-gray-700">Company Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                        />
                    </div>

                    <div>
                        <label className="block font-medium text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="3"
                            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                        ></textarea>
                    </div>

                    <div>
                        <label className="block font-medium text-gray-700">Industry</label>
                        <input
                            type="text"
                            name="industry"
                            value={formData.industry}
                            onChange={handleChange}
                            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block font-medium text-gray-700">Website</label>
                            <input
                                type="url"
                                name="website"
                                value={formData.website}
                                onChange={handleChange}
                                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                            />
                        </div>

                        {/* <div>
                            <label className="block font-medium text-gray-700">Logo URL</label>
                            <input
                                type="url"
                                name="logo_url"
                                value={formData.logo_url}
                                onChange={handleChange}
                                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                            />
                        </div> */}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block font-medium text-gray-700">Employee Count Range</label>
                            <input
                                type="text"
                                name="employee_count_range"
                                value={formData.employee_count_range}
                                onChange={handleChange}
                                placeholder="e.g., 50-100"
                                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                            />
                        </div>

                        <div>
                            <label className="block font-medium text-gray-700">Headquarters</label>
                            <input
                                type="text"
                                name="headquarters"
                                value={formData.headquarters}
                                onChange={handleChange}
                                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block font-medium text-gray-700">Founded Year</label>
                        <input
                            type="number"
                            name="founded_year"
                            value={formData.founded_year}
                            onChange={handleChange}
                            min="1800"
                            max="2100"
                            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-violet-600 text-white text-lg font-semibold py-3 rounded-lg hover:bg-violet-700 transition"
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditCompanyForm;
