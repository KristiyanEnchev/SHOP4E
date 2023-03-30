import { imageService } from '../services/ImageService.js';

export const uploadPicture = async (req, res) => {
  try {
    const url = await imageService.uploadImage(req.file, 'avatars');
    res.send({ url });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload image' });
  }
};

export const uploadMultiplePictures = async (req, res) => {
  try {
    const urls = await imageService.uploadMultipleImages(req.files, 'avatars');
    res.send({ urls });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload images' });
  }
};
