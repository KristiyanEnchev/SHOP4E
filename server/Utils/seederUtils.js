import axios from 'axios';
import fs from 'fs/promises';
import sharp from 'sharp';
import path from 'path';
import { imageService } from '../services/ImageService.js';
import { paths } from '../Config/variables.js';

const getFileExtensionFromUrl = (url) => {
  const urlPath = new URL(url).pathname;
  const extension = path.extname(urlPath);

  if (extension) {
    return extension;
  }

  if (url.includes('?')) {
    const params = new URLSearchParams(new URL(url).search);
    if (params.has('format')) {
      return `.${params.get('format')}`;
    }
  }

  return '.jpg';
};

const getLocalFileName = (url) => {
  const urlWithoutQuery = url.split('?')[0];
  const urlParts = urlWithoutQuery.split('/');
  const lastPart = urlParts[urlParts.length - 1];

  if (path.extname(lastPart)) {
    return lastPart;
  }

  const extension = getFileExtensionFromUrl(url);
  const cleanName = lastPart.replace(/[^a-zA-Z0-9]/g, '_');
  return `${cleanName}${extension}`;
};

const imageExists = async (folder, fileName) => {
  try {
    await fs.access(path.join(paths.uploadsDir, folder, fileName));
    return true;
  } catch {
    return false;
  }
};

const formatLocalUrl = (path) => {
  return `http://localhost:${process.env.PORT || 5000}${path}`;
};

const detectImageType = async (buffer) => {
  const metadata = await sharp(buffer).metadata();
  return {
    hasAlpha: metadata.hasAlpha || metadata.channels === 4,
    format: metadata.format,
  };
};

export const downloadAndStoreImage = async (url, folder) => {
  try {
    const fileName = getLocalFileName(url);
    const exists = await imageExists(folder, fileName);

    if (exists && process.env.STORAGE_TYPE === 'local') {
      console.log(`Skipping existing image: ${fileName}`);
      const localPath = `/uploads/${folder}/${fileName}`;
      return formatLocalUrl(localPath);
    }

    console.log(`Downloading new image: ${fileName}`);
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
      validateStatus: (status) => status === 200,
      headers: {
        Accept: 'image/*',
      },
    });

    const buffer = Buffer.from(response.data);
    const imageInfo = await detectImageType(buffer);

    const file = {
      buffer,
      originalname: imageInfo.hasAlpha
        ? fileName.replace(/\.[^/.]+$/, '.png')
        : fileName,
      mimetype: imageInfo.hasAlpha ? 'image/png' : 'image/jpeg',
    };

    const localPath = await imageService.uploadImage(file, folder);
    return formatLocalUrl(localPath);
  } catch (error) {
    console.error(`Failed to download image from ${url}:`, error);
    return url;
  }
};

export const processSeederData = async (data) => {
  if (process.env.STORAGE_TYPE === 'local') {
    console.log('Starting seed data processing...');

    for (const [index, product] of data.products.entries()) {
      console.log(
        `Processing product ${index + 1}/${data.products.length}: ${
          product.name
        }`
      );
      product.image = await downloadAndStoreImage(product.image, 'products');
      if (product.images) {
        product.images = await Promise.all(
          product.images.map(async (img, imgIndex) => {
            console.log(
              `  Processing product image ${imgIndex + 1}/${
                product.images.length
              }`
            );
            return downloadAndStoreImage(img, 'products');
          })
        );
      }
    }

    for (const [index, banner] of data.banners.entries()) {
      console.log(
        `Processing banner ${index + 1}/${data.banners.length}: ${
          banner.buttonText
        }`
      );
      banner.img = await downloadAndStoreImage(banner.img, 'banners');
    }

    for (const [index, user] of data.users.entries()) {
      if (user.profile?.avatar) {
        console.log(
          `Processing user ${index + 1}/${data.users.length} avatar: ${
            user.name
          }`
        );
        user.profile.avatar = await downloadAndStoreImage(
          user.profile.avatar,
          'avatars'
        );
      }
    }

    console.log('Seed data processing complete!');
  }
  return data;
};

export const cleanUploadedImages = async () => {
  try {
    console.log('Cleaning uploaded images...');
    const folders = ['products', 'banners', 'avatars'];

    for (const folder of folders) {
      const folderPath = path.join(paths.uploadsDir, folder);
      await fs.rm(folderPath, { recursive: true, force: true });
      await fs.mkdir(folderPath, { recursive: true });
      console.log(`Cleaned ${folder} folder`);
    }

    console.log('All image folders cleaned');
  } catch (error) {
    console.error('Error cleaning images:', error);
  }
};
