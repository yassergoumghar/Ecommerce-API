const express = require('express');

const router = express.Router();

//& Get: All products, product by slug or id
//& Protect for admin only: Post, Patch, Delete: A product by slug or id

router.get('/', (req, res, next) => {
  res.json({
    message: 'This is the product route',
  });
});

module.exports = router;
