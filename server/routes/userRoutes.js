const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getUsers);
router.put('/profile/:id', userController.updateProfile);

module.exports = router;