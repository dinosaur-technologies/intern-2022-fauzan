import {
  ConflictException,
  NotFoundException,
} from "@exceptions/http-exception";
import { LoanBook, FindLoan, DeleteLoan } from "@interfaces/loan.interface";
import { Logger } from "@providers/logger.provider";
import { repositories } from "@repositories/index.repository";

export class BookService {
  private readonly logger = Logger("BookService");

  async loanBook(params: { data: LoanBook }) {
    const newLoan = await repositories.loans.create(params);

    if (!newLoan) {
      throw new ConflictException("Request could not be processed");
    }

    return newLoan;
  }

  async findLoan(params: FindLoan) {
    const { userId } = params;
    const existingLoan = await repositories.loans.findByUserId(userId);

    if (!existingLoan) {
      throw new NotFoundException("Existing loans not found");
    }

    return existingLoan;
  }

  async deleteLoan(params: DeleteLoan) {
    const { id } = params;
    const existingLoan = await repositories.loans.deleteById(id);

    if (!existingLoan) {
      throw new NotFoundException("Existing loans not found");
    }

    return existingLoan;
  }
}
