const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryContoller');

// Define the routes
router.get('/', galleryController.getGallery);
router.post('/', galleryController.createProject);
router.delete('/:id', galleryController.deleteProject);

module.exports = router;