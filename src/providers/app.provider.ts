require('source-map-support').install();
import { attachControllers } from '@decorators/express';
import { Logger } from '@providers/logger.provider';
import express, { json, urlencoded } from 'express';
import { Router } from 'express';

export const init = (name: string, controllers: any[], origin?: string[]) => {
  if (!name) {
    throw new Error('Application name is required');
  }

  const app = express();
  const logger = Logger(name);

  app.use(
    json(),
    urlencoded({
      extended: false,
    }),
  );

  app.set('trust proxy', 1);

  const router = Router();
  attachControllers(router, controllers);
  app.use(json());
  app.use('/v1', router);

  return {
    app,
    logger,
  };
};
