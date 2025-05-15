import React from 'react'
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import BACKEND_API from '../../../services/userApi';
import { toast } from 'react-toastify';


const SignupForm = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setconfirmPasswordError] = useState('');


    const validateEmail = (value) => {
        if (!value) {
            setEmailError('Email is required');
        } else if (!/^\S+@\S+\.\S+$/.test(value)) {
            setEmailError('Invalid email format');
        }
        else {
            setEmailError('');
        }
    };

    const validatePassword = (value) => {
        if (!value) {
            setPasswordError('Password is required');
        }
        else if (value.length < 6) {
            setPasswordError('Password must be at least 6 characters');
        }
        else {
            setPasswordError('');
        }
    };

    const validateConfirmPassword = (value) => {
        if (!value) {
            setconfirmPasswordError('Confrim Password is required');
        }
        else if (value.length < 6) {
            setconfirmPasswordError('Confrim Password must be at least 6 characters');
        }
        else {
            setconfirmPasswordError('');
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        console.log({ email, password });
        let hasError = false;

        if (!email) {
            setEmailError('Email is required');
            hasError = true;
        }

        if (!password) {
            setPasswordError('Password is required');
            hasError = true;
        }

        if (!confirmPassword) {
            setconfirmPasswordError('Confirm Password is required');
            hasError = true;
        }

        if (password != confirmPassword) {
            setPasswordError('Incorrect Password');
            hasError = true;
        }

        // Add more validations if needed
        if (hasError) {
            return; // Stop submission if any error
        }


        const result = await BACKEND_API.userSignup({email, password});
        if (result.status) {
            toast.success(result.message);
            navigate('/login');
        } else {
            toast.error(result.message);            
        }



    };


    return (
        <div className="w-full md:w-3/5 py-8 px-8 md:px-12">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-extrabold text-gray-800">Sign Up</h1>
                <p className="text-gray-500 mt-2">Create your admin account</p>
            </div>

            <form onSubmit={handleSignup} className="space-y-6">
                {/* Email */}
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={
                            (e) => {
                                setEmail(e.target.value)
                                validateEmail(e.target.value)
                            }
                        }
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-colors"
                        placeholder="Enter your email"
                    />
                    {emailError && <p className="text-sm text-red-600 mt-1">{emailError}</p>}
                </div>

                {/* Password */}
                <div className="space-y-2 relative">
                    <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onPaste={(e) => e.preventDefault()}
                        onChange={
                            (e) => {
                                setPassword(e.target.value)
                                validatePassword(e.target.value)
                            }
                        }
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-colors"
                        placeholder="Create a password"
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-10 text-gray-400 hover:text-gray-600"
                    >
                        {showPassword ? "🙈" : "👁️"}
                    </button>
                    {passwordError && <p className="text-sm text-red-600 mt-1">{passwordError}</p>}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirm Password</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onPaste={(e) => e.preventDefault()}
                        onChange={
                            (e) => {
                                setConfirmPassword(e.target.value)
                                validateConfirmPassword(e.target.value);
                            }
                        }
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-colors"
                        placeholder="Confirm your password"
                    />
                    {confirmPasswordError && <p className="text-sm text-red-600 mt-1">{confirmPasswordError}</p>}
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
                    >
                        Sign up
                    </button>
                </div>

                {/* Already have an account */}
                <p className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link to="/admin/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Sign in
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default SignupForm