import { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api/axios';
import { type Project } from '../../types';
import BeforeAfterSlider from '../../components/BeforeAfterSlider';
import { SEO } from '../../components/SEO';
import ContactSection from '../../components/ContactSection';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';


import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Zoom } from 'swiper/modules'; 
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/zoom'; // <--- Added Zoom CSS
import { GalleryActions } from '../../components/GalleryActions';

const ProjectDetails = () => {
  const params = useParams();
  const slug = params.slug;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Ref to control the Lightbox Swiper
  const lightboxSwiperRef = useRef<any>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get(`/gallery/${slug}`);
        setProject(res.data);
      } catch (err) {
        console.error("Error fetching project details:", err);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchProject();
  }, [slug]);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  if (loading) return <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">Зареждане...</div>;
  if (!project) return <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">Проектът не е намерен.</div>;

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      
      <SEO 
        title={project.car_model} 
        description={`Вижте как преобразихме фаровете на ${project.car_model}.`}
        image={project.after_image_url}
        type="article"
      />

      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        
        {/* 1. Header Section */}
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 uppercase">
            {project.car_model}
            </h1>
            {project.production_year && (
            <span className="bg-slate-800 text-[#00f3ff] px-4 py-1 rounded-full text-sm font-bold border border-slate-700 shadow-[0_0_10px_rgba(0,243,255,0.2)]">
                Година: {project.production_year}
            </span>
            )}
        </div>

        {/* 2. Main Slider Section */}
        <div className="max-w-5xl mx-auto px-4">
            <div className="rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-slate-700">
            <BeforeAfterSlider 
                beforeImage={project.before_image_url}
                afterImage={project.after_image_url}
            />
            </div>
            
            <div className="mt-8 bg-slate-800/50 p-8 rounded-xl border border-slate-700 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-[#00f3ff] mb-4 uppercase tracking-wide">Описание на проекта</h3>
                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {project.description}
                </p>

                <GalleryActions 
            postId={project.id.toString()} 
            initialLikes={project.likes || 0} 
            title={`Преобразяване на фарове: ${project.car_model}`}
                />
            </div>
        </div>

        {/* 3. Extra Images Gallery */}
        {project.extra_images && project.extra_images.length > 0 && (
            <div className="max-w-7xl mx-auto mt-16 px-4">
            <h3 className="text-2xl font-bold text-white mb-8 border-l-4 border-[#00f3ff] pl-4 uppercase tracking-wider">
                Галерия от процеса
            </h3>
            
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                centerInsufficientSlides={true}
                navigation
                pagination={{ clickable: true }}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
                className="pb-12"
            >
                {project.extra_images.map((imgUrl, index) => (
                    <SwiperSlide key={index}>
                    <div 
                        onClick={() => openLightbox(index)}
                        className="relative group rounded-xl overflow-hidden border border-slate-800 hover:border-[#00f3ff] transition-all duration-300 h-64 cursor-pointer shadow-lg"
                    >
                        <img 
                        src={imgUrl} 
                        alt={`Detail ${index}`} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                        <ZoomIn className="text-white w-10 h-10 drop-shadow-lg" />
                        </div>
                    </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            </div>
        )}

        <div className="text-center mt-12">
            <Link to="/gallery" className="text-gray-500 hover:text-white transition-colors border-b border-transparent hover:border-white pb-1">
            ← Обратно към всички проекти
            </Link>
        </div>

      </div>

      {/* Footer */}
      <ContactSection /> 

      {/* --- FULLSCREEN LIGHTBOX (SWIPER ENABLED) --- */}
      {lightboxOpen && project.extra_images && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md animate-in fade-in duration-200">
          
          {/* Close Button */}
          <button 
            onClick={closeLightbox} 
            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full z-[110]"
          >
            <X size={40} />
          </button>

          {/* THE SWIPER LIGHTBOX */}
          <Swiper
            modules={[Navigation, Zoom]} // Enable Zoom module
            zoom={true} // Activate it
            initialSlide={currentImageIndex} // Open on the correct image
            onSwiper={(swiper) => (lightboxSwiperRef.current = swiper)}
            onSlideChange={(swiper) => setCurrentImageIndex(swiper.activeIndex)}
            className="w-full h-full"
            spaceBetween={50}
            // Increase threshold to prevent accidental swipes when trying to zoom vertically
            threshold={10} 
          >
            {project.extra_images.map((imgUrl, index) => (
                <SwiperSlide key={index} className="flex items-center justify-center">
                    {/* The zoom container wrapper */}
                    <div className="swiper-zoom-container">
                        <img 
                            src={imgUrl} 
                            alt={`Fullscreen View ${index}`} 
                            className="max-h-[90vh] max-w-full object-contain"
                        />
                    </div>
                </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons (Overlaying the Swiper) */}
          <button 
            onClick={() => lightboxSwiperRef.current?.slidePrev()}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-[#00f3ff] transition-colors p-2 hover:bg-black/50 rounded-full z-[110] hidden md:block"
          >
            <ChevronLeft size={50} />
          </button>

          <button 
            onClick={() => lightboxSwiperRef.current?.slideNext()}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-[#00f3ff] transition-colors p-2 hover:bg-black/50 rounded-full z-[110] hidden md:block"
          >
            <ChevronRight size={50} />
          </button>

          {/* Counter */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-400 font-mono text-sm z-[110]">
             {currentImageIndex + 1} / {project.extra_images.length}
          </div>

        </div>
      )}

    </div>
  );
};

export default ProjectDetails;