const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', userController.index);
router.get('/users/:id', userController.show);

router.post('/users', userController.register);

router.put('/users/:id', userController.update);

router.delete('/users/:id', userController.delete);

module.exports = router;