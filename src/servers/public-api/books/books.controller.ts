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
import { BookDto } from '@servers/public-api/books/books.dto';
import { services } from '@services/index.service'

@Controller('/books')
export class BooksController {
  private readonly logger = Logger('BooksController');

  @Post('/')
  async create(
    @Request() request: ExpressRequest,
    @Response() response: ExpressResponse,
    @Next() next: ExpressNextFunction
  ) {
    try {
      const body = await validate<BookDto>(BookDto, request.body);
      const registerBook = await services.books.registerBook(request.body);
      
      return response.status(201).json({registerBook});
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

      const getbook = await services.books.sortBook();
      return response.status(200).json({
        payload: getbook,
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
      const getbook = await services.books.searchBook({id: Number(ID)})
      return response.status(200).json({getbook});
    } catch (error) {
      this.logger.fatal(error);
      next(error);
    }
  }

  @Put('/:ID')
  async update(
    @Params('ID') ID: string,
    @Request() request: ExpressRequest,
    @Response() response: ExpressResponse,
    @Next() next: ExpressNextFunction
  ) {
    try {
      const { ID } = request.params;
      const id= Number(ID);
      const updatebook = await services.books.updateBookDetail(request.body, id)
      return response.status(200).json({updatebook});
    } catch (error) {
      this.logger.fatal(error);
      next(error);
    }
  }
}
