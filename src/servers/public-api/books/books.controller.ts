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
import { services } from '@services/index.service';
import { FilterBookParams, SortBookParams } from '@interfaces/book.interface';

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
      console.log("ini = "+request.session.account.id)
      // const body = await validate<BookDto>(BookDto, request.body);
      // const book = await services.books.registerBook(request.body);

      // return response.status(201).json(book);
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

      
      const sort = request.query.sort as SortBookParams
      const filter = request.query.filter as FilterBookParams
      
      function removeEmptyFields(data: any) {
        Object.keys(data).forEach((key) => {
          if (data[key] === "") {
            delete data[key];
          }
        });
      }

    if(filter != undefined){
      removeEmptyFields(filter)
    }  
    
    console.log("Dri list books " + request.session.account)
      const book = await services.books.list(sort, filter, request);
      return response.status(200).json(book);
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
      const book = await services.books.searchBook({ id: Number(ID) });
      return response.status(200).json(book);
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
      const id = Number(ID);
      const book = await services.books.updateBookDetail(request.body, id);
      return response.status(200).json(book);
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
      const book = await services.books.deleteBook({ id: Number(ID) });
      return response.sendStatus(204);
    } catch (error) {
      this.logger.fatal(error);
      next(error);
    }
  }
}
