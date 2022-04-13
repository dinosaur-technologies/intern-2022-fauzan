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
    Request,
    Response,
  } from '@decorators/express';
  import { Logger } from '@providers/logger.provider';
  import { validate } from '@utils/validate.util';
  import { SignUpDto } from '@servers/admin-api/admins/admin.dto';
  import { services } from '@services/index.service';
  
  @Controller('/admins')
  export class AdminsController {
    private readonly logger = Logger('AdminsController');
  
    @Post('/')
    async create(
      @Request() request: ExpressRequest,
      @Response() response: ExpressResponse,
      @Next() next: ExpressNextFunction
    ) {
      try {
        const body = await validate<SignUpDto>(SignUpDto, request.body);
        const account = await services.admins.signup(request.body);

        return response.status(201).json({account});
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
        return response.sendStatus(204);
      } catch (error) {
        this.logger.fatal(error);
        next(error);
      }
    }
  }
  