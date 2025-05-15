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
import { ForgotPassword } from '../pages/User/AuthPages/ForgotPassword'
import { ResetPassword } from '../pages/User/AuthPages/ResetPassword'
import { Users } from '../pages/Admin/Users';
import UserAddPage from '../pages/Admin/Users/add';
import UserEditPage from '../pages/Admin/Users/edit';


//users 
import { UserLayout } from '../layout/User/UserLayout';
import ProtectedUserRoute from './User/ProtectedUserRoutes';
import UserDashboard from '../pages/User/Dashboard/UserDashboard';
import ApplicantProfileForm from '../pages/User/ApplicationForm';
import JobCards from '../pages/User/Job/ApplyDrive';
import CampusFeedbackForm from '../pages/User/feedback/FeedBackFrom';
import ContactPlacementOfficer from '../pages/User/contact/ContactPlacementOfficer';
import { ReportAndBugs } from '../pages/User/Report/ReportAndBugs';
import ApplicationStatus from '../pages/User/Job/ApplicationStatus';
import UpcomingInterviews from '../pages/User/interviews/UpcomingInterviews';
import InterviewHistory from '../pages/User/interviews/InterviewHistory';


//Employee 
import { EmployeeLayout } from '../layout/Recruiter/EmployeeLayout';
import EmployeeDashboard from '../pages/Recruiter/Dashboard/EmployeeDashboard';
import CompanyForm from '../pages/Recruiter/Company-Profile/CompanyForm';
import JobForm from '../pages/Recruiter/Job/JobForm';
import EditJobForm from '../pages/Recruiter/Job/EditJobForm';
import JobList from '../pages/Recruiter/Job/JobList';
import JobApplicationsList from '../pages/Recruiter/Applications/JobApplicationsList';
import ApplicantProfileDetails from '../pages/Recruiter/Applications/ApplicantProfileDetails';

import JobApplicationsListing from '../pages/Recruiter/Applications/JobApplicationsListing';


//Pages 
import Home from '../pages/Home';
import AdminDashboard from '../pages/Admin/Dashboard/AdminDashboard';
import { Settings } from '../pages/Admin/Settings/Settings';
//Pages 

//extra
// import Settings from '../pages/Admin/Settings';
import LoadingSpinner from '../components/ui/Spinner/LoadingSpinner';
import ApplicationDetail from '../pages/Recruiter/Applications/ApplicationDetail';
import ActiveJobListing from '../pages/Recruiter/Applications/ActiveJobListing';
import InterviewManagement from '../pages/Recruiter/Interview/InterviewManagement';
import SelectedCandidates from '../pages/Recruiter/Interview/SelectedCandidates';
import CandidateInterviewManagement from '../pages/Recruiter/Interview/CandidateInterviewManagement';
import CandidateManagement from '../pages/Recruiter/Interview/CandidateManagement';
import BulkMailer from '../pages/Recruiter/mail/BulkMailer';
import JoinRoom from '../pages/JoinRoom';
import Room from '../pages/Room';


//Recruiter 
import ProtectedRecruiterRoute from './Recruiter/ProtectRecruiterRoutes';
import RecruiterLogin from '../pages/Recruiter/auth/RecruiterLogin';
import RecruiterSignup from '../pages/Recruiter/auth/RecruiterSignup';
import EditCompanyForm from '../pages/Recruiter/Company-Profile/EditCompanyForm';

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
                        <Route path='/forgot-password' element={<ForgotPassword />} />
                        <Route element={<AuthLayout />}>
                            <Route path="/login" element={<SignIn />} />
                            <Route path="/register" element={<SignupForm />} />

                            <Route path='admin'>
                                <Route path="login" element={<AdminLogin />} />
                            </Route>

                            <Route path='recruiter'>
                                <Route path="login" element={<RecruiterLogin />} />
                                <Route path="signup" element={<RecruiterSignup />} />
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
                            <Route path='users' element={<Users />} />
                            <Route path='users/add' element={<UserAddPage />} />
                            <Route path='users/edit/:userId' element={<UserEditPage />} />
                            <Route path="settings" element={<Settings />} />
                        </Route>
                    </Route>
                </Route>

                {/* Users Routes */}
                <Route element={<ProtectedUserRoute />}>
                    <Route element={<UserLayout />}>
                        <Route path="/dashboard" element={<UserDashboard />} />
                        <Route path="/applicant-form" element={<ApplicantProfileForm />} />
                        <Route path="/apply-drive" element={<JobCards />} />
                        <Route path="/application-status" element={<ApplicationStatus />} />
                        <Route path="/upcoming-interviews" element={<UpcomingInterviews />} />
                        <Route path="/interview-history" element={<InterviewHistory />} />

                        <Route path="/feedback" element={<CampusFeedbackForm />} />
                        <Route path="/contact" element={<ContactPlacementOfficer />} />
                        <Route path="/report-bugs" element={<ReportAndBugs />} />
                    </Route>
                </Route>

                {/* Employee Routes */}
                <Route element={<ProtectedRecruiterRoute />}>
                    <Route element={<EmployeeLayout />}>
                        <Route path='/employee-dashboard' element={<EmployeeDashboard />} />
                        <Route path='employee'>
                            <Route path='company-profile' element={<CompanyForm />} />
                            <Route path='company-profile/edit' element={<EditCompanyForm />} />
                            <Route path='jobs' element={<JobList />} />
                            <Route path='job/add' element={<JobForm />} />
                            <Route path='job/edit/:jobId' element={<EditJobForm />} />
                            <Route path='active-job' element={<ActiveJobListing />} />

                            {/* <Route path='applications' element={<JobApplicationsList />} /> */}
                            <Route path='applications/:jobId' element={<JobApplicationsListing />} />
                            {/* <Route path='applications/:profile_id' element={<ApplicantProfileDetails />} /> */}
                            <Route path='applications/:profile_id' element={<ApplicationDetail />} />



                            <Route path='interview-management' element={<InterviewManagement />} />
                            <Route path='select-candidates' element={<SelectedCandidates />} />
                            <Route path='select-candidates/:candidateId' element={<CandidateInterviewManagement />} />
                            <Route path='candidate-management' element={<CandidateManagement />} />
                            <Route path='bulk-mail' element={<BulkMailer />} />
                        </Route>
                    </Route>
                </Route>

                <Route path="/room/:roomID" element={<Room />} />
                <Route path="/test-room" element={<h2>Enter a room by visiting /room/roomID</h2>} />
                {/* <Route path='video-chat' element={<JoinRoom />} /> */}
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