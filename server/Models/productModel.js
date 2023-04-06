import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    images: [String],
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: {
      type: Number,
      required: true,
      min: [0.01, 'Price must be a positive number'],
    },
    _ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    countInStock: {
      type: Number,
      required: true,
      min: [0, 'Rating must be a positive number'],
    },
    rating: {
      type: Number,
      required: false,
      min: [0, 'Rating must be a positive number'],
      mix: [5, 'Rating must be no more than 5'],
    },
    numReviews: { type: Number, required: false },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
