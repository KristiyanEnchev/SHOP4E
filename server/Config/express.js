import cors from 'cors';
import { paths } from './variables.js';

const whitelist = ['http://localhost:3000', 'http://localhost:5000'];

export const expressConfig = (app, express) => {
  app.use(express.static(paths.publicDir));

  app.use(
    '/uploads',
    express.static(paths.uploadsDir, {
      maxAge: process.env.NODE_ENV === 'production' ? '1d' : 0,
      etag: true,
      lastModified: true,
      index: false,
      setHeaders: (res) => {
        res.set('X-Content-Type-Options', 'nosniff');
        if (process.env.NODE_ENV === 'production') {
          res.set('Cache-Control', 'public, max-age=86400');
        }
      },
    })
  );

  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || whitelist.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  app.use((error, req, res, next) => {
    try {
      if (res.headersSent) {
        return next(error);
      }

      if (error.type === 'entity.too.large') {
        return res.status(413).json({
          message: 'File size too large',
          code: 413,
        });
      }

      res.status(error.code || 500).json({
        message: error.message || 'An unknown error occurred!',
        code: error.code || 500,
      });
    } catch (err) {
      errorHandler(err, res, req);
    }
  });
};
