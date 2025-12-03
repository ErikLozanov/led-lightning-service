const testimonialService = require('../services/testimonialService');

const getAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;

    const result = await testimonialService.getAllTestimonials({ page, limit });
    
    res.json({
      testimonials: result.data,
      total: result.total,
      page,
      totalPages: Math.ceil(result.total / limit)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const create = async (req, res) => {
  try {
    const { client_name, car_model, review_image_url } = req.body;
    if (!review_image_url) return res.status(400).json({ error: 'Image required' });
    
    const data = await testimonialService.createTestimonial({ client_name, car_model, review_image_url });
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    await testimonialService.deleteTestimonial(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAll, create, remove };