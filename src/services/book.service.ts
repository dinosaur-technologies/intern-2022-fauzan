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
import { serializePaginationParams, Pagination } from '@utils/Pagination.util';

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

  async list(params: SortBookParams, params2: FilterBookParams, req: any) {
    const page = serializePaginationParams(req).page;
    const limit = serializePaginationParams(req).limit;

    const total = await repositories.books.count(params2);
    const items = await repositories.books.findMany({
      where: params2,
      orderBy: params,
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      items,
      pagination: new Pagination({
        page,
        limit,
        total,
      }),
    };
  }

  async deleteBook(params: DeleteBookParams) {
    const { id } = params;
    const book = await repositories.books.deleteById(id);

    return book;
  }
}
