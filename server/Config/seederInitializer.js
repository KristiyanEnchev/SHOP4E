import Banner from '../Models/bannerModel.js';
import Product from '../Models/productModel.js';
import User from '../Models/userModel.js';
import data from '../Seed/data.js';
import { processSeederData } from '../Utils/seederUtils.js';

export const initializeSeeder = async () => {
  const [productCount, userCount] = await Promise.all([
    Product.countDocuments(),
    User.countDocuments(),
    Banner.countDocuments(),
  ]);

  if (productCount === 0 && userCount === 0) {
    console.log('Empty database detected, running seeder...');
    const processedData = await processSeederData(data);
    await Promise.all([
      Product.insertMany(processedData.products),
      User.insertMany(processedData.users),
      Banner.insertMany(processedData.banners),
    ]);
    console.log('Initial seeding completed');
  }
};
