const galleryService = require('../services/galleryService');

const getGallery = async (req, res) => {
  try {
    const projects = await galleryService.getAllProjects();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProjectBySlug = async (req, res) => {
  try {
    const { slug } = req.params; 
    const project = await galleryService.getProjectBySlug(slug);
    res.json(project);
  } catch (error) {
    res.status(404).json({ error: 'Project not found' });
  }
};

const createProject = async (req, res) => {
  try {
    const { car_model, description, before_image_url, after_image_url, production_year, extra_images } = req.body;
    if (!car_model || !before_image_url || !after_image_url) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const newProject = await galleryService.createProject({
      car_model, description, before_image_url, after_image_url, production_year, extra_images
    });
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params; 
    const updates = req.body;
    const updatedProject = await galleryService.updateProject(id, updates);
    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params; 
    await galleryService.deleteProject(id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getGallery,
  getProjectBySlug, 
  createProject,
  updateProject,
  deleteProject
};