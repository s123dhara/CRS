import { Route } from 'react-router-dom';
import { MainLayout } from '../layout';
import Home from '../pages/Home';
import AuthLayout from '../layout/Auth/AdminAuthLayout';
import LoginForm from '../components/Admin/Auth/LoginForm';

export const PublicRoutes = () => (
    <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />                
    </Route>
);
