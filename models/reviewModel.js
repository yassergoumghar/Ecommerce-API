const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({});

//) Review Model: Product, Review, Image, User
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
