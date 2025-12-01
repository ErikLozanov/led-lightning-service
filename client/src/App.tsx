import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // <--- Import Navbar
import Home from './pages/Home/Home';
import AdminLogin from './pages/AdminLogin/AdminLogin';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {
  return (
    <div className="antialiased">
      {/* Navbar sits at the top of the app */}
      <Navbar />
      
      {/* Add padding-top so content doesn't hide behind the fixed navbar */}
      <div className="pt-16"> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  )
}

export default App