import { ConflictException, NotFoundException } from '@exceptions/http-exception';
import {
  LoanBookParams,
  FindLoanParams,
  DeleteLoanParams,
  FilterLoanParams,
  UpdateLoanDetailParams,
} from '@interfaces/loan.interface';
import { Logger } from '@providers/logger.provider';
import { repositories } from '@repositories/index.repository';
import { serializePaginationParams, Pagination } from '@utils/Pagination.util';

export class LoanService {
  private readonly logger = Logger('LoanService');

  async loanBook(params: LoanBookParams) {
    const newLoan = await repositories.loans.create({ data: params });

    if (!newLoan) {
      throw new ConflictException('Request could not be processed');
    }

    return newLoan;
  }

  async listByUserId(params: FindLoanParams, req) {
    const page = serializePaginationParams(req).page;
    const limit = serializePaginationParams(req).limit;
    const { userId } = params;
    const total = await repositories.loans.countByUserId(userId);
    const items = await repositories.loans.findByUserId({
      skip: (page - 1) * limit,
      take: limit,
      userId,
    });

    if (!items) {
      throw new NotFoundException('Existing loans not found');
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

  async deleteLoan(params: DeleteLoanParams) {
    const { id } = params;
    const existingLoan = await repositories.loans.deleteById(id);

    if (!existingLoan) {
      throw new NotFoundException('Existing loans not found');
    }

    return existingLoan;
  }

  async list(params: FilterLoanParams, req: any) {
    const page = serializePaginationParams(req).page;
    const limit = serializePaginationParams(req).limit;

    const total = await repositories.loans.count();
    const items = await repositories.loans.findMany({
      where: params,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        books: true,
        users: {
          select: {
            username: true,
          },
        },
      },
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

  async updateLoanDetail(params: UpdateLoanDetailParams, id: number) {
    const newLoanDetail = await repositories.loans.updateById({
      data: params,
      where: { id },
    });

    if (!newLoanDetail) {
      throw new NotFoundException('Loan Not found');
    }

    return newLoanDetail;
  }
}
