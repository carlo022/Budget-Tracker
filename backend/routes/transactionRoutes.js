const express = require('express');
const router = express.Router();
const { getTransactions, addTransaction, deleteTransaction, updateTransaction, clearTransactions } = require('../controller/transactionController');
const { protect } = require('../middleware/authMiddleware');

// All routes here are protected
router.route('/')
  .get(protect, getTransactions)
  .post(protect, addTransaction);

router.route('/clear')
  .delete(protect, clearTransactions);

router.route('/:id')
  .delete(protect, deleteTransaction);

router.route('/:id')
  .put(protect, updateTransaction);

module.exports = router;