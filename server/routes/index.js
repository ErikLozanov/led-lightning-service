const express = require('express');
const router = express.Router();

const galleryRoutes = require('./galleryRoutes');
const testimonialRoutes = require('./testimonialRoutes');

router.use('/gallery', galleryRoutes);
router.use('/testimonials', testimonialRoutes);


module.exports = router;