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

const getAllProjects = async ({ page = 1, limit = 6, search = '', sort = 'desc' }) => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from('gallery_posts')
    .select('*', { count: 'exact' });

  if (search) {
    query = query.or(`car_model.ilike.%${search}%,description.ilike.%${search}%`);
  }

  const isAscending = sort === 'asc';
  
  query = query
    .order('created_at', { ascending: isAscending })
    .range(from, to);

  const { data, error, count } = await query;

  if (error) throw new Error(error.message);

  return { data, total: count };
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