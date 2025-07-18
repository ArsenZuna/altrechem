const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');

// @desc    Create a new product
// @route   POST /api/products
// @access  Admin
exports.createProduct = asyncHandler(async (req, res) => {
  const { name, description, category, price, ingredients, shades, sizes, countInStock, featured, isOnSale, salePrice } = req.body;
  const images = req.files
    ? req.files.map(f => ({ url: `/uploads/products/${f.filename}`, alt: name }))
    : [];

  const product = new Product({
    name, description, category, price,
    ingredients, shades, sizes, countInStock,
    featured, isOnSale, salePrice,
    images
  });
  const created = await product.save();
  res.status(201).json(created);
});

// @desc    Get all products
// @route   GET /api/products
// @access  Public
exports.getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Public
exports.getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) res.json(product);
  else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Admin
exports.updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  // merge req.body
  Object.assign(product, req.body);
  if (req.files) {
    product.images = req.files.map(f => ({ url: `/uploads/products/${f.filename}`, alt: product.name }));
  }

  const updated = await product.save();
  res.json(updated);
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Admin
exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  await product.deleteOne();
  res.json({ message: 'Product removed' });
});
