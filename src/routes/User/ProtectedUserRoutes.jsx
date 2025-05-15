import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";

const ProtectedUserRoute = () => {
    const { isAuthenticated, loggedUser } = useAuth();

    if (!isAuthenticated || !loggedUser || loggedUser.role !== 'APPLICANT') {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
};

export default ProtectedUserRoute;
