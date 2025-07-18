const express = require('express');
const router  = express.Router();
const {
  addOrderItems,
  getOrderById,
  getMyOrders,
  getOrders,
  updateOrderToPaid,
  updateOrderToDelivered,
  updateOrderStatus,
  deleteOrderById,
  adminUpdateOrder
} = require('../controllers/orderController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/', protect, addOrderItems);
router.get('/myorders', protect, getMyOrders);
router.get('/:id', protect, getOrderById);
// Admin update both paid and delivered status
router.put('/:id', protect, adminOnly, updateOrderStatus); // <-- add this here
router.put('/:id', protect, adminOnly, adminUpdateOrder);
router.put('/:id/pay', protect, updateOrderToPaid);
router.put('/:id/deliver', protect, adminOnly, updateOrderToDelivered);
router.delete("/:id", deleteOrderById);
router.get('/', protect, adminOnly, getOrders);


module.exports = router;