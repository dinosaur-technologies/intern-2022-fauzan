import {
  ExpressNextFunction,
  ExpressRequest,
  ExpressResponse,
} from '@interfaces/express.interface';

import { Controller, Get, Next, Post, Put, Request, Response } from '@decorators/express';
import { Logger } from '@providers/logger.provider';
import { validate } from '@utils/validate.util';
import { LoanDto } from '@servers/user-api/users/users.dto';
import { services } from '@services/index.service';

@Controller('/users')
export class UsersController {
  private readonly logger = Logger('UsersController');

  @Post('/loan-book')
  async create(
    @Request() request: ExpressRequest,
    @Response() response: ExpressResponse,
    @Next() next: ExpressNextFunction
  ) {
    try {
      const body = await validate<LoanDto>(LoanDto, request.body);
      const loan = await services.loans.loanBook(request.body);
      return response.status(201).json(loan);
    } catch (error) {
      this.logger.fatal(error);
      next(error);
    }
  }
}
