import React, { useState } from 'react';
import { Await, Link } from 'react-router-dom';
import Navbar from '../../public/Home/Navbar';
import BACKEND_API from '../../../services/api';
import { toast } from 'react-toastify';


const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // Replace with your actual API call
            // await api.sendPasswordResetEmail(email);
            const result = await BACKEND_API.adminForgotPassword(email);
            if (result.status) {
                await new Promise(resolve => setTimeout(resolve, 1500));
                setIsSubmitted(true);
            } else {
                toast.error('Wrong Credentials');
                setIsSubmitted(false);
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="bg-gradient-to-r from-violet-600 to-violet-500 py-6 px-6">
                        <div className="flex justify-center">
                            <svg className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                            </svg>
                        </div>
                        <h2 className="mt-4 text-center text-2xl font-bold text-white">
                            Forgot your password?
                        </h2>
                        <p className="mt-2 text-center text-blue-100">
                            No worries, we'll send you reset instructions.
                        </p>
                    </div>

                    <div className="py-8 px-6">
                        {!isSubmitted ? (
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                {error && (
                                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                                        <p className="text-sm text-red-700">{error}</p>
                                    </div>
                                )}

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email address
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                            </svg>
                                        </div>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="pl-10 py-3 block w-full focus:ring-violet-500 focus:border-violet-500 border-gray-300 rounded-md"
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className={`group relative w-full flex justify-center py-3 px-4 rounded-md text-white ${isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                            }`}
                                    >
                                        {isLoading ? (
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        ) : null}
                                        {isLoading ? 'Sending...' : 'Reset Password'}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="text-center">
                                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                                    <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="mt-3 text-lg font-medium text-gray-900">Check your email</h3>
                                <p className="mt-2 text-sm text-gray-500">
                                    We've sent a password reset link to<br />
                                    <span className="font-medium text-gray-900">{email}</span>
                                </p>
                                <div className="mt-6">
                                    <a
                                        href="#"
                                        onClick={() => setIsSubmitted(false)}
                                        className="text-sm font-medium text-violet-600 hover:text-violet-500"
                                    >
                                        Didn't receive the email? Try again
                                    </a>
                                </div>
                            </div>
                        )}

                        <div className="mt-6 text-center">
                            <Link to="/login" className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                </svg>
                                Back to login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;