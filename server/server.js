import 'dotenv/config';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { configureDb } from './Config/configureDb.js';
import { config, paths } from './Config/variables.js';
import { configureExpress } from './Config/express.js';
import { filter } from './Config/filter.js';
import { router } from './Routes/router.js';
import { specs } from './Utils/swagger.js';
import { initializeSeeder } from './Config/seederInitializer.js';
import logger from './Config/logger.js';

const app = express();

const initializeServer = async () => {
  try {
    configureDb();

    initializeSeeder();

    configureExpress(app);

    if (process.env.NODE_ENV !== 'production') {
      app.use('/api-docs', swaggerUi.serve);
      app.get(
        '/api-docs',
        swaggerUi.setup(specs, {
          explorer: true,
          customCss: '.swagger-ui .topbar { display: none }',
          customSiteTitle: 'API Documentation',
        })
      );
      logger.info('Swagger documentation available at /api-docs');
    }

    router(app);
    filter(app);

    app.listen(config.port, () => {
      logger.info(`Server started successfully`, {
        port: config.port,
        environment: process.env.NODE_ENV,
        host: config.host,
      });
    });

    process.on('SIGTERM', gracefulShutdown);
    process.on('SIGINT', gracefulShutdown);
  } catch (error) {
    logger.error('Failed to initialize server:', error);
    process.exit(1);
  }
};

const gracefulShutdown = async () => {
  try {
    logger.info('Received shutdown signal. Starting graceful shutdown...');
    await new Promise((resolve) => app.close(resolve));
    await mongoose.connection.close();
    logger.info('Graceful shutdown completed');
    process.exit(0);
  } catch (error) {
    logger.error('Error during graceful shutdown:', error);
    process.exit(1);
  }
};

initializeServer();
