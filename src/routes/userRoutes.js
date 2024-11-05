require('dotenv').config({ path: '../../.env' });
const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const {authenticateToken, checkRole} = require('../middlewares/authMiddleware');

const router = express.Router();

// Auth
router.post('/users/register', authController.registerUser);
router.post('/users/login', authController.loginUser);

// Routes protegidas
router.get('/users', authenticateToken, checkRole('admin'), userController.getAllUsers);
router.get('/users/:id', authenticateToken, userController.getUserById);
router.put('/users/:id', authenticateToken, userController.updateUser);
router.delete('/users/:id', authenticateToken, checkRole('admin'), userController.deleteUser);

module.exports = router;