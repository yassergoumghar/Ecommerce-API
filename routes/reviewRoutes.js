const express = require('express');
const authController = require('./../controllers/authController');
const reviewController = require('./../controllers/reviewController');
const handlerFactory = require('./../controllers/handlerFactory');
const Reviews = require('./../models/reviewModel');

const router = express.Router();

//& Protect for user and has to have bought the product, Post: Add a review

router.use(authController.protect);

router.post(
  '/add',
  authController.getUser,
  reviewController.checkOrder,
  handlerFactory.createOne(Reviews)
);

module.exports = router;
