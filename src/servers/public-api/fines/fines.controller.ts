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
  Request,
  Response,
} from '@decorators/express';
import { Logger } from '@providers/logger.provider';
import { validate } from '@utils/validate.util';
import { FineDto } from '@servers/public-api/fines/fines.dto';
import { services } from '@services/index.service';

@Controller('/fines')
export class FinesController {
  private readonly logger = Logger('FinesController');

  @Post('/')
  async create(
    @Request() request: ExpressRequest,
    @Response() response: ExpressResponse,
    @Next() next: ExpressNextFunction
  ) {
    try {
      const body = await validate<FineDto>(FineDto, request.body);
      const fine = await services.fines.chargeFine(request.body);

      return response.status(201).json({ message: 'Fine had been charged' });
    } catch (error) {
      this.logger.fatal(error);
      next(error);
    }
  }

  @Get('/:loanID')
  async get(
    @Params('loanID') loanID: string,
    @Request() request: ExpressRequest,
    @Response() response: ExpressResponse,
    @Next() next: ExpressNextFunction
  ) {
    try {
      const { loanID } = request.params;
      const fine = await services.fines.searchFine({
        loanId: Number(loanID),
      });

      return response.status(200).json({ fine });
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
      const fine = await services.fines.deleteFine({ id: Number(ID) });
      return response.sendStatus(204);
    } catch (error) {
      this.logger.fatal(error);
      next(error);
    }
  }
}
