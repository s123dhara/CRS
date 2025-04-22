import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


import { useAuth } from '../../../context/AuthContext'


export default function LoginForm() {
    const navigate = useNavigate();
    const { login, loggedUser, accessToken, isPartiallyAuthenticated } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

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

        if(response.status && response.requiresTwoFactor) {
            toast.success('Choose any authentication service to logged in');
            navigate('/admin/2fa-auth');
            return;
        }


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
        <>
            <div className="w-full md:w-3/5 py-8 px-8 md:px-12">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-extrabold text-gray-800">Sign In</h1>
                    <p className="text-gray-500 mt-2">Welcome back! Please enter your details</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    {/* Email input */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700" htmlFor="email">
                            Email
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                </svg>
                            </div>
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
                                className="pl-10 w-full pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-colors"
                                placeholder="Enter your email"
                            />
                        </div>
                        {emailError && <p className="text-sm text-red-600 mt-1">{emailError}</p>}
                    </div>

                    {/* Password input */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700" htmlFor="password">
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
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
                                className="pl-10 w-full pr-12 py-3 border border-gray-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-colors"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? (
                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                    </svg>
                                ) : (
                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                        {passwordError && <p className="text-sm text-red-600 mt-1">{passwordError}</p>}
                    </div>

                    {/* Options */}
                    <div className="flex items-center justify-between float-end">
                        {/* <div className="flex items-center">
                            <input
                                id="remember-me"
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
                                Remember me
                            </label>
                        </div> */}
                        <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
                            Forgot password?
                        </a>
                    </div>

                    {/* Submit button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
                        >
                            Sign in
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    {/* Social login */}
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                            </svg>
                            Google
                        </button>
                        <button
                            type="button"
                            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" />
                            </svg>
                            Facebook
                        </button>
                    </div>

                    {/* Sign up link */}
                    <p className="mt-6 text-center text-sm text-gray-600">
                        Don't have an account?{" "}
                        <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Sign up for free
                        </Link>
                    </p>
                </form>
            </div>
        </>
    );
}