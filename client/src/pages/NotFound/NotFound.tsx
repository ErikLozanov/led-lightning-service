import { Link } from 'react-router-dom';
import { Home, LightbulbOff } from 'lucide-react';
import SEO from '../../components/SEO';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
      <SEO title="Страницата не е намерена" description="Грешка 404" />

      {/* Background Glow (Red to signal error/stop) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-900/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10">
        
        {/* Animated Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <LightbulbOff size={120} className="text-gray-600" />
            <div className="absolute inset-0 animate-pulse opacity-50">
               {/* Faint flicker effect */}
               <LightbulbOff size={120} className="text-red-500/20" />
            </div>
          </div>
        </div>

        {/* Glitchy Text */}
        <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-gray-700 to-black drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)] mb-4">
          404
        </h1>

        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 uppercase tracking-widest">
          Опа! Тази страница е <span className="text-red-500">изгоряла</span>.
        </h2>

        <p className="text-gray-400 max-w-lg mx-auto mb-10 text-lg leading-relaxed">
          Изглежда, че сте попаднали на тъмно. Страницата, която търсите, не съществува или е била преместена.
        </p>

        {/* Action Button */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-extrabold text-lg rounded hover:bg-[#00f3ff] hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(0,243,255,0.6)] uppercase tracking-wide group"
        >
          <Home size={20} className="group-hover:scale-110 transition-transform" />
          Обратно към светло
        </Link>

      </div>
    </div>
  );
};

export default NotFound;