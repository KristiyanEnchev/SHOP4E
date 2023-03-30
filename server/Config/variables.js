import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const paths = {
  baseDir:
    process.env.NODE_ENV === 'production' ? '/usr/src/app' : process.cwd(),
  get uploadsDir() {
    return path.join(this.baseDir, 'public', 'uploads');
  },
  get publicDir() {
    return path.join(this.baseDir, 'public');
  },
};

export const getMongoUri = () => {
  const isLocal = process.env.NODE_ENV === 'development' && !process.env.DOCKER;
  const host = isLocal ? 'localhost' : 'mongodb';
  return `mongodb://${host}:27017/${process.env.MONGO_DB_NAME}`;
};

export const config = {
  port: process.env.PORT || 3005,
  host: process.env.HOST,
  dbConnection: getMongoUri(),
};

export const storageConfig = {
  type: process.env.STORAGE_TYPE || 'local',
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
  local: {
    basePath: paths.uploadsDir,
    baseUrl: '/uploads',
  },
};
