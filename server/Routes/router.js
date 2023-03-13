import authRouter from './authRoutes.js';
import productRouter from './producRoutes.js';
import seedRouter from './seederRouter.js';
import userUploadRouter from './uploadRoutes.js';
import userRouter from './userRoutes.js';

export const router = (app) => {
  /**
   * @swagger
   * components:
   *   securitySchemes:
   *     bearerAuth:
   *       type: http
   *       scheme: bearer
   *       bearerFormat: JWT
   *   responses:
   *     UnauthorizedError:
   *       description: Access token is missing or invalid
   *     ForbiddenError:
   *       description: Not authorized to access this resource
   *     ValidationError:
   *       description: Invalid input data
   *     NotFoundError:
   *       description: Resource not found
   *     ServerError:
   *       description: Internal server error
   */

  /**
   * @swagger
   * tags:
   *   - name: Users
   *     description: User management endpoints
   *   - name: Authentication
   *     description: Authentication endpoints
   *   - name: Products
   *     description: Product management endpoints
   *   - name: Upload
   *     description: File upload endpoints
   *   - name: Seeder
   *     description: Database seeding endpoints (Development only)
   */

  /**
   * @swagger
   * servers:
   *   - url: /api
   *     description: API Base URL
   */

  app.use('/api/auth', authRouter);
  app.use('/api/users', userRouter);
  app.use('/api/seed', seedRouter);
  app.use('/api/upload', userUploadRouter);
  app.use('/api/products', productRouter);
};
