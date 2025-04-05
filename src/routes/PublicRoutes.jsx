import { Route } from 'react-router-dom';
import { MainLayout } from '../layout';
import Home from '../pages/Home';

export const PublicRoutes = () => (
    <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
    </Route>
);
