import {
  ExpressNextFunction,
  ExpressRequest,
  ExpressResponse,
} from '@interfaces/express.interface';

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
} from '@decorators/express';
import { Logger } from '@providers/logger.provider';
import { validate } from '@utils/validate.util';
import { LoanDto } from '@servers/public-api/loans/loans.dto';
import { services } from '@services/index.service';
import { FilterLoanParams } from '@interfaces/loan.interface';

@Controller('/loans')
export class LoansController {
  private readonly logger = Logger('LoansController');

  @Get('/:userID')
  async getByUserID(
    @Params('userID') userID: string,
    @Request() request: ExpressRequest,
    @Response() response: ExpressResponse,
    @Next() next: ExpressNextFunction
  ) {
    try {
      const { userID } = request.params;
      const loan = await services.loans.listByUserId({ userId: Number(userID) }, request);
      return response.status(200).json(loan);
    } catch (error) {
      this.logger.fatal(error);
      next(error);
    }
  }

  @Get('/')
  async list(
    @Request() request: ExpressRequest,
    @Response() response: ExpressResponse,
    @Next() next: ExpressNextFunction
  ) {
    try {
      const filter = request.query.filter as FilterLoanParams;
      const loan = await services.loans.list(filter, request);
      return response.status(200).json(loan);
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
      const loan = await services.loans.deleteLoan({ id: Number(ID) });
      return response.sendStatus(204);
    } catch (error) {
      this.logger.fatal(error);
      next(error);
    }
  }
}
