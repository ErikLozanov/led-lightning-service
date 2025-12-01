export interface Project {
  id: number;
  car_model: string;
  description: string;
  before_image_url: string;
  after_image_url: string;
  production_year?: string; 
  extra_images?: string[];  
  slug: string;
  created_at?: string;
}

export interface Testimonial {
  id: number;
  client_name?: string;
  car_model?: string;
  review_image_url: string;
}