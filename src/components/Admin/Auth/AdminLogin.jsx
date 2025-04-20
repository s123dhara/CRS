import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";

export default function AdminLogin() {
    const navigate = useNavigate();
    const { login, loggedUser, accessToken } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const validateEmail = (value) => {
        if (!value) {
            setEmailError('Email is required');
        } else if (!/^\S+@\S+\.\S+$/.test(value)) {
            setEmailError('Invalid email format');
        } else {
            setEmailError('');
        }
    };

    const validatePassword = (value) => {
        if (!value) {
            setPasswordError('Password is required');
        } else {
            setPasswordError('');
        }
    };


    const handleLogin = async (e) => {
        e.preventDefault();
        let hasError = false;

        if (!email) {
            setEmailError('Email is required');
            hasError = true;
        }

        if (!password) {
            setPasswordError('Password is required');
            hasError = true;
        }

        // Add more validations if needed
        if (hasError) {
            return; // Stop submission if any error
        }

        console.log({ email, password })
        const response = await login({ email, password });

        if (response.status) {
            toast.success(response.data.message);
            navigate('/admin-dashboard', { replace: true });
        } else {
            toast.error(response.data.message);
            navigate('/login', { replace: true });
        }
        console.log({ email, password, rememberMe });
    };

    return (
        <div className="w-full md:w-3/5 flex items-center justify-center p-10">
            <div className="w-full max-w-md bg-white/80 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-lg p-8 space-y-6">
                <h2 className="text-3xl font-bold text-center text-gray-800">Admin Panel</h2>
                <p className="text-sm text-gray-500 text-center">Sign in to your admin account</p>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={
                                (e) => {
                                    const value = e.target.value;
                                    setEmail(value)
                                    validateEmail(value)
                                }
                            }
                            className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition"
                            placeholder="admin@example.com"                            
                        />
                    </div>
                    {emailError && <p className="text-sm text-red-600 mt-1">{emailError}</p>}

                    <div className="relative">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={
                                (e) => {
                                    const value = e.target.value;
                                    setPassword(value)
                                    validatePassword(value)
                                }
                            }
                            className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition"
                            placeholder="••••••••"                            
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-10 text-gray-400 hover:text-gray-600"
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </button>
                    </div>
                    {passwordError && <p className="text-sm text-red-600 mt-1">{passwordError}</p>}

                    <button
                        type="submit"
                        className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200"
                    >
                        Login
                    </button>
                </form>

                {/* <p className="text-center text-sm text-gray-500">
                    Forgot password? <a href="#" className="text-indigo-600 hover:underline">Reset here</a>
                </p> */}
            </div>
        </div>
    );
}
