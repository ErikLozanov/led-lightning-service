const supabase = require('../config/supabase');

const getAllTestimonials = async ({ page = 1, limit = 6 }) => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabase
    .from('testimonials')
    .select('*', { count: 'exact' }) 
    .order('created_at', { ascending: false }) 
    .range(from, to);

  if (error) throw new Error(error.message);
  
  return { data, total: count };
};

const createTestimonial = async (data) => {
  const { client_name, car_model, review_image_url } = data;
  const { data: newRow, error } = await supabase
    .from('testimonials')
    .insert([{ client_name, car_model, review_image_url }])
    .select();

  if (error) throw new Error(error.message);
  return newRow;
};

const deleteTestimonial = async (id) => {
  const { error } = await supabase.from('testimonials').delete().eq('id', id);
  if (error) throw new Error(error.message);
  return { message: 'Deleted successfully' };
};

module.exports = {
  getAllTestimonials,
  createTestimonial,
  deleteTestimonial
};