import { ZoomIn } from 'lucide-react';

interface Testimonial {
  id: number;
  client_name?: string;
  car_model?: string;
  review_image_url: string;
}

interface TestimonialCardProps {
  review: Testimonial;
  onClick?: () => void; 
}

const TestimonialCard = ({ review, onClick }: TestimonialCardProps) => {
  return (
    <div 
      onClick={onClick}
      className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl overflow-hidden shadow-lg hover:border-[#00f3ff]/50 transition-all duration-300 h-full flex flex-col group cursor-pointer"
    >
      <div className="relative h-[500px] w-full overflow-hidden bg-slate-950">
        
        <img 
          src={review.review_image_url} 
          alt="Client Review" 
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100" 
        />

        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
            <ZoomIn className="text-white w-12 h-12 drop-shadow-lg" />
        </div>
      </div>
      
      {(review.client_name || review.car_model) && (
        <div className="p-4 border-t border-slate-800 bg-slate-900">
          {review.client_name && <h4 className="text-white font-bold text-lg">{review.client_name}</h4>}
          {review.car_model && <p className="text-sm text-[#00f3ff]">{review.car_model}</p>}
        </div>
      )}
    </div>
  );
};

export default TestimonialCard;