const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', userController.index);
router.get('/users/:id', userController.show);

router.post('/users', userController.register);

module.exports = router;