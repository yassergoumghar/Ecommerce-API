const mongoose = require('mongoose')
const slugify = require('slugify')

//) Product Model: Name, Category, Price, Description, Pictures, Reviews.
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please put the Product's name"],
    },
    categories: {
      type: String,
      required: [true, "Please put the Product's category, and it's either: "],
      enum: [
        'men',
        'women',
        'bags',
        'clothing',
        'shoes',
        'clothing',
        'accessories',
      ],
    },
    slug: String,
    brand: {
      type: String,
      enum: ['louisVuitton', 'chanel', 'hermes', 'gucci'],
      required: [
        true,
        "Please put the Product's brand, and it's either: 'louisVuitton', 'chanel', 'hermes', 'gucci' ",
      ],
    },
    description: {
      type: String,
      required: [true, "Please put the Product's description"],
    },
    price: {
      type: Number,
      required: [true, "Please put the Product's price"],
    },
    pictures: {
      type: Array,
      required: [true, "Please put the Product's pictures"],
    },
    preview: {
      type: String,
      required: [true, 'PLease put the product preview picture'],
    },
    sale: Boolean,
    active: {
      type: Boolean,
      default: true,
    },
    length: {
      type: Number,
      default: undefined,
    },
  },
  //) Make sure when we have a field not stored in the database but calculated later show up in the Database
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
)

//* Indexes
productSchema.index({ slug: 1 }, { unique: true })

// Virtual populate
productSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'product',
  localField: '_id',
})

//) Hide the *deleted* Products
productSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } })
  next()
})

//* DOCUMENT MIDDLEWARE: runs before .save() and .create()
productSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true })
  next()
})

const Product = mongoose.model('Product', productSchema, 'products')

module.exports = Product
