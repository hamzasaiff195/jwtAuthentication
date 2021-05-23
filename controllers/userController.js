const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const signToken = (id) => {
  return jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  );
};

// Middleware function for sending JWT Responce and JWT itself
const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  user.password = undefined;
  user.passwordConfirm = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    createSendToken(newUser, 201, req, res);
  } catch (err) {
    createSendToken(err, 404, req, res);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return 'Please provide email and password ';
  }

  const user = await User.findOne({
    email,
  }).select('+password');

  createSendToken(user, 200, req, res);
};
