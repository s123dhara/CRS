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
import SignupForm from '../../components/Admin/Auth/SignupForm'; // 👈 Import the SignupForm

export const AuthRoutes = () => (
    <Route path="/admin" element={<AuthLayout />}>
        {/* Login route: /admin/login */}
        <Route path="/login" element={<LoginForm />} />

        {/* Signup route: /admin/signup */}
        <Route path="/signup" element={<SignupForm />} />
    </Route>
);
