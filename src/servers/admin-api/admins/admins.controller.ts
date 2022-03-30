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
        return response.status(201).json({});
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
  