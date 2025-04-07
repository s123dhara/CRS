import { Route } from 'react-router-dom';
import { AdminLayout } from '../layout';
import AdminDashboard from '../pages/AdminDashboard';

export const AdminRoutes = () => (
    <Route path="/dashboard" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
    </Route>
);