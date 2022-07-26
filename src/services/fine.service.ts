import { ConflictException, NotFoundException } from '@exceptions/http-exception';
import { ChargeFineParams, SearchFineParams, DeleteFineParams } from '@interfaces/fine.interface';
import { Logger } from '@providers/logger.provider';
import { repositories } from '@repositories/index.repository';
import { serializePaginationParams, Pagination } from '@utils/Pagination.util';

export class FineService {
  private readonly logger = Logger('FineService');

  async chargeFine(params: ChargeFineParams) {
    const newFine = await repositories.fines.create({ data: params });

    if (!newFine) {
      throw new ConflictException('Request could not be processed');
    }

    return newFine;
  }

  async listByLoanId(params: SearchFineParams, req: any) {
    const page = serializePaginationParams(req).page;
    const limit = serializePaginationParams(req).limit;
    const { loanId } = params;
    const total = await repositories.fines.countByLoanId(loanId);
    const items = await repositories.fines.findByLoanId({
      skip: (page - 1) * limit,
      take: limit,
      loanId,
    });

    if (!items) {
      throw new NotFoundException('Existing fines not found');
    }

    return {
      items,
      pagination: new Pagination({
        page,
        limit,
        total,
      }),
    };
  }

  async deleteFine(params: DeleteFineParams) {
    const { id } = params;
    const existingFine = await repositories.fines.deleteById(id);

    if (!existingFine) {
      throw new NotFoundException('Existing fines not found');
    }

    return existingFine;
  }

  async list(req: any) {
    const page = serializePaginationParams(req).page;
    const limit = serializePaginationParams(req).limit;

    const total = await repositories.fines.count();
    const items = await repositories.fines.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      items,
      pagination: new Pagination({
        page,
        limit,
        total,
      }),
    };
  }
}
