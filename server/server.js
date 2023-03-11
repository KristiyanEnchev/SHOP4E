import 'dotenv/config';
import express from 'express';
import { connectDb } from './Config/configureDb.js';
import { config } from './Config/variables.js';
import { expressConfig } from './Config/express.js';
import { filter } from './Config/filter.js';
import { router } from './Routes/router.js';
import { specs } from './Utils/swagger.js';
import swaggerUi from 'swagger-ui-express';

const app = express();

const start = async () => {
  connectDb(config.dbConnection);
  expressConfig(app, express);

  if (process.env.NODE_ENV !== 'production') {
    app.use('/swagger', swaggerUi.serve);
    app.get(
      '/swagger',
      swaggerUi.setup(specs, {
        explorer: true,
        customCss: '.swagger-ui .topbar { display: none }',
        customSiteTitle: 'SHOP4E API Documentation',
      })
    );
    console.log('Swagger documentation available at /swagger');
  }

  router(app);
  filter(app);

  app.listen(config.port, () =>
    console.log(`Server at http://${config.host}:${config.port}`)
  );
};

start();
