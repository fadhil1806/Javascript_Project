const express = require('express');
const { getAllUser, getUserById, addDataUser, updateUser} = require('../controllers/UserControllers');
const router = express.Router();

router.get('/', getAllUser)
router.get('/:id', getUserById)
router.post('/', addDataUser)
router.put('/', updateUser)

module.exports = router;

