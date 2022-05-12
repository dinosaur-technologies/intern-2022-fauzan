import { NotFoundException, ConflictException } from '@exceptions/http-exception';
import {
  RegisterBookParams,
  UpdateBookDetailParams,
  FindBookParams,
  SortBookParams,
  DeleteBookParams,
  FilterBookParams,
} from '@interfaces/book.interface';
import { Logger } from '@providers/logger.provider';
import { repositories } from '@repositories/index.repository';
import { serializePagination } from '@utils/serializePagination.util';

export class BookService {
  private readonly logger = Logger('BookService');

  async registerBook(params: RegisterBookParams) {
    const { title } = params;
    const existing = await repositories.books.findOneByTitle(title);

    if (existing) {
      throw new ConflictException('The title already exist');
    }

    const newBook = await repositories.books.create({ data: params });

    if (!newBook) {
      throw new ConflictException('Request could not be processed');
    }

    return newBook;
  }

  async updateBookDetail(params: UpdateBookDetailParams, id: number) {
    const newBookDetail = await repositories.books.updateById({
      data: params,
      where: { id },
    });

    if (!newBookDetail) {
      throw new NotFoundException('Book Not found');
    }

    return newBookDetail;
  }

  async searchBook(params: FindBookParams) {
    const { id } = params;
    const existingBook = await repositories.books.findOneById(id);

    if (!existingBook) {
      throw new NotFoundException('Book Not found');
    }

    return existingBook;
  }

  async sortBook(params: SortBookParams, params2: FilterBookParams, req: any) {
    const page = serializePagination(req).page;
    const limit = serializePagination(req).limit;
    const startIndex = (page - 1) * limit;
    const allBook = await repositories.books.list({
      where: params2,
      orderBy: params,
      skip: startIndex,
      take: limit,
    });

    return allBook;
  }

  async countBook(params: FilterBookParams) {
    const book = await repositories.books.count(params);
    return book;
  }

  async deleteBook(params: DeleteBookParams) {
    const { id } = params;
    const book = await repositories.books.deleteById(id);

    return book;
  }
}
