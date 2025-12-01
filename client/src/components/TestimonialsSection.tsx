import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import api from '../api/axios';
import TestimonialCard from './TestimonialCard';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Testimonial {
  id: number;
  client_name?: string;
  car_model?: string;
  review_image_url: string;
}

const TestimonialsSection = () => {
  const [reviews, setReviews] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/testimonials')
      .then(res => setReviews(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;
  if (reviews.length === 0) return null;

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-[#00f3ff]/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-wider">
            ДОВОЛНИ <span className="text-[#00f3ff]">КЛИЕНТИ</span>
          </h2>
          <div className="h-1 w-24 bg-[#00f3ff] mx-auto shadow-[0_0_15px_#00f3ff]"></div>
        </div>

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
          {/* SLICE TO SHOW ONLY LAST 5 */}
          {reviews.slice(0, 5).map((review) => (
            <SwiperSlide key={review.id} className="h-auto">
              <TestimonialCard review={review} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* VIEW ALL BUTTON */}
        <div className="mt-8 text-center">
            <Link 
              to="/reviews" 
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