// import { Route } from 'react-router-dom';
// import AuthLayout from '../../layout/Auth/AdminAuthLayout';
// import LoginForm from '../../components/Admin/Auth/LoginForm';

// export const AuthRoutes = () => (
//     <Route path="/admin/login" element={<AuthLayout />}>
//         <Route index element={<LoginForm />} />
//     </Route>
// );

import { Route } from 'react-router-dom';
import AuthLayout from '../../layout/Auth/AdminAuthLayout';
import LoginForm from '../../components/Admin/Auth/LoginForm';
import SignupForm from '../../components/Admin/Auth/SignupForm';
import PublicOnlyRoute from '../PublicOnlyRoutes'; // 👈 use this instead of ProtectedRoute
import { useAuth } from '../../context/AuthContext';

export const AuthRoutes = () => {
    // const auth = useAuth();
    // console.log(auth);


    return (
        
        <Route path="/admin" element={<AuthLayout />}>
            <Route path="login" element={<LoginForm />} />
            <Route path="signup" element={<SignupForm />} />
            {/* <Route element={<PublicOnlyRoute />}>
            
        </Route> */}
        </Route>
    )
    // );
}
