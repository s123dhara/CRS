import { Outlet } from "react-router-dom";
import { useState } from "react";

export default function AuthLayout() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500 p-4">
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Left decorative sidebar - adjusted width to 2/5 */}
                <div className="md:flex">
                    <div className="hidden md:block md:w-2/5 bg-indigo-600 py-10 px-6">
                        <div className="h-full flex flex-col justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-6">Welcome</h2>
                                <p className="text-indigo-200 mb-8">Access your account and manage your tasks securely</p>
                            </div>
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="h-2 rounded bg-indigo-400 bg-opacity-30"></div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Form container - adjusted width to 3/5 */}
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
