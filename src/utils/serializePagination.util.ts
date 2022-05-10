import { ExpressRequest } from '@interfaces/express.interface';

const MAX_LIMIT = 2;

export function serializePagination(request: ExpressRequest) {
  let page = Number(request.query.page);
  let limit = Number(request.query.limit);

  if (page < 1) {
    page = 1;
  }

  if (limit > MAX_LIMIT) {
    limit = MAX_LIMIT;
  }

  return {
    page,
    limit,
  };
}
