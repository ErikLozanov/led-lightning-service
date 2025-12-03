import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Phone, ChevronRight } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Начало',    path: '/',          type: 'scroll', id: 'top' },
  { name: 'Услуги',    path: '/#services', type: 'scroll', id: 'services' },
  { name: 'За Нас',    path: '/#about',    type: 'scroll', id: 'about' },
  { name: 'Галерия',   path: '/gallery',   type: 'route' },
  { name: 'Отзиви',    path: '/testimonials', type: 'route' },
  { name: 'Контакти',  path: '/#contact',  type: 'scroll', id: 'contact' },
];

const Navbar = () => {
  const { session } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = (e: React.MouseEvent, link: typeof NAV_LINKS[0]) => {
    if (link.type === 'route') {
      setIsOpen(false);
      return; 
    }

    e.preventDefault();
    setIsOpen(false);

    if (link.id === 'top') {
        if (location.pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            navigate('/'); 
        }
        return;
    }

    const targetElement = document.getElementById(link.id || '');

    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    } else {
      navigate('/', { state: { scrollTo: link.id } });
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* LOGO */}
          <a 
            href="/" 
            onClick={(e) => handleLinkClick(e, NAV_LINKS[0])}
            className="text-xl lg:text-2xl font-black text-white tracking-wider hover:text-[#00f3ff] transition-colors flex items-center gap-2 z-50 relative group whitespace-nowrap"
          >
            <span className="group-hover:drop-shadow-[0_0_15px_rgba(0,243,255,0.8)] transition-all duration-300">
              VPRIME <span className="text-[#00f3ff]">LIGHTS</span>
            </span>
          </a>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-8">
            
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={(e) => link.type === 'scroll' ? handleLinkClick(e, link) : null}
                className="relative text-xs xl:text-sm font-bold text-gray-300 transition-colors uppercase tracking-wide group hover:text-white whitespace-nowrap"
              >
                {link.name}
                <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-[#00f3ff] transition-all duration-300 group-hover:w-full shadow-[0_0_10px_#00f3ff]"></span>
              </Link>
            ))}
            
            {session && (
              <Link to="/dashboard" className="text-xs xl:text-sm text-[#00f3ff] font-bold border border-[#00f3ff]/30 px-3 py-2 rounded hover:bg-[#00f3ff] hover:text-black transition-all shadow-[0_0_10px_rgba(0,243,255,0.2)] hover:shadow-[0_0_20px_rgba(0,243,255,0.6)] whitespace-nowrap">
                Админ
              </Link>
            )}

            <a href="tel:+359893383533" className="bg-[#00f3ff] text-black text-xs xl:text-sm font-extrabold px-3 py-2 xl:px-5 xl:py-2.5 rounded hover:bg-white transition-all shadow-[0_0_15px_rgba(0,243,255,0.5)] hover:shadow-[0_0_25px_rgba(255,255,255,0.8)] hover:scale-105 active:scale-95 whitespace-nowrap">
              📞 089 338 3533
            </a>
          </div>

          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="lg:hidden text-white hover:text-[#00f3ff] transition-colors z-50 relative p-2"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black flex flex-col pt-32 px-6 lg:hidden h-screen w-screen overflow-y-auto">
            <div className="flex flex-col space-y-6">
              
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={(e) => handleLinkClick(e, link)}
                  className="flex items-center justify-between text-2xl font-bold text-white border-b border-gray-800 pb-4 hover:text-[#00f3ff] transition-colors group"
                >
                  {link.name.toUpperCase()}
                  <ChevronRight className="text-gray-600 group-hover:text-[#00f3ff]" />
                </Link>
              ))}
              
              {session && (
                <Link to="/dashboard" onClick={() => setIsOpen(false)} className="text-xl font-bold text-[#00f3ff] border border-[#00f3ff] px-6 py-3 rounded text-center hover:bg-[#00f3ff] hover:text-black transition-all">
                  АДМИН ПАНЕЛ
                </Link>
              )}
            </div>

            <div className="mt-12 mb-8">
                <a href="tel:+359893383533" className="flex items-center justify-center gap-3 w-full bg-slate-900 text-white text-lg font-bold py-4 rounded-xl border border-slate-700 active:scale-95 transition-transform hover:border-[#00f3ff] hover:text-[#00f3ff] hover:shadow-[0_0_15px_rgba(0,243,255,0.2)]">
                    <Phone size={20} /> 089 338 3533
                </a>
            </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;