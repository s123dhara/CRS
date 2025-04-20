import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from "../context/AuthContext"

const ProtectedRoute = () => {
    const { loggedUser, loading, isAuthenticated } = useAuth()

    if (loggedUser == null) { return <Navigate to="/login" /> }

    return <Outlet />
}

export default ProtectedRoute;

