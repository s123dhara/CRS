import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//Toastify Installation 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//Toastify Installation 

// App All Routes
import AppRoutes from './routes/AppRoutes';
import Room from './pages/Room';


export default function App() {
  return (
    <Router>
      <AppRoutes />      
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </Router>

  );
}
