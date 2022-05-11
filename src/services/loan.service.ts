import { ConflictException, NotFoundException } from '@exceptions/http-exception';
import { LoanBookParams, FindLoanParams, DeleteLoanParams } from '@interfaces/loan.interface';
import { Logger } from '@providers/logger.provider';
import { repositories } from '@repositories/index.repository';
import { serializePagination } from '@utils/serializePagination.util';

export class LoanService {
  private readonly logger = Logger('LoanService');

  async loanBook(params: LoanBookParams) {
    const newLoan = await repositories.loans.create({ data: params });

    if (!newLoan) {
      throw new ConflictException('Request could not be processed');
    }

    return newLoan;
  }

  async findLoan(params: FindLoanParams, req) {
    const page = serializePagination(req).page;
    const limit = serializePagination(req).limit;
    const startIndex = (page - 1) * limit;
    const { userId } = params;
    const existingLoan = await repositories.loans.findByUserId( {
      skip: startIndex,
      take: limit,
      userId,
    });

    if (!existingLoan) {
      throw new NotFoundException('Existing loans not found');
    }

    return existingLoan;
  }

  async deleteLoan(params: DeleteLoanParams) {
    const { id } = params;
    const existingLoan = await repositories.loans.deleteById(id);

    if (!existingLoan) {
      throw new NotFoundException('Existing loans not found');
    }

    return existingLoan;
  }
}
