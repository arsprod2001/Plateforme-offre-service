const express = require('express');
const router = express.Router();

// Import route modules
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const messageRoutes = require('./messageRoutes');
const serviceRoutes = require('./serviceRoutes');

// Setup routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/messages', messageRoutes);
router.use('/services', serviceRoutes);

module.exports = router;