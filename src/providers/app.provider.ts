require('source-map-support').install();
import { attachControllers } from '@decorators/express';
import { globalErrorHandler } from '@middlewares/error.middleware';
import { Logger } from '@providers/logger.provider';
import express, { json, urlencoded } from 'express';
import { Router } from 'express';
import requestID from 'express-request-id';
import morgan from 'morgan';
import session from 'express-session';

export const init = (name: string, controllers: any[], origin?: string[]) => {
  if (!name) {
    throw new Error('Application name is required');
  }

  const app = express();
  const logger = Logger(name);

  morgan.token('requestID', (req) => {
    return req.id;
  });

  app.use(
    json(),
    urlencoded({
      extended: false,
    })
  );

  app.set('trust proxy', 1);

  app.use(
    session({
      secret: 'keyboard cat',
      resave: true,
      cookie: { maxAge: 60000 },
      saveUninitialized: true,
    })
  );

  const router = Router();
  attachControllers(router, controllers);
  app.use(json());
  app.use('/v1', router);

  app.use(globalErrorHandler());

  return {
    app,
    logger,
  };
};
