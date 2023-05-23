import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import mongoSanitize from 'express-mongo-sanitize';
import {
  requestLogger,
  morganMiddleware,
} from '../Middleware/loggerMiddleware.js';
import { errorHandler } from '../Middleware/errorMiddleware.js';
import { sanitizeRequest } from '../Middleware/validationMiddleware.js';
import { paths } from './variables.js';
import logger from './logger.js';

const corsOptions = {
  origin: (origin, callback) => {
    const whitelist = process.env.ALLOWED_ORIGINS
      ? process.env.ALLOWED_ORIGINS.split(',')
      : ['http://localhost:3000', 'http://localhost:5000'];

    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
  exposedHeaders: ['Content-Length', 'Content-Type'],
};

const staticFileOptions = {
  maxAge: process.env.NODE_ENV === 'production' ? '1d' : 0,
  etag: true,
  lastModified: true,
  setHeaders: (res) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    if (process.env.NODE_ENV === 'production') {
      res.setHeader('Cache-Control', 'public, max-age=86400');
    }
  },
};

export const configureExpress = async (app) => {
  try {
    // Static file serving before security middleware
    app.use(express.static(paths.publicDir, staticFileOptions));
    app.use(
      '/uploads',
      express.static(paths.uploadsDir, {
        ...staticFileOptions,
        index: false,
      })
    );

    // Security middleware
    app.use(
      helmet({
        crossOriginResourcePolicy: { policy: 'cross-origin' },
        contentSecurityPolicy: process.env.NODE_ENV === 'production',
        crossOriginEmbedderPolicy: false,
      })
    );
    app.use(cors(corsOptions));
    app.use(mongoSanitize());

    // Body parsing
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: true, limit: '10mb' }));
    app.use(sanitizeRequest());

    // Logging
    if (process.env.NODE_ENV !== 'test') {
      app.use(requestLogger);
      app.use(morganMiddleware);
    }

    // Compression
    app.use(
      compression({
        filter: (req, res) => {
          if (req.headers['x-no-compression']) {
            return false;
          }
          return compression.filter(req, res);
        },
        threshold: 1024,
      })
    );

    // Health check endpoint
    app.get('/health', (req, res) => {
      res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
      });
    });

    // Error handling must be last
    app.use(errorHandler);

    logger.info('Express configured successfully', {
      environment: process.env.NODE_ENV,
      security: {
        cors: true,
        helmet: true,
        mongoSanitize: true,
      },
      features: {
        compression: true,
        staticFiles: true,
        logging: process.env.NODE_ENV !== 'test',
      },
    });
  } catch (error) {
    logger.error('Failed to configure Express:', error);
    throw error;
  }
};
