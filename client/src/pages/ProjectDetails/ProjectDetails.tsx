import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api/axios';
import type { Project } from '../../types';
import BeforeAfterSlider from '../../components/BeforeAfterSlider';
import SEO from '../../components/SEO';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'; 

// Swiper Imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ProjectDetails = () => {
  const params = useParams();
  const slug = params.slug;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    if (!project?.extra_images) return;
    setCurrentImageIndex((prev) => (prev + 1) % project.extra_images!.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!project?.extra_images) return;
    setCurrentImageIndex((prev) => 
      prev === 0 ? project.extra_images!.length - 1 : prev - 1
    );
  };

  if (loading) return <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">Зареждане...</div>;
  if (!project) return <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">Проектът не е намерен.</div>;

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans pb-20">
      
      <SEO 
        title={project.car_model} 
        description={`Вижте резултата от реставрацията на ${project.car_model}.`}
        image={project.after_image_url}
        type="article"
      />

      {/* 1. Header Section */}
      <div className="pt-32 px-6 max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 uppercase">
          {project.car_model}
        </h1>
        {project.production_year && (
          <span className="bg-slate-800 text-[#00f3ff] px-4 py-1 rounded-full text-sm font-bold border border-slate-700 shadow-[0_0_10px_rgba(0,243,255,0.2)]">
            Година: {project.production_year}
          </span>
        )}
      </div>

      {/* 2. Main Slider Section */}
      <div className="max-w-5xl mx-auto mt-12 px-4">
        <div className="rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-slate-700">
           <BeforeAfterSlider 
             beforeImage={project.before_image_url}
             afterImage={project.after_image_url}
           />
        </div>
        
        {/* Description */}
        <div className="mt-8 bg-slate-800/50 p-8 rounded-xl border border-slate-700 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-[#00f3ff] mb-4 uppercase tracking-wide">Описание на проекта</h3>
            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {project.description}
            </p>
        </div>
      </div>

      {/* 3. Extra Images Gallery (CAROUSEL + LIGHTBOX) */}
      {project.extra_images && project.extra_images.length > 0 && (
        <div className="max-w-7xl mx-auto mt-16 px-6">
           <h3 className="text-2xl font-bold text-white mb-8 border-l-4 border-[#00f3ff] pl-4 uppercase tracking-wider">
             Галерия от процеса
           </h3>
           
           <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={20}
              slidesPerView={1}
              navigation
              centerInsufficientSlides={true}
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
                    {/* Hover Overlay Icon */}
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

      {/* --- FULLSCREEN LIGHTBOX OVERLAY --- */}
      {lightboxOpen && project.extra_images && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-200"
          onClick={closeLightbox} // Click outside to close
        >
          {/* Close Button */}
          <button 
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full z-50"
          >
            <X size={40} />
          </button>

          {/* Left Arrow */}
          <button 
            onClick={prevImage}
            className="absolute left-4 md:left-8 text-white/50 hover:text-[#00f3ff] transition-colors p-2 hover:bg-black/50 rounded-full z-50"
          >
            <ChevronLeft size={50} />
          </button>

          {/* Main Image */}
          <div className="relative max-w-7xl max-h-[85vh] w-full px-4 flex justify-center">
             <img 
               src={project.extra_images[currentImageIndex]} 
               alt="Fullscreen View" 
               className="max-h-[85vh] max-w-full object-contain rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-slate-800"
               onClick={(e) => e.stopPropagation()} // Clicking image shouldn't close it
             />
             
             {/* Counter */}
             <div className="absolute -bottom-10 text-gray-400 font-mono text-sm">
                {currentImageIndex + 1} / {project.extra_images.length}
             </div>
          </div>

          {/* Right Arrow */}
          <button 
            onClick={nextImage}
            className="absolute right-4 md:right-8 text-white/50 hover:text-[#00f3ff] transition-colors p-2 hover:bg-black/50 rounded-full z-50"
          >
            <ChevronRight size={50} />
          </button>

        </div>
      )}

    </div>
  );
};

export default ProjectDetails;