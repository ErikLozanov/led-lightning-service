import BeforeAfterSlider from '../../components/BeforeAfterSlider';
import ServicesSection from '../../components/ServicesSection'; // <--- Import it
import { useGallery } from '../../hooks/useGallery';

const Home = () => {
  const { projects, loading, error } = useGallery();

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-neon-blue selection:text-black">
      
      {/* 1. Hero Section */}
      <div className="flex flex-col items-center justify-center text-center p-10 min-h-[85vh] bg-gradient-to-b from-slate-900 to-black relative overflow-hidden">
        {/* ... (Keep your existing Hero code here) ... */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-neon-blue/20 rounded-full blur-[100px] pointer-events-none"></div>

        <h1 className="relative z-10 text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 drop-shadow-[0_0_15px_rgba(0,243,255,0.3)]">
          LED LIGHTNING SERVICE
        </h1>
        <p className="relative z-10 text-xl text-gray-400 max-w-2xl mb-8">
          Професионално реставриране и полиране на фарове. <br />
          <span className="text-neon-blue">Виж пътя ясно отново.</span>
        </p>
        
        <div className="flex gap-4 relative z-10">
          <button className="px-8 py-3 bg-neon-blue text-black font-bold text-lg rounded-sm hover:bg-white hover:shadow-[0_0_25px_rgba(255,255,255,0.6)] transition-all duration-300">
            Запиши Час
          </button>
        </div>
      </div>

      {/* 2. INSERT SERVICES SECTION HERE */}
      <ServicesSection />

      {/* 3. Gallery Section */}
      <div className="p-8 max-w-7xl mx-auto py-20"> {/* Added py-20 for spacing */}
        <div className="flex items-center mb-12 justify-center"> {/* Centered title */}
          <h2 className="text-3xl font-bold tracking-wider text-center">
            <span className="text-neon-blue">РЕАЛНИ</span> РЕЗУЛТАТИ
          </h2>
        </div>
        
        {/* ... (Keep existing gallery logic: error, loading, grid) ... */}
        {error && (
          <div className="text-red-400 bg-red-900/20 p-4 rounded border border-red-500/50 text-center">
            Неуспешно зареждане на галерията.
          </div>
        )}

        {loading && (
          <p className="text-center text-gray-500 animate-pulse">Зареждане на проекти...</p>
        )}

        {projects.length === 0 && !loading && !error && (
            <p className="text-center text-gray-500">Все още няма добавени проекти.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((post) => (
            <div key={post.id} className="bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 hover:border-neon-blue/50 transition-all duration-300 shadow-xl backdrop-blur-sm">
              <BeforeAfterSlider 
                beforeImage={post.before_image_url}
                afterImage={post.after_image_url}
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{post.car_model}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {post.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black py-8 text-center text-gray-600 text-sm border-t border-slate-800">
        <p>&copy; 2025 LED Lightning Service. Всички права запазени.</p>
      </footer>
    </div>
  );
};

export default Home;