const express = require('express');
const router = express.Router();
const { getTransactions, addTransaction, deleteTransaction, updateTransaction } = require('../controller/transactionController');
const { protect } = require('../middleware/authMiddleware');

// All routes here are protected
router.route('/')
  .get(protect, getTransactions)
  .post(protect, addTransaction);

router.route('/:id')
  .delete(protect, deleteTransaction);

router.route('/:id')
  .put(protect, updateTransaction);

module.exports = router;