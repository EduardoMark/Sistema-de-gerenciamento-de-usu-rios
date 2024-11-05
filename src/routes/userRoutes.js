require('dotenv').config({ path: '../../.env' });
const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

// Users
router.post('/users/register', authController.registerUser);
router.post('/users/login', authController.loginUser);
router.get('/users', authenticateToken, userController.getAllUsers);
router.get('/users/:id', authenticateToken, userController.getUserById);
router.put('/users/:id', authenticateToken, userController.updateUser);
router.delete('/users/:id', authenticateToken, userController.deleteUser);

module.exports = router;