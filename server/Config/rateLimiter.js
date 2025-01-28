import rateLimit from 'express-rate-limit';
import logger from './logger.js';

const productionConfig = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
};

const developmentConfig = {
  windowMs: 15 * 60 * 1000,
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
};

const config =
  process.env.NODE_ENV === 'production' ? productionConfig : developmentConfig;

export const createRateLimiter = (options = {}) => {
  const limiterConfig = {
    ...config,
    ...options,
    handler: (req, res) => {
      logger.warn('Rate limit exceeded:', {
        ip: req.ip,
        path: req.path,
      });

      res.status(429).json({
        status: 'error',
        message: 'Too many requests, please try again later.',
        errorCode: 'RATE_LIMIT_EXCEEDED',
      });
    },
  };

  return rateLimit(limiterConfig);
};

export const authLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 login attempts per windowMs
  message: 'Too many login attempts, please try again after 15 minutes',
});

export const registerLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // limit each IP to 3 registration attempts per hour
  message: 'Too many registration attempts, please try again after an hour',
});

export const apiLimiter = createRateLimiter();

export const uploadLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // limit each IP to 10 uploads per hour
  message: 'Upload limit reached, please try again after an hour',
});
