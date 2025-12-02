import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import Home from './pages/Home/Home';
import AdminLogin from './pages/AdminLogin/AdminLogin';
import Dashboard from './pages/Dashboard/Dashboard';
import ProjectDetails from './pages/ProjectDetails/ProjectDetails';
import Gallery from './pages/Gallery/Gallery';
import NotFound from './pages/NotFound/NotFound';
import TestimonialsPage from './pages/TestimonialsPage/TestimonialsPage';
import ScrollToTop from './components/ScrollToTop';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    AOS.init({
      duration: 800,      // Animation duration (0.8s)
      once: true,         // Only animate once
      mirror: false,      // Do not re-animate on scroll up
      offset: 100,        // Start animation 100px before element is in view
    });
  }, []);

  return (
    <div className="antialiased">
      <ScrollToTop />
      <Navbar />
      <div className="pt-16"> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reviews" element={<TestimonialsPage />} />
          <Route path="/project/:slug" element={<ProjectDetails />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  )
}

export default App