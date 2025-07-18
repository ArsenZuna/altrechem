const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Please add a product name'], trim: true, maxlength: 200 },
  description: { type: String, required: [true, 'Please add a description'], maxlength: 2000 },
  category: { type: String, required: true, trim: true },
  featured: { type: Boolean, required: true},
  price: { type: Number, required: [true, 'Please add a price'], min: 0 },
  images: [
    {
      url:   { type: String, required: true },
      alt:   { type: String, default: '' }
    }
  ],
  ingredients: {
    type: [String],
    default: []
  },
  sizes: {
    type: [String],       // e.g. ["30ml", "50ml", "100ml"]
    default: []
  },
  countInStock: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  isOnSale: {
    type: Boolean,
    default: false
  },
  salePrice: {
    type: Number,
    min: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);