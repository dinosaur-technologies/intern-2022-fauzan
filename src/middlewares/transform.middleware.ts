import { NextFunction, Request, Response } from 'express';
import { dayjs } from '@utils/dayjs.util';

export const transform = () => {
  return (body: Object, req: Request, res: Response) => {
    const timestamp = dayjs().utc().format();

    if (Array.isArray(body)) {
      let page = Number(req.query.page);
      let limit = Number(req.query.limit);

      if (page < 1) {
        page = 1;
      }

      const MAX_LIMIT = 2;

      if (limit > MAX_LIMIT) {
        limit = MAX_LIMIT;
      }

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const item = body.slice(startIndex, endIndex);
      const totalRecord = body.length;
      const totalPage = body.length / limit;

      return res.json({
        data: {
          item,
          pagination: {
            page: page,
            limit: limit,
            totalRecords: totalRecord,
            totalPages: totalPage,
          },
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
