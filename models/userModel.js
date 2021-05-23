const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User must have name'],
  },
  email: {
    type: String,
    required: [true, 'User must have email'],
  },
  password: {
    type: String,
    required: [true, 'User Must have password'],
    minlength: [8, 'Password must be atleas 8 characters'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'please confirm your password'],
    validate: {
      validator: function (el) {
        //* This only works on CREATE and  SAVE!!!
        return el === this.password;
      },
      message: 'Password does not match',
    },
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
