import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PublicRoutes, AdminRoutes, AuthRoutes } from './routes';
import AppRoutes from './routes/AppRoutes';


export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
