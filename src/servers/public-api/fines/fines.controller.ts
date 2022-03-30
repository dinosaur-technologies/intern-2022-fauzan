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
  
    @Get('/:ID')
    async get(
      @Params('ID') ID: string,
      @Request() request: ExpressRequest,
      @Response() response: ExpressResponse,
      @Next() next: ExpressNextFunction
    ) {
      try {
        const { ID } = request.params;
        return response.status(200).json({});
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
  