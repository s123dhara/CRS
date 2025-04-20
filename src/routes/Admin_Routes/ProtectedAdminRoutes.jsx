import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext"

const ProtectedAdminRoute = () => {
    const { isAuthenticated } = useAuth()

    if (!isAuthenticated) { return <Navigate to="/login" /> }

    return <Outlet />
}

export default ProtectedAdminRoute;

