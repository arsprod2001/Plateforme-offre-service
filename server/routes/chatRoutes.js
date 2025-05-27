const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.get('/:utilisateurId', chatController.getChatHistory);

module.exports = router;