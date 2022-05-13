import { NextFunction, Request, Response } from 'express';
import { dayjs } from '@utils/dayjs.util';

export const responseMiddleware = () => {
  return (body: Object, req: Request, res: Response) => {
    const timestamp = dayjs().utc().format();

    if (Array.isArray(body['items']) && body['pagination']) {
      return res.json({
        data: {
          items: body['items'],
          pagination: body['pagination'],
          meta: {
            requestId: req.id,
            resource: req.originalUrl,
            statusCode: res.statusCode,
            timestamps: timestamp,
          },
        },
      });
    } else {
      const data = body;
      return res.json({
        data,
        meta: {
          requestId: req.id,
          resource: req.originalUrl,
          statusCode: res.statusCode,
          timestamps: timestamp,
        },
      });
    }
  };
};
