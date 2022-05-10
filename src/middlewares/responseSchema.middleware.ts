import { NextFunction, Request, Response } from 'express';
import { dayjs } from '@utils/dayjs.util';
import { serializePagination } from '@utils/serializePagination.util';

export const responseSchema = () => {
  return (body: Object, req: Request, res: Response) => {
    const timestamp = dayjs().utc().format();

    if (Array.isArray(body)) {
      const page = serializePagination(req).page;
      const limit = serializePagination(req).limit;

      return res.json({
        data: {
          body,
          pagination: {
            page: page,
            limit: limit,
            // totalRecords: totalRecord,
            // totalPages: totalPage,
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
