const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Ruta para iniciar la autenticación con LinkedIn
router.get('/auth/linkedin', authController.getLinkedInAuthURL);

// Ruta para manejar el callback de LinkedIn
router.get('/auth/linkedin/callback', authController.handleLinkedInCallback);

module.exports = router;
