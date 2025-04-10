// import { Navigate, Outlet } from 'react-router-dom';
// import { useEffect, useState } from 'react';

// const PublicOnlyRoute = () => {
//     const [isAuth, setIsAuth] = useState(null);

//     useEffect(() => {
//         const checkAuth = async () => {
//             try {
//                 const res = await fetch('http://localhost:3000/auth/check', {
//                     credentials: 'include',
//                 });
//                 const data = await res.json();
//                 setIsAuth(data.isAuthenticated);
//             } catch (err) {
//                 console.error('Auth check error', err);
//                 setIsAuth(false);
//             }
//         };

//         checkAuth();
//     }, []);

//     if (isAuth === null) return <div>Loading...</div>;

//     return isAuth ? <Navigate to="/admin" replace /> : <Outlet />;
// };

// export default PublicOnlyRoute;

import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicOnlyRoute = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return <div>Loading...</div>; // or a spinner

    return isAuthenticated ? <Navigate to="/admin" replace /> : <Outlet />;
};

export default PublicOnlyRoute;
