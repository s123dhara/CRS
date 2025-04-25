import { useState } from 'react';
import { Eye, EyeOff, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import BACKEND_API from '../../../services/userApi';
import { toast } from 'react-toastify';


export default function UserAddPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'APPLICANT',
        status: 'ACTIVE'
    });

    const [formErrors, setFormErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState(null);

    const roles = ['APPLICANT', 'ADMIN', 'AGENCY', 'RECRUITER'];
    const statuses = ['ACTIVE', 'INACTIVE', 'SUSPENDED', 'PENDING_VERIFICATION'];

    const validateForm = () => {
        const errors = {};

        if (!formData.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Email is invalid";
        }

        if (!formData.password) {
            errors.password = "Password is required";
        } else if (formData.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }

        return errors;
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage(null);

        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            setIsSubmitting(false);
            return;
        }

        setFormErrors({});

        try {
            const result = await BACKEND_API.usersAdd(formData);

            if (result.status) {
                // Wait 500ms before showing message
                setTimeout(() => {
                    toast.success(result.data.message);
                    setMessage({ type: 'success', text: result.data.message });

                    // Hide the message after 3 seconds
                    setTimeout(() => {
                        setMessage(null);
                    }, 5000);

                    setIsSubmitting(false);
                    // Optionally reset the form:
                    setFormData({ email: '', password: '', role: 'APPLICANT', status: 'ACTIVE' });
                }, 500);
            } else {
                setIsSubmitting(false);
                toast.error(result.data.message);
                setMessage({ type: 'error', text: result.data.message });

                setTimeout(() => {
                    setMessage(null);
                }, 5000);
            }
        } catch (error) {
            console.error(error);
            setIsSubmitting(false);
            toast.error("Something went wrong");
            setMessage({ type: 'error', text: 'Something went wrong' });

            setTimeout(() => {
                setMessage(null);
            }, 3000);
        }
    };


    const toggleShowPassword = () => {
        setShowPassword(prev => !prev);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
            <div className="w-full">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="bg-violet-500 px-6 py-4 flex items-center gap-3">
                        <UserPlus className="text-white" size={24} />
                        <h2 className="text-xl font-bold text-white">Add New User</h2>
                    </div>

                    <div className="p-6">
                        {message && (
                            <div className={`mb-4 p-3 rounded-md ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {message.text}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-12 gap-6 space-y-4">
                                {/* Email Field */}
                                <div className="col-span-12 md:col-span-6">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email Address
                                    </label>
                                    <input
                                        type="text"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                                        placeholder="user@example.com"
                                    />
                                    {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
                                </div>

                                {/* Password Field */}
                                <div className="col-span-12 md:col-span-6">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                                            placeholder="Enter password"
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700"
                                            onClick={toggleShowPassword}
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                    {formErrors.password && <p className="text-red-500 text-sm">{formErrors.password}</p>}
                                </div>

                                {/* Role Selection */}
                                <div className="col-span-12 md:col-span-6">
                                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                                        Role
                                    </label>
                                    <select
                                        id="role"
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                                        required
                                    >
                                        {roles.map(role => (
                                            <option key={role} value={role}>
                                                {role.charAt(0) + role.slice(1).toLowerCase().replace('_', ' ')}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Status Selection */}
                                <div className="col-span-12 md:col-span-6">
                                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                                        Status
                                    </label>
                                    <select
                                        id="status"
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                                        required
                                    >
                                        {statuses.map(status => (
                                            <option key={status} value={status}>
                                                {status.charAt(0) + status.slice(1).toLowerCase().replace('_', ' ')}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Buttons - Right-aligned */}
                                <div className="col-span-12 flex justify-end mt-4">
                                    <div className="flex space-x-2">
                                        <Link
                                            to="/admin/users"
                                            className="cursor-pointer bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors "
                                        >
                                            Cancel
                                        </Link>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className={`cursor-pointer bg-violet-500 text-white font-medium py-2 px-4 rounded-md hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 transition-colors
                        ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                                        >
                                            {isSubmitting ? 'Adding User...' : 'Add User'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}