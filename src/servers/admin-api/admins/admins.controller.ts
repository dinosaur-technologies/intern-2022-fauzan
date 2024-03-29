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
  Put,
  Request,
  Response,
} from '@decorators/express';
import { Logger } from '@providers/logger.provider';
import { validate } from '@utils/validate.util';
import { SignUpDto, ResetPassDto } from '@servers/admin-api/admins/admin.dto';
import { services } from '@services/index.service';
import { IsAuthenticatedAdmin } from '@middlewares/is-authenticated-admin.middleware';

@Controller(
  '/admins'
  // This is how you would attach the middleware on a controller/resource level
  // [IsAuthenticatedAdmin]
)
export class AdminsController {
  private readonly logger = Logger('AdminsController');

  // This is how you would attach middlewares on a method/HTTP VERB level
  // This basically will run the check inside IsAuthenticatedAdmin(is-authenticated-admin.middleware.ts)
  // Before it hits this method
  @Post('/', [IsAuthenticatedAdmin])
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
}
