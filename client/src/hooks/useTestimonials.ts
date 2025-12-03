import { useInfiniteQuery } from '@tanstack/react-query';
import api from '../api/axios';

interface Testimonial {
  id: number;
  client_name?: string;
  car_model?: string;
  review_image_url: string;
}

interface TestimonialResponse {
  testimonials: Testimonial[];
  total: number;
  page: number;
  totalPages: number;
}

export const useTestimonials = () => {
  return useInfiniteQuery({
    queryKey: ['testimonials'],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await api.get<TestimonialResponse>('/testimonials', {
        params: { page: pageParam, limit: 6 } 
      });
      return res.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    staleTime: 1000 * 60 * 10, 
  });
};