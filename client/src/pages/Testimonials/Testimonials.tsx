import { useState } from 'react';
import { useTestimonials } from '../../hooks/useTestimonials'; // <--- Import Hook
import TestimonialCard from '../../components/TestimonialCard';
import { SEO } from '../../components/SEO';
import ContactSection from '../../components/ContactSection';
import { X, ChevronLeft, ChevronRight, Loader2, ChevronDown } from 'lucide-react';

const Testimonials = () => {
  // Use the Hook (replaces useEffect)
  const { 
    data, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage, 
    isLoading 
  } = useTestimonials();

  // Flatten the pages into one single list
  const reviews = data?.pages.flatMap(page => page.testimonials) || [];
  const totalCount = data?.pages[0]?.total || 0;

  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const TestimonialSkeleton = () => (
      <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 h-[500px] animate-pulse">
          <div className="h-[400px] bg-slate-700 p-8 flex items-center justify-center">
             <div className="w-1/2 h-full bg-slate-600 rounded-xl"></div>
          </div>
          <div className="p-4 bg-slate-900">
             <div className="h-4 bg-slate-700 rounded w-2/3 mb-1"></div>
             <div className="h-3 bg-slate-600 rounded w-1/4"></div>
          </div>
      </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      <SEO title="Клиентски Отзиви" description="Вижте какво казват клиентите за VPrime Lights." />

      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        
        <div data-aos="fade-up" className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-wider mb-4">
            ДОВОЛНИ <span className="text-[#00f3ff]">КЛИЕНТИ</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Ние държим на качеството. Ето реални чатове с наши клиенти.
            <br/>
            {/* Show count only if data is loaded */}
            {!isLoading && <span className="text-sm text-gray-500 mt-2 block">Показани {reviews.length} от {totalCount} отзива</span>}
          </p>
        </div>

        {/* LOADING SKELETON */}
        {isLoading && (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                    <TestimonialSkeleton key={i} />
                ))}
            </div>
        )}
        
        {/* CONTENT GRID */}
        {!isLoading && reviews.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reviews.map((review, index) => (
                <div 
                    key={review.id} 
                    data-aos="fade-up" 
                    data-aos-delay={(index % 6) * 100} 
                >
                    <TestimonialCard 
                        review={review} 
                        onClick={() => openLightbox(index)} 
                    />
                </div>
              ))}
            </div>
        )}

        {/* EMPTY STATE */}
        {!isLoading && reviews.length === 0 && (
            <div className="text-center py-20 text-gray-500">Все още няма добавени отзиви.</div>
        )}

        {/* LOAD MORE BUTTON */}
        {hasNextPage && (
            <div className="text-center mt-16" data-aos="fade-up">
                <button 
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                    className="inline-flex items-center gap-2 border border-slate-700 bg-slate-800/50 px-8 py-3 rounded-full text-white font-bold hover:bg-[#00f3ff] hover:text-black hover:border-transparent transition-all duration-300 disabled:opacity-50"
                >
                    {isFetchingNextPage ? (
                        <><Loader2 className="animate-spin" /> ЗАРЕЖДАНЕ...</>
                    ) : (
                        <><ChevronDown size={20} /> ЗАРЕДИ ОЩЕ</>
                    )}
                </button>
            </div>
        )}

      </div>

      <ContactSection /> 

      {/* LIGHTBOX CODE  */}
      {lightboxOpen && reviews.length > 0 && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          <button onClick={closeLightbox} className="absolute top-6 right-6 text-white/50 hover:text-white p-2 z-50"><X size={40} /></button>
          <button onClick={prevImage} className="absolute left-4 text-white/50 hover:text-[#00f3ff] p-2 z-50"><ChevronLeft size={50} /></button>
          <div className="relative h-[90vh] w-full flex justify-center items-center px-4">
             <img src={reviews[currentIndex].review_image_url} alt="Fullscreen Review" className="max-h-full max-w-full object-contain rounded-lg shadow-2xl" onClick={(e) => e.stopPropagation()} />
          </div>
          <button onClick={nextImage} className="absolute right-4 text-white/50 hover:text-[#00f3ff] p-2 z-50"><ChevronRight size={50} /></button>
        </div>
      )}
    </div>
  );
};

export default Testimonials;