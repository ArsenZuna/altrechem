const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
exports.addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    guestInfo
  } = req.body;

  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  }

  const orderData = {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice,
    isPaid: false,
    isDelivered: false,
  };

  if (guestInfo && guestInfo.name && guestInfo.phone) {
    orderData.guestInfo = guestInfo;
  } else {
    orderData.user = req.user._id;
  }

  const order = new Order(orderData);
  const createdOrder = await order.save();

  // ✅ Reduce stock for each ordered product
  for (const item of orderItems) {
    const product = await Product.findById(item.product);

    if (!product) {
      res.status(404);
      throw new Error(`Product not found: ${item.product}`);
    }

    // Ensure enough stock
    if (product.countInStock < item.qty) {
      res.status(400);
      throw new Error(`Not enough stock for ${product.name}`);
    }

    product.countInStock -= item.qty;
    await product.save();
  }

  res.status(201).json(createdOrder);
});


// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
exports.getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');
  if (order) res.json(order);
  else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
exports.getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user.id });
  res.json(orders);
});

// @desc    Get all orders (admin)
// @route   GET /api/orders
// @access  Admin
exports.getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user','id name');
  res.json(orders);
});

// @desc    Mark order as paid
// @route   PUT /api/orders/:id/pay
// @access  Private
exports.updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) { res.status(404); throw new Error('Order not found'); }

  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = req.body.paymentResult;
  const updated = await order.save();
  res.json(updated);
});

// @desc    Mark order as delivered
// @route   PUT /api/orders/:id/deliver
// @access  Admin
exports.updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) { res.status(404); throw new Error('Order not found'); }

  order.isDelivered = true;
  order.deliveredAt = Date.now();
  const updated = await order.save();
  res.json(updated);
});

exports.updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  // Update isPaid
  if (typeof req.body.isPaid === 'boolean') {
    order.isPaid = req.body.isPaid;
    if (req.body.isPaid && !order.paidAt) {
      order.paidAt = Date.now();
    }
  }

  // Update isDelivered
  if (typeof req.body.isDelivered === 'boolean') {
    order.isDelivered = req.body.isDelivered;
    if (req.body.isDelivered && !order.deliveredAt) {
      order.deliveredAt = Date.now();
    }
  }

  const updated = await order.save();
  res.json(updated);
});

exports.deleteOrderById = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found"});
    }

    await order.deleteOne();
    res.json({ message: "Order deleted successfully"})
  } catch (error) {
    console.error("Delete error: ", error);
    res.status(500).json({ message: "Server error while deleting order..."});
  }
});

// @desc    Admin update to order (items, status, totals)
// @route   PUT /api/orders/:id
// @access  Admin
exports.adminUpdateOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  const {
    orderItems,
    isPaid,
    isDelivered,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  order.orderItems = orderItems;
  order.isPaid = isPaid;
  order.isDelivered = isDelivered;
  order.itemsPrice = itemsPrice;
  order.taxPrice = taxPrice;
  order.shippingPrice = shippingPrice;
  order.totalPrice = totalPrice;

  if (isPaid && !order.paidAt) {
    order.paidAt = Date.now();
  }

  if (isDelivered && !order.deliveredAt) {
    order.deliveredAt = Date.now();
  }

  const updated = await order.save();
  res.json(updated);
});