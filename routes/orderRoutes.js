const express = require('express');

const router = express.Router();

//& Post: Add a new order.
//& Protect by Admin: Get: Get all orders, Patch: Edit status and notes

router.get('/', (req, res, next) => {
  res.json({
    message: 'This is the order route',
  });
});

module.exports = router;
