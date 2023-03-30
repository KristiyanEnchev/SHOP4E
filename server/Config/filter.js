import path from 'path';
import { fileURLToPath } from 'url';
import { errorHandler } from '../Utils/errorHandler.js';
import { paths } from './variables.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const allowed = [
  '.js',
  '.css',
  '.png',
  '.jpg',
  '.jpeg',
  '.ico',
  '.webp',
  '.gif',
  '.svg',
];

export const filter = (app) => {
  app.get('*', (req, res) => {
    try {
      if (req.url.startsWith('/uploads/')) {
        const filePath = path.join(
          paths.uploadsDir,
          req.url.replace('/uploads/', '')
        );
        res.sendFile(filePath);
        return;
      }

      if (allowed.some((ext) => req.url.toLowerCase().endsWith(ext))) {
        res.sendFile(path.join(paths.publicDir, req.url));
      } else {
        res.sendFile(path.join(paths.publicDir, 'index.html'));
      }
    } catch (error) {
      errorHandler(error, res, req);
    }
  });
};
