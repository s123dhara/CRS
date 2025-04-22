import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext"

const ProtectedTwoFactorRoute = () => {
    const { isAuthenticated, isPartiallyAuthenticated } = useAuth()

    if (!isPartiallyAuthenticated) { return <Navigate to="/login" /> }

    return <Outlet />
}

export default ProtectedTwoFactorRoute;

