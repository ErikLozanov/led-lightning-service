const express = require('express');
const router = express.Router();

const galleryRoutes = require('./galleryRoutes');

// Mount the Gallery routes
// This means any route inside galleryRoutes will automatically be prefixed with /gallery
// Example: '/' becomes '/gallery'
router.use('/gallery', galleryRoutes);

// In the future, you can add more here easily:
// const authRoutes = require('./authRoutes');
// router.use('/auth', authRoutes);

module.exports = router;