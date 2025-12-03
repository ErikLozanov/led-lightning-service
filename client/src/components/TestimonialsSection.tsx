import { Link } from 'react-router-dom'; 
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import TestimonialCard from './TestimonialCard';
import { useTestimonials } from '../hooks/useTestimonials'; 
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const TestimonialsSection = () => {
  const { data, isLoading: loading } = useTestimonials();

  const reviews = data?.pages[0]?.testimonials || [];

  if (loading) return null;
  if (reviews.length === 0) return null;

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-[#00f3ff]/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header with Animation */}
        <div data-aos="fade-up" className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-wider">
            ДОВОЛНИ <span className="text-[#00f3ff]">КЛИЕНТИ</span>
          </h2>
          <div className="h-1 w-24 bg-[#00f3ff] mx-auto shadow-[0_0_15px_#00f3ff]"></div>
        </div>

        {/* Carousel */}
        <div data-aos="fade-up" data-aos-delay="200">
            <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            centerInsufficientSlides={true}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 6000 }}
            breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
            }}
            className="pb-12"
            >
            {reviews.map((review) => (
                <SwiperSlide key={review.id} className="h-auto">
                <TestimonialCard review={review} />
                </SwiperSlide>
            ))}
            </Swiper>
        </div>

        {/* VIEW ALL BUTTON */}
        <div data-aos="fade-up" data-aos-delay="300" className="mt-8 text-center">
            <Link 
              to="/testimonials" 
              className="inline-flex items-center gap-2 border border-white/30 px-8 py-3 rounded-full text-white font-bold transition-all duration-300 hover:bg-[#00f3ff] hover:text-black hover:border-[#00f3ff]"
            >
              ВИЖ ВСИЧКИ ОТЗИВИ
            </Link>
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;