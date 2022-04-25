import {
  ExpressNextFunction,
  ExpressRequest,
  ExpressResponse,
} from '@interfaces/express.interface';

import { Controller, Get, Next, Post, Put, Request, Response } from '@decorators/express';
import { Logger } from '@providers/logger.provider';
import { validate } from '@utils/validate.util';
import { SignUpDto, ResetPassDto } from '@servers/user-api/users/users.dto';
import { services } from '@services/index.service';

@Controller('/users')
export class UsersController {
  private readonly logger = Logger('UsersController');

  @Post('/')
  async create(
    @Request() request: ExpressRequest,
    @Response() response: ExpressResponse,
    @Next() next: ExpressNextFunction
  ) {
    try {
      const body = await validate<SignUpDto>(SignUpDto, request.body);
      const account = await services.users.signup(request.body);
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
      const account = await services.users.signin(request.body);
      request.session.account = account;
      return response.status(200).json({ message: 'Login successful' });
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
      const data = await services.users.resetPassword(request.body);
      return response.status(200).json(data);
    } catch (error) {
      this.logger.fatal(error);
      next(error);
    }
  }
}
