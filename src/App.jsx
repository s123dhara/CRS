import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PublicRoutes, AdminRoutes } from './routes';


export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public/Main Layout */}        
        {PublicRoutes()}

        {/* Admin Layout */}
        {AdminRoutes()}
      </Routes>
    </Router>
  );
}
