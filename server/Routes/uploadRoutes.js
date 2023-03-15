import express from 'express';
import multer from 'multer';
import * as controller from '../Controllers/uploadController.js';

const userUploadRouter = express.Router();
const upload = multer();

/**
 * @swagger
 * tags:
 *   name: Upload
 *   description: File upload endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UploadResponse:
 *       type: object
 *       properties:
 *         url:
 *           type: string
 *           format: uri
 *           description: URL of the uploaded file
 *         public_id:
 *           type: string
 *           description: Public ID of the uploaded file in Cloudinary
 */

/**
 * @swagger
 * /api/upload/profile:
 *   post:
 *     summary: Upload profile picture
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Profile image file
 *     responses:
 *       200:
 *         description: Profile image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UploadResponse'
 *       400:
 *         description: Invalid file type or size
 *       401:
 *         description: Not authenticated
 */
userUploadRouter.post(
  '/profile',
  upload.single('file'),
  controller.uploadPicture
);

export default userUploadRouter;
