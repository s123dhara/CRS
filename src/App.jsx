import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import Dashboard from './pages/Admin/Dashboard';

export default function App() {
  return (
    <Router>

      <AppRoutes />     
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </Router>

  );
}
