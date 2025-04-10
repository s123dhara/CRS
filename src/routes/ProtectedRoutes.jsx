// import { Navigate, Outlet } from 'react-router-dom';

// // // Replace this with your actual auth check logic (e.g., context, redux, localStorage, etc.)
// // const isAuthenticated = async () => {
// //   // const res = await fetch('http://localhost:3000/auth/check', {
// //   //   credentials: 'include', // 👈 must include cookies!    
// //   // });
// //   // const data = await res.json();
// //   // console.log('Auth status:', data);
// //   // return data.isAuthenticated;
// //   return false;
// // };

// // const ProtectedRoute = () => {
// //   return isAuthenticated() ? <Outlet /> : <Navigate to="/admin/login" replace />;
// // };

// // export default ProtectedRoute;
// import { Navigate, Outlet } from 'react-router-dom';
// import { useEffect, useState } from 'react';

// const ProtectedRoute = () => {
//   const [isAuth, setIsAuth] = useState(null); // null = loading state

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const res = await fetch('http://localhost:3000/auth/check', {
//           credentials: 'include', // sends cookies!
//         });
//         const data = await res.json();
//         console.log('Auth status:', data);
//         setIsAuth(data.isAuthenticated);
//       } catch (error) {
//         console.error('Auth check failed:', error);
//         setIsAuth(false);
//       }
//     };

//     checkAuth();
//   }, []);

//   if (isAuth === null) {
//     return <div>Loading...</div>; // or a spinner
//   }

//   return isAuth ? <Outlet /> : <Navigate to="/admin/login" replace />;
// };

// export default ProtectedRoute;

import { useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { Navigate, Outlet } from 'react-router-dom';


const ProtectedRoute = () => {
    const auth = useAuth()
    useEffect(() => {
        auth.checkAdmin()
    }, [])

    if (!auth?.user) { return <Navigate to="/admin/login" replace />  }

    return <Outlet />
}

export default ProtectedRoute;

