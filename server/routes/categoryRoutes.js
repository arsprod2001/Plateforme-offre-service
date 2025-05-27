const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/home', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryServices);

module.exports = router;