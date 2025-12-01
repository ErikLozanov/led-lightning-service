const supabase = require('../config/supabase');

const getAllProjects = async () => {
  const { data, error } = await supabase
    .from('gallery_posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};

// NEW: Get one specific project
const getProjectById = async (id) => {
  const { data, error } = await supabase
    .from('gallery_posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw new Error(error.message);
  return data;
};

const createProject = async (projectData) => {
  // Now includes production_year and extra_images
  const { car_model, description, before_image_url, after_image_url, production_year, extra_images } = projectData;

  const { data, error } = await supabase
    .from('gallery_posts')
    .insert([{ 
      car_model, 
      description, 
      before_image_url, 
      after_image_url,
      production_year,
      extra_images: extra_images || [] 
    }])
    .select();

  if (error) throw new Error(error.message);
  return data;
};

// NEW: Update an existing project
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
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};