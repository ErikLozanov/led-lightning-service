const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryContoller');

router.get('/', galleryController.getGallery);
router.post('/', galleryController.createProject);

router.get('/:id', galleryController.getProjectById);
router.put('/:id', galleryController.updateProject);  
router.delete('/:id', galleryController.deleteProject);

module.exports = router;