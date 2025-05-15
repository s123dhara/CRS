import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";

const ProtectedRecruiterRoute = () => {
    const { isAuthenticated, loggedUser } = useAuth();

    if (!isAuthenticated || !loggedUser || loggedUser.role !== 'RECRUITER') {
        return <Navigate to="/recruiter/login" />;
    }

    return <Outlet />;
};

export default ProtectedRecruiterRoute;
