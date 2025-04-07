import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gray-100">
            {/* Left side with illustration or text */}
            <div className="hidden md:flex flex-col items-center justify-center bg-blue-600 text-white p-10">
                <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
                <p className="text-lg text-center">
                    Login or Sign up to continue exploring the platform.
                </p>
                <img
                    src="https://source.unsplash.com/600x400/?technology,abstract"
                    alt="Illustration"
                    className="mt-10 rounded-lg shadow-xl"
                />
            </div>

            {/* Right side where forms (login/signup) render */}
            <div className="flex items-center justify-center p-6">
                <Outlet />
            </div>
        </div>
    );
}
