const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({});

//) Product Model: Name, Category, Price, Description, Pictures, Reviews.
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
