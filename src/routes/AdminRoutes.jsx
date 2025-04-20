import { Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoutes';
import { AdminLayout } from '../layout';
import AdminDashboard from '../pages/Admin/AdminDashboard';

export const AdminRoutes = () => (
  <Route path="/admin" element={<ProtectedRoute />}>
    <Route element={<AdminLayout />}>
      <Route index element={<AdminDashboard />} />
    </Route>
  </Route>
);
