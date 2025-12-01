import { useEffect, useState } from 'react';
import api from '../../api/axios';
import TestimonialCard from '../../components/TestimonialCard';
import SEO from '../../components/SEO';
import ContactSection from '../../components/ContactSection';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  id: number;
  client_name?: string;
  car_model?: string;
  review_image_url: string;
}

const TestimonialsPage = () => {
  const [reviews, setReviews] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    api.get('/testimonials')
      .then(res => setReviews(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

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

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      <SEO title="Клиентски Отзиви" description="Вижте какво казват клиентите за LED Lightning Service." />

      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-wider mb-4">
            ДОВОЛНИ <span className="text-[#00f3ff]">КЛИЕНТИ</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Ние държим на качеството. Ето реални чатове с наши клиенти.
          </p>
        </div>

        {loading && <div className="text-center py-20 animate-pulse text-gray-500">Зареждане на отзиви...</div>}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
             // Removed the fixed height wrapper here
             <div key={review.id}>
               <TestimonialCard 
                 review={review} 
                 onClick={() => openLightbox(index)} 
               />
             </div>
          ))}
        </div>
      </div>

      <ContactSection /> 

      {/* LIGHTBOX FOR READING CHATS */}
      {lightboxOpen && reviews.length > 0 && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          <button onClick={closeLightbox} className="absolute top-6 right-6 text-white/50 hover:text-white p-2 z-50">
            <X size={40} />
          </button>

          <button onClick={prevImage} className="absolute left-4 text-white/50 hover:text-[#00f3ff] p-2 z-50">
            <ChevronLeft size={50} />
          </button>

          <div className="relative h-[90vh] w-full flex justify-center items-center px-4">
             <img 
               src={reviews[currentIndex].review_image_url} 
               alt="Fullscreen Review" 
               className="max-h-full max-w-full object-contain rounded-lg shadow-2xl"
               onClick={(e) => e.stopPropagation()} 
             />
          </div>

          <button onClick={nextImage} className="absolute right-4 text-white/50 hover:text-[#00f3ff] p-2 z-50">
            <ChevronRight size={50} />
          </button>
        </div>
      )}
    </div>
  );
};

export default TestimonialsPage;