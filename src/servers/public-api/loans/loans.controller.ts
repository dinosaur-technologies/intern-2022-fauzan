import {
  ExpressNextFunction,
  ExpressRequest,
  ExpressResponse,
} from "@interfaces/express.interface";

import {
  Controller,
  Delete,
  Get,
  Next,
  Params,
  Post,
  Put,
  Request,
  Response,
} from "@decorators/express";
import { Logger } from "@providers/logger.provider";
import { validate } from "@utils/validate.util";
import { LoanDto } from "@servers/public-api/loans/loans.dto";
import { services } from "@services/index.service";

@Controller("/loans")
export class LoansController {
  private readonly logger = Logger("LoansController");

  @Post("/")
  async create(
    @Request() request: ExpressRequest,
    @Response() response: ExpressResponse,
    @Next() next: ExpressNextFunction
  ) {
    try {
      const body = await validate<LoanDto>(LoanDto, request.body);
      const loan = await services.loans.loanBook(request.body);
      return response
        .status(201)
        .json({ message: "Successfully created loan" });
    } catch (error) {
      this.logger.fatal(error);
      next(error);
    }
  }

  @Get("/:userID")
  async get(
    @Params("userID") userID: string,
    @Request() request: ExpressRequest,
    @Response() response: ExpressResponse,
    @Next() next: ExpressNextFunction
  ) {
    try {
      const { userID } = request.params;
      const loan = await services.loans.findLoan({ userId: Number(userID)});
      return response.status(200).json({ loan });
    } catch (error) {
      this.logger.fatal(error);
      next(error);
    }
  }

  @Delete("/:ID")
  async delete(
    @Params("ID") ID: string,
    @Request() request: ExpressRequest,
    @Response() response: ExpressResponse,
    @Next() next: ExpressNextFunction
  ) {
    try {
      const { ID } = request.params;
      const loan = await services.loans.deleteLoan({ id: Number(ID)});
      return response.sendStatus(204);
    } catch (error) {
      this.logger.fatal(error);
      next(error);
    }
  }
}
