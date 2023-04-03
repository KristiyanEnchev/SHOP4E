import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import crypto from 'crypto';
import { paths } from '../Config/variables.js';

class ImageService {
  constructor() {
    this.storageType = process.env.STORAGE_TYPE || 'local';
    this.uploadPath = paths.uploadsDir;

    if (this.storageType === 'cloudinary') {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });
    }
  }

  async initialize() {
    if (this.storageType === 'local') {
      await fs.mkdir(this.uploadPath, { recursive: true });
    }
  }

  async uploadImage(file, folder = 'general') {
    if (this.storageType === 'cloudinary') {
      return this.uploadToCloudinary(file, folder);
    }
    return this.uploadToLocal(file, folder);
  }

  async uploadMultipleImages(files, folder = 'general') {
    return Promise.all(files.map((file) => this.uploadImage(file, folder)));
  }

  async uploadToCloudinary(file, folder) {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(file.buffer);
    });
    return result.secure_url;
  }

  async uploadToLocal(file, folder) {
    const fileId = crypto.randomBytes(16).toString('hex');
    const fileExtension = path.extname(file.originalname);
    const fileName = `${fileId}${fileExtension}`;
    const folderPath = path.join(this.uploadPath, folder);
    const filePath = path.join(folderPath, fileName);

    await fs.mkdir(folderPath, { recursive: true });

    const metadata = await sharp(file.buffer).metadata();
    const hasAlpha = metadata.hasAlpha || metadata.channels === 4;

    const processedImage = await sharp(file.buffer)
      .resize(1920, null, {
        withoutEnlargement: true,
        fit: 'inside',
      })
      .toFormat(hasAlpha ? 'png' : 'jpeg', {
        quality: 80,
        ...(hasAlpha && {
          compressionLevel: 9,
          palette: true,
        }),
      })
      .toBuffer();

    await fs.writeFile(filePath, processedImage);

    return `/uploads/${folder}/${fileName}`;
  }

  async deleteImage(url) {
    if (this.storageType === 'cloudinary') {
      const publicId = this.getCloudinaryPublicId(url);
      await cloudinary.uploader.destroy(publicId);
    } else {
      const filePath = path.join(
        process.cwd(),
        'public',
        new URL(url, 'http://localhost').pathname
      );
      await fs.unlink(filePath).catch(() => {});
    }
  }

  getCloudinaryPublicId(url) {
    const parts = url.split('/');
    return parts[parts.length - 1].split('.')[0];
  }
}

export const imageService = new ImageService();
