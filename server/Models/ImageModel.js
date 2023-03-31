import mongoose from 'mongoose';

const dimensionSchema = new mongoose.Schema(
  {
    width: Number,
    height: Number,
  },
  { _id: false }
);

const imageSchema = new mongoose.Schema({
  fileId: {
    type: String,
    required: true,
    unique: true,
  },
  originalName: {
    type: String,
    required: true,
  },
  mimeType: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  urls: {
    thumbnail: String,
    medium: String,
    large: String,
  },
  dimensions: {
    thumbnail: dimensionSchema,
    medium: dimensionSchema,
    large: dimensionSchema,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

imageSchema.index({ fileId: 1 });

const ImageModel = mongoose.model('Image', imageSchema);
export default ImageModel;
