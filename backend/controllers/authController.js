const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
exports.registerUser = asyncHandler(async (req, res) => {
  const { name, lastname, email, password, country, city, address, phone } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({ name, lastname, email, password, country, city, address, phone });
  if (user) {
    res.status(201).json({
      _id:    user._id,
      name:   user.name,
      lastname:   user.lastname,
      email:  user.email,
      role:   user.role,
      token:  generateToken(user._id, user.role),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
exports.authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');

  if (user && await user.matchPassword(password)) {
    res.json({
      _id:    user._id,
      name:   user.name,
      lastname:   user.lastname,
      email:  user.email,
      role:   user.role,
      token:  generateToken(user._id, user.role),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
exports.getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (user) {
    res.json({
      _id:      user._id,
      name:     user.name,
      lastname:   user.lastname,
      email:    user.email,
      country:  user.country,
      city:     user.city,
      address:  user.address,
      phone:    user.phone,
      role:     user.role,
      createdAt:user.createdAt,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});