import express from 'express';
import * as controller from '../Controllers/seederController.js';
const seedRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Seeder
 *   description: Database seeding operations (Development only)
 */

/**
 * @swagger
 * /api/seed:
 *   get:
 *     summary: Seed the database with sample data
 *     description: |
 *       Seeds the database with sample products and users.
 *       This endpoint is only available in development mode.
 *       WARNING - This will clear existing data before seeding.
 *       Use query parameter 'clean=true' to clean and re-download all images before seeding.
 *     tags: [Seeder]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: clean
 *         schema:
 *           type: boolean
 *         description: If true, cleans existing images before seeding. If false or omitted, reuses existing images.
 *         example: true
 *         required: false
 *     responses:
 *       200:
 *         description: Database seeded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Database seeded successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     users:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/User'
 *                       description: List of created users
 *                     products:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Product'
 *                       description: List of created products
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
seedRouter.get('/', controller.seedDatabase);

export default seedRouter;
