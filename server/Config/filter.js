// filter.js
import path from 'path';
import { fileURLToPath } from 'url';
import { AppError } from '../Utils/AppError.js';
import logger from './logger.js';
import { paths } from './variables.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ALLOWED_EXTENSIONS = new Set([
  '.js',
  '.css',
  '.png',
  '.jpg',
  '.jpeg',
  '.ico',
  '.webp',
  '.gif',
  '.svg',
]);

const validateFilePath = (filePath, baseDir) => {
  const normalizedPath = path.normalize(filePath).toLowerCase();
  const resolvedPath = path.resolve(baseDir, normalizedPath);
  if (!resolvedPath.startsWith(path.resolve(baseDir))) {
    throw new AppError('Invalid file path', 403);
  }
  return resolvedPath;
};

const hasAllowedExtension = (url) => {
  const ext = path.extname(url).toLowerCase();
  return ALLOWED_EXTENSIONS.has(ext);
};

export const filter = (app) => {
  app.use((req, res, next) => {
    const start = Date.now();

    res.on('finish', () => {
      const duration = Date.now() - start;
      logger.info(
        `${req.method} ${req.path} ${res.statusCode} - ${duration}ms`
      );
    });

    try {
      if (req.url.startsWith('/uploads/')) {
        const filePath = validateFilePath(
          req.url.replace('/uploads/', ''),
          paths.uploadsDir
        );
        return res.sendFile(filePath);
      }

      if (hasAllowedExtension(req.url)) {
        const filePath = validateFilePath(req.url, paths.publicDir);
        return res.sendFile(filePath);
      }

      return res.sendFile(path.join(paths.publicDir, 'index.html'));
    } catch (error) {
      logger.error('Filter error:', error);
      if (error instanceof AppError) {
        return next(error);
      }
      return next(new AppError('Internal server error', 500));
    }
  });
};
