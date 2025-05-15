import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext"

const ProtectedAdminRoute = () => {
    const { isAuthenticated, loggedUser } = useAuth()

    if (!isAuthenticated || !loggedUser || loggedUser.role !== 'ADMIN') { return <Navigate to="/" /> }

    return <Outlet />
}

export default ProtectedAdminRoute;

