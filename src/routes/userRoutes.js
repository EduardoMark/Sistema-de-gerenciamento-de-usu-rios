const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', userController.index);
router.get('/users/:id', userController.show);

router.post('/users', authController.register);

router.put('/users/:id', userController.update);

router.delete('/users/:id', userController.delete);

module.exports = router;