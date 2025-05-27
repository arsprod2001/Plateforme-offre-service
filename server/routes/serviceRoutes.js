const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

router.get('/user/:id', serviceController.getUserServices);
router.put('/:id', serviceController.updateService);

module.exports = router;