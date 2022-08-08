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
import { ResetPassDto } from '@servers/admin-api/admins/admin.dto';
import { services } from '@services/index.service';

@Controller('/admin')
export class AdminController {
  private readonly logger = Logger('AdminController');

  @Post('/signin')
  async authenticate(
    @Request() request: ExpressRequest,
    @Response() response: ExpressResponse,
    @Next() next: ExpressNextFunction
  ) {
    try {
      const account = await services.admins.signin(request.body);
      request.session.account = account;

      return response.status(200).json({ message: 'Login sucessful' });
    } catch (error) {
      this.logger.fatal(error);
      next(error);
    }
  }

  @Put('/password-reset')
  async update(
    @Request() request: ExpressRequest,
    @Response() response: ExpressResponse,
    @Next() next: ExpressNextFunction
  ) {
    try {
      const body = await validate<ResetPassDto>(ResetPassDto, request.body);
      const data = await services.admins.resetPassword(request.body);
      return response.status(200).json(data);
    } catch (error) {
      this.logger.fatal(error);
      next(error);
    }
  }
}
