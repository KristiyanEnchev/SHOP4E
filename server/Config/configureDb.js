import mongoose from 'mongoose';
import logger from './logger.js';
import { config } from './variables.js';

const MAX_RETRIES = 5;
const RETRY_INTERVAL = 5000;
const CONNECTION_OPTIONS = {
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 30000,
  heartbeatFrequencyMS: 2000,
};

export const configureDb = async (retryCount = 0) => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(config.dbConnection, CONNECTION_OPTIONS);

    mongoose.connection.on('connected', () => {
      logger.info('MongoDB connected successfully');
      retryCount = 0;
    });

    mongoose.connection.on('error', (err) => {
      logger.error('MongoDB connection error:', err);
      handleReconnect(retryCount);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected');
      handleReconnect(retryCount);
    });

    mongoose.connection.on('reconnected', () => {
      logger.info('MongoDB reconnected');
      retryCount = 0;
    });

    configureGracefulShutdown();
    logger.info('Database connection established');
  } catch (error) {
    logger.error('Database connection failed:', error);
    handleReconnect(retryCount);
  }
};

const handleReconnect = (retryCount) => {
  if (retryCount < MAX_RETRIES) {
    logger.info(
      `Retrying connection in ${RETRY_INTERVAL / 1000}s... (Attempt ${
        retryCount + 1
      }/${MAX_RETRIES})`
    );
    setTimeout(() => configureDb(retryCount + 1), RETRY_INTERVAL);
  } else {
    logger.error(`Failed to connect after ${MAX_RETRIES} attempts`);
    process.exit(1);
  }
};

const configureGracefulShutdown = () => {
  ['SIGINT', 'SIGTERM'].forEach((signal) => {
    process.on(signal, async () => {
      try {
        await mongoose.connection.close();
        logger.info('MongoDB connection closed through app termination');
        process.exit(0);
      } catch (err) {
        logger.error('Error closing MongoDB connection:', err);
        process.exit(1);
      }
    });
  });
};
