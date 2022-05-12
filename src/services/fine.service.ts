import { ConflictException, NotFoundException } from '@exceptions/http-exception';
import { ChargeFineParams, SearchFineParams, DeleteFineParams } from '@interfaces/fine.interface';
import { Logger } from '@providers/logger.provider';
import { repositories } from '@repositories/index.repository';
import { serializePagination } from '@utils/serializePagination.util';

export class FineService {
  private readonly logger = Logger('FineService');

  async chargeFine(params: ChargeFineParams) {
    const newFine = await repositories.fines.create({ data: params });

    if (!newFine) {
      throw new ConflictException('Request could not be processed');
    }

    return newFine;
  }

  async list(params: SearchFineParams, req: any) {
    const page = serializePagination(req).page;
    const limit = serializePagination(req).limit;
    const startIndex = (page - 1) * limit;
    const { loanId } = params;
    const existingFine = await repositories.fines.findByLoanId({
      skip: startIndex,
      take: limit,
      loanId,
    });

    if (!existingFine) {
      throw new NotFoundException('Existing fines not found');
    }

    return existingFine;
  }

  async countFine(params: SearchFineParams) {
    const { loanId } = params;
    const fine = await repositories.fines.count(loanId);
    return fine;
  }

  async deleteFine(params: DeleteFineParams) {
    const { id } = params;
    const existingFine = await repositories.fines.deleteById(id);

    if (!existingFine) {
      throw new NotFoundException('Existing fines not found');
    }

    return existingFine;
  }
}
