import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Phone, ChevronRight } from 'lucide-react';

const Navbar = () => {
  const { session } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigation = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    setIsOpen(false); 

    const performScroll = () => {
      if (targetId === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.getElementById(targetId);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }
    };

    if (location.pathname === '/') {
      performScroll();
    } else {
      navigate('/');
      setTimeout(performScroll, 100);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* LOGO */}
          <a 
            href="/" 
            onClick={(e) => handleNavigation(e, 'top')}
            className="text-xl font-bold text-white tracking-wider hover:text-neon-blue transition-colors flex items-center gap-2 z-50 relative"
          >
            LED <span className="text-neon-blue drop-shadow-[0_0_5px_rgba(0,243,255,0.8)]">LIGHTNING</span>
          </a>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-6">
            <a href="/" onClick={(e) => handleNavigation(e, 'top')} className="text-sm font-medium text-gray-300 hover:text-white transition-colors uppercase tracking-wide cursor-pointer">Начало</a>
            <a href="/#services" onClick={(e) => handleNavigation(e, 'services')} className="text-sm font-medium text-gray-300 hover:text-white transition-colors uppercase tracking-wide cursor-pointer">Услуги</a>
            <a href="/#contact" onClick={(e) => handleNavigation(e, 'contact')} className="text-sm font-medium text-gray-300 hover:text-white transition-colors uppercase tracking-wide cursor-pointer">Контакти</a>
            
            {session && (
              <Link to="/dashboard" className="text-sm text-neon-blue font-bold border border-neon-blue/30 px-3 py-1 rounded hover:bg-neon-blue hover:text-black transition-all">Админ</Link>
            )}

            <a href="tel:+359888888888" className="bg-neon-blue text-black text-sm font-bold px-4 py-2 rounded hover:bg-white transition-all shadow-[0_0_10px_rgba(0,243,255,0.4)]">
              📞 088 888 8888
            </a>
          </div>

          {/* MOBILE TOGGLE BUTTON */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden text-white hover:text-neon-blue transition-colors z-50 relative p-2"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black flex flex-col pt-28 px-6 md:hidden h-screen w-screen overflow-y-auto">
            
            <div className="flex flex-col space-y-6">
              {/* Navigation Links */}
              <a 
                href="/" 
                onClick={(e) => handleNavigation(e, 'top')}
                className="flex items-center justify-between text-2xl font-bold text-white border-b border-gray-800 pb-4 hover:text-neon-blue transition-colors group"
              >
                НАЧАЛО
                <ChevronRight className="text-gray-600 group-hover:text-neon-blue" />
              </a>

              <a 
                href="/#services" 
                onClick={(e) => handleNavigation(e, 'services')}
                className="flex items-center justify-between text-2xl font-bold text-white border-b border-gray-800 pb-4 hover:text-neon-blue transition-colors group"
              >
                УСЛУГИ
                <ChevronRight className="text-gray-600 group-hover:text-neon-blue" />
              </a>

              <a 
                href="/#contact" 
                onClick={(e) => handleNavigation(e, 'contact')}
                className="flex items-center justify-between text-2xl font-bold text-white border-b border-gray-800 pb-4 hover:text-neon-blue transition-colors group"
              >
                КОНТАКТИ
                <ChevronRight className="text-gray-600 group-hover:text-neon-blue" />
              </a>
              
              {/* Admin Link (Only if logged in) */}
              {session && (
                <Link 
                  to="/dashboard" 
                  onClick={() => setIsOpen(false)}
                  className="text-xl font-bold text-neon-blue border border-neon-blue px-6 py-3 rounded text-center hover:bg-neon-blue hover:text-black transition-all"
                >
                  АДМИН ПАНЕЛ
                </Link>
              )}
            </div>

            {/* Phone Button at Bottom */}
            <div className="mt-12">
                <a 
                  href="tel:+359888888888" 
                  className="flex items-center justify-center gap-3 w-full bg-slate-900 text-white text-lg font-bold py-4 rounded-xl border border-slate-700 active:scale-95 transition-transform hover:border-neon-blue"
                >
                    <Phone size={20} className="text-neon-blue" />
                    088 888 8888
                </a>
            </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;