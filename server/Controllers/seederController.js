import mongoose from 'mongoose';
import {
  processSeederData,
  cleanUploadedImages,
} from '../Utils/seederUtils.js';
import data from '../Seed/data.js';
import Product from '../Models/productModel.js';
import User from '../Models/userModel.js';
import Banner from '../Models/bannerModel.js';

export async function seedDatabase(req, res) {
  try {
    if (mongoose.connection.readyState !== 1) {
      console.log('Waiting for MongoDB connection...');
      await mongoose.connection.asPromise();
    }

    console.log('MongoDB connected, starting seed process...');

    const shouldClean = req.query.clean === 'true';

    if (shouldClean) {
      await cleanUploadedImages();
    }

    const processedData = await processSeederData(data);

    console.log('Clearing existing data...');

    await Promise.all([
      Product.deleteMany({}).maxTimeMS(30000),
      User.deleteMany({}).maxTimeMS(30000),
      Banner.deleteMany({}).maxTimeMS(30000),
    ]);

    console.log('Inserting new data...');

    const [products, users, banners] = await Promise.all([
      Product.insertMany(processedData.products, { timeout: 30000 }),
      User.insertMany(processedData.users, { timeout: 30000 }),
      Banner.insertMany(processedData.banners, { timeout: 30000 }),
    ]);

    console.log('Seed completed successfully');
    res.json({
      message: 'Database seeded successfully',
      summary: {
        products: products.length,
        users: users.length,
        banners: banners.length,
      },
    });
  } catch (error) {
    console.error('Seeding failed:', error);
    let errorMessage = 'Seeding failed';
    if (error instanceof mongoose.Error.MongooseServerSelectionError) {
      errorMessage =
        'Could not connect to MongoDB. Please check if MongoDB is running.';
    } else if (
      error.name === 'MongooseError' &&
      error.message.includes('buffering timed out')
    ) {
      errorMessage = 'Database operation timed out. Please try again.';
    }

    res.status(500).json({
      error: errorMessage,
      details:
        process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  } finally {
    if (global.gc) {
      global.gc();
    }
  }
}
