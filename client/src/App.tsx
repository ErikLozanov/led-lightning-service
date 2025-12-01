import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import Home from './pages/Home/Home';
import AdminLogin from './pages/AdminLogin/AdminLogin';
import Dashboard from './pages/Dashboard/Dashboard';
import ProjectDetails from './pages/ProjectDetails/ProjectDetails';
import Gallery from './pages/Gallery/Gallery';

function App() {
  return (
    <div className="antialiased">
      <Navbar />
      
      <div className="pt-16"> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/project/:slug" element={<ProjectDetails />} />
        </Routes>
      </div>
    </div>
  )
}

export default App