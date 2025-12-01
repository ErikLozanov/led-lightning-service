import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { session } = useAuth();

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo / Brand Name */}
          <Link to="/" className="text-xl font-bold text-white tracking-wider hover:text-neon-blue transition-colors">
            LED <span className="text-neon-blue">LIGHTNING</span>
          </Link>

          {/* Right Side Links */}
          <div className="flex items-center gap-6">
            <Link to="/" className="text-sm text-gray-300 hover:text-white transition-colors">
              Начало
            </Link>
            
            {/* If logged in, show Dashboard link. If not, hidden or show Admin link (optional) */}
            {session ? (
              <Link to="/dashboard" className="text-sm text-neon-blue font-bold">
                Админ Панел
              </Link>
            ) : null}

            {/* Call Button (Prominent) */}
            <a 
              href="tel:+359888888888" // Replace with your actual number
              className="bg-neon-blue text-black text-sm font-bold px-4 py-2 rounded hover:bg-white transition-all shadow-[0_0_10px_rgba(0,243,255,0.4)]"
            >
              📞 08X XXX XXXX
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;