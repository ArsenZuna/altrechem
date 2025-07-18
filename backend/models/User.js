const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add your name'],
  },
  lastname: {
    type: String,
    required: [true, 'Please add your lastname'],
  },
  email: {
    type: String,
    required: [true, 'Please add your email'],
    unique: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Email is invalid'],
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false, // don’t return password in queries by default
  },
  role: {
    type: String,
    enum: ['client', 'admin'],
    default: 'client',
  },
  phone: { type: String, required: true },
  country: { type: String, required: true},
  city: {type: String, required: true},
  address: { type: String, required: true },
}, {
  timestamps: true,
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.matchPassword = function (candidate) {
    return bcrypt.compare(candidate, this.password);
};

module.exports = mongoose.model('User', userSchema);