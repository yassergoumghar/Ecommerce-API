const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.json({
    message: 'This is the product route',
  });
});

module.exports = router;
