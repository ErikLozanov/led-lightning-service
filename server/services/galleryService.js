const supabase = require('../config/supabase');

const createSlug = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     
    .replace(/[^\w\-]+/g, '') 
    .replace(/\-\-+/g, '-'); 
};

const getAllProjects = async () => {
  const { data, error } = await supabase
    .from('gallery_posts')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data;
};

const getProjectBySlug = async (slug) => {
  const { data, error } = await supabase
    .from('gallery_posts')
    .select('*')
    .eq('slug', slug) // Search by slug column
    .single();

  if (error) throw new Error(error.message);
  return data;
};

const createProject = async (projectData) => {
  const { car_model, description, before_image_url, after_image_url, production_year, extra_images } = projectData;

  // 1. Generate basic slug
  let slug = createSlug(car_model);
  
  slug = `${slug}-${Date.now()}`; 

  const { data, error } = await supabase
    .from('gallery_posts')
    .insert([{ 
      car_model, 
      description, 
      before_image_url, 
      after_image_url,
      production_year,
      extra_images: extra_images || [],
      slug 
    }])
    .select();

  if (error) throw new Error(error.message);
  return data;
};

const updateProject = async (id, updates) => {
  
  const { data, error } = await supabase
    .from('gallery_posts')
    .update(updates)
    .eq('id', id)
    .select();

  if (error) throw new Error(error.message);
  return data;
};

const deleteProject = async (id) => {
  const { data, error } = await supabase
    .from('gallery_posts')
    .delete()
    .eq('id', id)
    .select();
  if (error) throw new Error(error.message);
  return data;
};

module.exports = {
  getAllProjects,
  getProjectBySlug, 
  createProject,
  updateProject,
  deleteProject
};