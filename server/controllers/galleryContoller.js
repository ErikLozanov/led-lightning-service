const galleryService = require('../services/galleryService');

// GET /api/gallery
const getGallery = async (req, res) => {
  try {
    const projects = await galleryService.getAllProjects();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/gallery
const createProject = async (req, res) => {
  try {
    const { car_model, description, before_image_url, after_image_url } = req.body;

    // Basic Validation
    if (!car_model || !before_image_url || !after_image_url) {
      return res.status(400).json({ error: 'Missing required fields (car_model, images)' });
    }

    const newProject = await galleryService.createProject({
      car_model,
      description,
      before_image_url,
      after_image_url
    });

    res.status(201).json(newProject);
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
  createProject,
  deleteProject,
};