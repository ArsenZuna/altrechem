const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name:    { type: String, required: true },
  qty:     { type: Number, required: true, min: 1 },
  price:   { type: Number, required: true, min: 0 },
  image:   { type: String}
});

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  guestInfo: {
    name:  { type: String },
    email: { type: String },
    phone: { type: String }
  },
  orderItems: [orderItemSchema],
  shippingAddress: {
    address:    { type: String, required: true },
    city:       { type: String, required: true },
    postalCode: { type: String, required: true },
    country:    { type: String, required: true }
  },
  paymentMethod:  { type: String, required: true },
  itemsPrice:     { type: Number, required: true, min: 0 },
  shippingPrice:  { type: Number, required: true, min: 0, default: 0 },
  totalPrice:     { type: Number, required: true, min: 0 },
  isPaid:         { type: Boolean, default: false },
  paidAt:         { type: Date },
  isDelivered:    { type: Boolean, default: false },
  deliveredAt:    { type: Date }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);