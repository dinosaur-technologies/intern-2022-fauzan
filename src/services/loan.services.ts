import {
  ConflictException,
  NotFoundException,
} from "@exceptions/http-exception";
import {
  LoanBookParams,
  FindLoanParams,
  DeleteLoanParams,
} from "@interfaces/loan.interface";
import { Logger } from "@providers/logger.provider";
import { repositories } from "@repositories/index.repository";

export class BookService {
  private readonly logger = Logger("LoanService");

  async loanBook(params: { data: LoanBookParams }) {
    const newLoan = await repositories.loans.create(params);

    if (!newLoan) {
      throw new ConflictException("Request could not be processed");
    }

    return newLoan;
  }

  async findLoan(params: FindLoanParams) {
    const { userId } = params;
    const existingLoan = await repositories.loans.findByUserId(userId);

    if (!existingLoan) {
      throw new NotFoundException("Existing loans not found");
    }

    return existingLoan;
  }

  async deleteLoan(params: DeleteLoanParams) {
    const { id } = params;
    const existingLoan = await repositories.loans.deleteById(id);

    if (!existingLoan) {
      throw new NotFoundException("Existing loans not found");
    }

    return existingLoan;
  }
}
