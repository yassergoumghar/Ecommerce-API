const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.json({
    message: 'This is the order route',
  });
});

module.exports = router;
