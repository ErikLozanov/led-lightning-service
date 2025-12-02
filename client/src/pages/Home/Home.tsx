import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ServicesSection from '../../components/ServicesSection';
import ContactSection from '../../components/ContactSection';
import TestimonialsSection from '../../components/TestimonialsSection';
import AboutSection from '../../components/AboutSection';
import ProjectCard from '../../components/ProjectCard';
import SEO from '../../components/SEO';
import { useGallery } from '../../hooks/useGallery';
import { ChevronRight } from 'lucide-react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Home = () => {
  const { projects, loading } = useGallery();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const targetId = location.state.scrollTo;
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 300);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const section = document.getElementById('services');
    if (section) {
      const headerOffset = 80;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const handleSmoothLoop = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    const timeLeft = video.duration - video.currentTime;
    const fadeDuration = 1.5;

    if (timeLeft < fadeDuration) {
      const opacity = timeLeft / fadeDuration;
      video.style.opacity = Math.max(0, opacity).toString();
    } else if (video.currentTime < fadeDuration) {
      const opacity = video.currentTime / fadeDuration;
      video.style.opacity = Math.min(1, opacity).toString();
    } else {
      video.style.opacity = '1';
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-neon-blue selection:text-black">
      <SEO title="Начало" />
      
      {/* HERO SECTION */}
      <div className="relative min-h-screen flex flex-col items-center justify-center text-center p-6 overflow-hidden">
        <video autoPlay loop muted playsInline onTimeUpdate={handleSmoothLoop} className="hidden md:block absolute top-0 left-0 w-full h-full object-cover z-0 transition-opacity duration-75">
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <video autoPlay loop muted playsInline onTimeUpdate={handleSmoothLoop} className="block md:hidden absolute top-0 left-0 w-full h-full object-cover z-0 transition-opacity duration-75">
          <source src="/hero-mobile.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/70 z-10"></div>
        
        <div className="relative z-20 flex flex-col items-center max-w-4xl mx-auto mt-16">
          
            <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 drop-shadow-[0_0_25px_rgba(0,243,255,0.2)]">
              VPRIME LIGHTS
            </h1>
          
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mb-10 font-light leading-relaxed">
              Професионално реставриране и полиране на фарове. <br />
              <span className="text-white font-bold border-b-2 border-neon-blue pb-1">Виж пътя ясно отново.</span>
            </p>
          
            <div className="flex flex-col sm:flex-row gap-6">
              <button 
                onClick={scrollToContact}
                className="px-8 py-4 bg-[#00f3ff] text-black font-extrabold text-lg rounded-sm hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(0,243,255,0.6)] hover:shadow-[0_0_30px_rgba(255,255,255,0.8)] uppercase tracking-wide hover:scale-105"
              >
                Запиши Час
              </button>

              <button 
                onClick={scrollToServices}
                className="px-8 py-4 border border-white/30 text-white font-bold text-lg rounded-sm backdrop-blur-sm uppercase tracking-wide transition-all duration-300 hover:bg-[#00f3ff] hover:text-black hover:border-[#00f3ff] hover:shadow-[0_0_20px_rgba(0,243,255,0.6)]"
              >
                Виж Услуги
              </button>
            </div>

        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce text-gray-400">
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
        </div>
      </div>

      {/* SERVICES */}
      <ServicesSection />

      {/* ABOUT US */}
      <AboutSection />

      {/* GALLERY CAROUSEL */}
      <div className="py-24 bg-gradient-to-b from-slate-900 to-black overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6"> 
          
            <div className="flex flex-col items-center mb-12">
              <h2 className="text-4xl font-bold tracking-wider text-center mb-4">
                <span className="text-neon-blue">ПОСЛЕДНИ</span> ПРОЕКТИ
              </h2>
              <div className="h-1 w-24 bg-neon-blue shadow-[0_0_15px_#00f3ff]"></div>
            </div>

          {loading && <p className="text-center text-gray-500 animate-pulse">Зареждане...</p>}

          {!loading && projects.length > 0 && (
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                centerInsufficientSlides={true}
                breakpoints={{
                  640: { slidesPerView: 1 },
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
                className="pb-12"
              >
                {projects.slice(0, 6).map((post) => (
                  <SwiperSlide key={post.id} className="h-auto">
                    <div className="h-full py-2"> 
                        <ProjectCard project={post} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
          )}

            <div className="mt-12 text-center">
              <Link 
                to="/gallery" 
                className="inline-flex items-center gap-2 border border-white/30 px-8 py-3 rounded-full text-white font-bold transition-all duration-300 hover:bg-[#00f3ff] hover:text-black hover:border-[#00f3ff] hover:shadow-[0_0_20px_rgba(0,243,255,0.6)]"
              >
                ВИЖ ВСИЧКИ ПРОЕКТИ
                <ChevronRight size={20} />
              </Link>
            </div>

        </div>
      </div>

      {/* TESTIMONIALS */}
      <TestimonialsSection />

      {/* CONTACT */}
      <ContactSection /> 
    </div>
  );
};

export default Home;