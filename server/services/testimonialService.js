const supabase = require('../config/supabase');

const getAllTestimonials = async () => {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
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
  const { error } = await supabase
    .from('testimonials')
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message);
  return { message: 'Deleted successfully' };
};

module.exports = {
  getAllTestimonials,
  createTestimonial,
  deleteTestimonial
};