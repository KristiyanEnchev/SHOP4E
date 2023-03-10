import swaggerJsdoc from 'swagger-jsdoc';
import { config } from '../Config/variables.js';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SHOP4E E-Commerce API',
      version: '1.0.0',
      description: 'API documentation for SHOP4E E-Commerce platform',
      contact: {
        name: 'API Support',
        email: 'Kristiyan Enchev',
      },
    },
    servers: [
      {
        url: `http://localhost:${config.port}`,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    './Routes/*.js',
    './Models/*.js',
    './Controllers/*.js',
    './Middleware/*.js',
    './Config/*.js',
  ],
};

export const specs = swaggerJsdoc(options);
