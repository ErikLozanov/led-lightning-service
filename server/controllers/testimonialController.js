const testimonialService = require('../services/testimonialService');

const getAll = async (req, res) => {
  try {
    const data = await testimonialService.getAllTestimonials();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const create = async (req, res) => {
  try {
    const { client_name, car_model, review_image_url } = req.body;
    if (!review_image_url) {
      return res.status(400).json({ error: 'Image is required' });
    }
    const data = await testimonialService.createTestimonial({ client_name, car_model, review_image_url });
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    await testimonialService.deleteTestimonial(id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAll, create, remove };