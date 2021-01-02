const express = require('express');

const router = express.Router();

//& Protect for user and has to have bought the product, Post: Add a review

router.get('/', (req, res, next) => {
  res.json({
    message: 'This is the review route',
  });
});

module.exports = router;
