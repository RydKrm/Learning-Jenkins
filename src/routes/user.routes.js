
const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/user.controller');

// For a real app, you would add authentication middleware to protected routes

router.route('/').post(registerUser).get(getAllUsers); // GET should be protected
router.post('/login', loginUser);
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser); // All should be protected

module.exports = router;
