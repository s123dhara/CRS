import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PublicRoutes, AdminRoutes, AuthRoutes } from './index';

export default function AppRoutes() {
    return (
        <Routes>
            {/* Public/Main Layout */}
            {PublicRoutes()}
            {AuthRoutes()}
            {/* Admin Layout */}
            {AdminRoutes()}
        </Routes>

    );
}