import {
  ExpressNextFunction,
  ExpressRequest,
  ExpressResponse,
} from '@interfaces/express.interface';

import {
  Controller,
  Delete,
  Next,
  Params,
  Post,
  Get,
  Put,
  Request,
  Response,
} from '@decorators/express';
import { Logger } from '@providers/logger.provider';
import { validate } from '@utils/validate.util';
import { SignUpDto, BookDto } from '@servers/admin-api/admins/admin.dto';
import { services } from '@services/index.service';
import { IsAuthenticatedAdmin } from '@middlewares/is-authenticated-admin.middleware';

@Controller(
  '/admins',
  // This is how you would attach the middleware on a controller/resource level
  [IsAuthenticatedAdmin]
)
export class AdminsController {
  private readonly logger = Logger('AdminsController');

  // This is how you would attach middlewares on a method/HTTP VERB level
  // This basically will run the check inside IsAuthenticatedAdmin(is-authenticated-admin.middleware.ts)
  // Before it hits this method
  @Post('/')
  async create(
    @Request() request: ExpressRequest,
    @Response() response: ExpressResponse,
    @Next() next: ExpressNextFunction
  ) {
    try {
      const body = await validate<SignUpDto>(SignUpDto, request.body);
      const account = await services.admins.signup(request.body);
      return response.status(201).json(account);
    } catch (error) {
      this.logger.fatal(error);
      next(error);
    }
  }

  @Post('/add-book')
  async createBook(
    @Request() request: ExpressRequest,
    @Response() response: ExpressResponse,
    @Next() next: ExpressNextFunction
  ) {
    try {
      Object.assign(request.body, { createdBy: request.session.account.id });

      const body = await validate<BookDto>(BookDto, request.body);
      const book = await services.books.registerBook(request.body);

      return response.status(201).json(book);
    } catch (error) {
      this.logger.fatal(error);
      next(error);
    }
  }

  @Delete('/:ID')
  async delete(
    @Params('ID') ID: string,
    @Request() request: ExpressRequest,
    @Response() response: ExpressResponse,
    @Next() next: ExpressNextFunction
  ) {
    try {
      const { ID } = request.params;
      const admin = await services.admins.deleteAdmin({ id: Number(ID) });
      return response.sendStatus(204);
    } catch (error) {
      this.logger.fatal(error);
      next(error);
    }
  }

  @Put('/loan/:LoanID')
  async updateLoan(
    @Params('LoanID') LoanID: string,
    @Request() request: ExpressRequest,
    @Response() response: ExpressResponse,
    @Next() next: ExpressNextFunction
  ) {
    try {
      const { LoanID } = request.params;
      const id = Number(LoanID);
      const loan = await services.loans.updateLoanDetail(request.body, id);
      return response.status(200).json(loan);
    } catch (error) {
      this.logger.fatal(error);
      next(error);
    }
  }

  @Put('/fines/:FineID')
  async updateFine(
    @Params('FineID') FineID: string,
    @Request() request: ExpressRequest,
    @Response() response: ExpressResponse,
    @Next() next: ExpressNextFunction
  ) {
    try {
      const { FineID } = request.params;
      const id = Number(FineID);
      const fine = await services.fines.updateLoanDetail(request.body, id);
      return response.status(200).json(fine);
    } catch (error) {
      this.logger.fatal(error);
      next(error);
    }
  }
}
