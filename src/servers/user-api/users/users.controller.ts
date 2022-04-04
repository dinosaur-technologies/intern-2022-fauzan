import {
    ExpressNextFunction,
    ExpressRequest,
    ExpressResponse,
  } from '@interfaces/express.interface';
  
  import {
    Controller,
    Get,
    Next,
    Post,
    Request,
    Response,
  } from '@decorators/express';
  import { Logger } from '@providers/logger.provider';
  
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
        return response.status(201).json({});
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
        return response.status(200).json({
          message: 'It works!'
        });
      } catch (error) {
        this.logger.fatal(error);
        next(error);
      }
    }
  
    
  }
  