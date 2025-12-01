const supabase = require('../config/supabase');

const getAllProjects = async () => {
  const { data, error } = await supabase
    .from('gallery_posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};

const createProject = async (projectData) => {
  const { car_model, description, before_image_url, after_image_url } = projectData;

  const { data, error } = await supabase
    .from('gallery_posts')
    .insert([
      { car_model, description, before_image_url, after_image_url }
    ])
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
  createProject,
  deleteProject,
};