import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PublicRoutes, AdminRoutes, AuthRoutes } from './routes';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';


export default function App() {
  return (
    <Router>
      <AuthProvider >
        <AppRoutes />
      </AuthProvider>
    </Router>

  );
}
