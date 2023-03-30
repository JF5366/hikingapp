const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.get('/', userController.show)


// router.post('/', userController.create);

// router.post('/login', userController.login);

// router.put(':id/settings/updateName', userController.updateName);

module.exports = router;