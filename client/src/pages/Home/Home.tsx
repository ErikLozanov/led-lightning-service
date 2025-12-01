import { Link } from 'react-router-dom';
import BeforeAfterSlider from '../../components/BeforeAfterSlider';
import ServicesSection from '../../components/ServicesSection';
import ContactSection from '../../components/ContactSection';
import { useGallery } from '../../hooks/useGallery';

const Home = () => {
  const { projects, loading, error } = useGallery();

  // Smart Scroll Helper
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-neon-blue selection:text-black">
      
      {/* --- HERO SECTION --- */}
      <div className="relative min-h-screen flex flex-col items-center justify-center text-center p-6 overflow-hidden">
        
        {/* Desktop Video */}
        <video autoPlay loop muted playsInline className="hidden md:block absolute top-0 left-0 w-full h-full object-cover z-0">
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        {/* Mobile Video */}
        <video autoPlay loop muted playsInline className="block md:hidden absolute top-0 left-0 w-full h-full object-cover z-0">
          <source src="/hero-mobile.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/70 z-10"></div>
        
        <div className="relative z-20 flex flex-col items-center max-w-4xl mx-auto mt-16">
          <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 drop-shadow-[0_0_25px_rgba(0,243,255,0.2)]">
            LED LIGHTNING
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mb-10 font-light leading-relaxed">
            Професионално реставриране и полиране на фарове. <br />
            <span className="text-white font-bold border-b-2 border-neon-blue pb-1">Виж пътя ясно отново.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Contact Button */}
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 bg-neon-blue text-black font-extrabold text-lg rounded hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(0,243,255,0.6)] uppercase tracking-wide"
            >
              Запиши Час
            </button>

            {/* Services Button - Now uses smooth scroll */}
            <button 
              onClick={() => scrollToSection('services')}
              className="px-8 py-4 border border-white/30 text-white font-bold text-lg rounded hover:bg-white/10 hover:border-white transition-all duration-300 backdrop-blur-sm uppercase tracking-wide"
            >
              Виж Услуги
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce text-gray-400">
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
        </div>
      </div>

      {/* --- SERVICES --- */}
      <ServicesSection />

      {/* --- GALLERY --- */}
      <div className="p-8 max-w-7xl mx-auto py-24">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-4xl font-bold tracking-wider text-center mb-4">
            <span className="text-neon-blue">РЕАЛНИ</span> РЕЗУЛТАТИ
          </h2>
          <div className="h-1 w-24 bg-neon-blue shadow-[0_0_15px_#00f3ff]"></div>
        </div>
        
        {error && <div className="text-red-400 bg-red-900/20 p-4 rounded text-center">Неуспешно зареждане.</div>}
        {loading && <p className="text-center text-gray-500 animate-pulse">Зареждане...</p>}
        {projects.length === 0 && !loading && !error && <p className="text-center text-gray-500">Няма добавени проекти.</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((post) => (
            <div key={post.id} className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-neon-blue/50 transition-all duration-300 shadow-2xl hover:shadow-[0_0_30px_rgba(0,243,255,0.1)] group">
              <Link to={`/project/${post.id}`} className="block relative">
                 <div className="pointer-events-none"> 
                   <BeforeAfterSlider beforeImage={post.before_image_url} afterImage={post.after_image_url} />
                 </div>
                 <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity z-30 duration-300">
                    <span className="text-white font-bold border-2 border-white px-6 py-2 rounded-full tracking-widest hover:bg-white hover:text-black transition-colors">ВИЖ ДЕТАЙЛИ</span>
                 </div>
              </Link>
              <div className="p-8 relative">
                <Link to={`/project/${post.id}`}>
                  <h3 className="text-2xl font-bold text-white mb-3 hover:text-neon-blue transition-colors uppercase">{post.car_model}</h3>
                </Link>
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 border-l-2 border-neon-blue/30 pl-3">{post.description}</p>
                {post.production_year && (
                   <div className="absolute top-8 right-8">
                      <span className="text-xs font-mono text-neon-blue border border-neon-blue/30 px-2 py-1 rounded bg-neon-blue/5">{post.production_year}</span>
                   </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- CONTACT --- */}
      <ContactSection /> 
    </div>
  );
};

export default Home;