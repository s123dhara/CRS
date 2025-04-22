// React Packages 
import { Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
// React Packages 

//Layout 
import { AdminLayout, MainLayout } from '../layout';
import AuthLayout from '../layout/Admin/Auth/AdminAuthLayout';
//Layout 

// Middleware
import ProtectedAdminRoute from './Admin/ProtectedAdminRoutes';

// Components 
import { SignIn } from '../pages/Admin/AuthPages/SignIn';
import SignupForm from '../components/Admin/Auth/SignupForm';
import AdminLogin from '../components/Admin/Auth/AdminLogin';
import TwoFactorAuthFlow from '../components/Admin/Auth/TwofaAuth';


//Pages 
import Home from '../pages/Home';
import AdminDashboard from '../pages/Admin/Dashboard/AdminDashboard';
//Pages 

//extra
// import Settings from '../pages/Admin/Settings';
import LoadingSpinner from '../components/ui/Spinner/LoadingSpinner';


export default function AppRoutes() {
    const { isAuthenticated, loading, isPartiallyAuthenticated } = useAuth(); 
    const [showLoading, setShowLoading] = useState(true);
    // Add a minimum display time for the loading spinner
    useEffect(() => {
        let timer;
        if (!loading) {
            // Set a minimum 500ms display time for the loading spinner
            timer = setTimeout(() => {
                setShowLoading(false);
            }, 800); // Adjust this value as needed (500ms is usually a good balance)
        } else {
            setShowLoading(true);
        }
        return () => clearTimeout(timer);
    }, [loading]);
    if (showLoading) {
        return <LoadingSpinner />;
    }

    return (
        <>
            <Routes>
                {/* Unauthorized Routes */}
                {!isAuthenticated && (
                    <>
                        {/* <Route path='/dashboard' element={<Dashboard />} /> */}

                        <Route element={<AuthLayout />}>
                            <Route path="/login" element={<SignIn />} />
                            <Route path="/register" element={<SignupForm />} />


                            <Route path='admin'>
                                <Route path="login" element={<AdminLogin />} />
                            </Route>
                        </Route>

                        {isPartiallyAuthenticated && (
                            <Route path='admin'>
                                <Route path="2fa-auth" element={<TwoFactorAuthFlow />} />
                            </Route>
                        )}
                    </>
                )}
                {/* Public Routes */}
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                </Route>

                {/* Protected Routes */}
                <Route element={<ProtectedAdminRoute />}>
                    {/* Redirect if user tries to access login/register when already logged in */}
                    <Route path="/login" element={<Navigate to="/admin-dashboard" />} />
                    <Route path="/register" element={<Navigate to="/admin-dashboard" />} />

                    {/* Admin Layout and Nested Admin Dashboard */}                   
                    <Route element={<AdminLayout />}>
                        <Route path="/admin-dashboard" element={<AdminDashboard />} />
                        <Route path="admin">
                            {/* <Route path="settings" element={<Settings />} /> */}
                        </Route>
                    </Route>
                </Route>

                {/* Catch-all route */}
                <Route
                    path="*"
                    element={
                        <Navigate to={isAuthenticated ? "/admin-dashboard" : "/login"} />
                    }
                />

            </Routes>
        </>

    );
}