import { AppError } from '../Utils/AppError.js';
import logger from '../Config/logger.js';
import { z } from 'zod';

export const validateRequest = (schema) => {
  return (req, res, next) => {
    try {
      const toValidate = {};

      if (schema.body && req.body) {
        toValidate.body = req.body;
      }

      if (schema.query && req.query) {
        toValidate.query = req.query;
      }

      if (schema.params && req.params) {
        toValidate.params = req.params;
      }

      const validationSchema = {};
      if (schema.body) validationSchema.body = schema.body;
      if (schema.query) validationSchema.query = schema.query;
      if (schema.params) validationSchema.params = schema.params;

      const zodSchema = z.object(validationSchema);

      const result = zodSchema.safeParse(toValidate);

      if (!result.success) {
        const errorMessages = result.error.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
        }));

        logger.warn('Validation Error:', {
          endpoint: req.originalUrl,
          method: req.method,
          errors: errorMessages,
        });

        return next(
          new AppError(
            'Validation failed',
            400,
            'VALIDATION_ERROR',
            errorMessages
          )
        );
      }

      req.validatedData = result.data;
      next();
    } catch (error) {
      logger.error('Validation middleware error:', error);
      next(new AppError('Validation processing failed', 500));
    }
  };
};

export const sanitizeData = (data) => {
  if (Array.isArray(data)) {
    return data.map((item) => sanitizeData(item));
  }

  if (data && typeof data === 'object') {
    const sanitized = {};
    for (const [key, value] of Object.entries(data)) {
      if (!key.startsWith('$')) {
        sanitized[key] = sanitizeData(value);
      }
    }
    return sanitized;
  }

  return data;
};

export const sanitizeRequest = () => {
  return (req, res, next) => {
    try {
      if (req.body) {
        req.body = sanitizeData(req.body);
      }
      if (req.query) {
        req.query = sanitizeData(req.query);
      }
      if (req.params) {
        req.params = sanitizeData(req.params);
      }
      next();
    } catch (error) {
      logger.error('Sanitization error:', error);
      next(new AppError('Request sanitization failed', 500));
    }
  };
};
