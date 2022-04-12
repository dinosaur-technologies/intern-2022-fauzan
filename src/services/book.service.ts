import {
  NotFoundException,
  ConflictException,
} from "@exceptions/http-exception";
import {
  RegisterBookParams,
  UpdateBookParams,
  FindBookParams,
} from "@interfaces/book.interface";
import { Logger } from "@providers/logger.provider";
import { repositories } from "@repositories/index.repository";

export class BookService {
  private readonly logger = Logger("BookService");

  async registerBook(params: RegisterBookParams ) {
    const {title} = params
    const existing = await repositories.books.findOneByTitle(title);

    if (existing) {
      throw new ConflictException("The title already exist");;
    }

    const newBook = await repositories.books.create({data : params});

    if (!newBook) {
      throw new ConflictException("Request could not be processed");
    }

    return newBook;
  }

  async updateBook(params: UpdateBookParams) {
    
    const { id } = params;
    const existingBook = await repositories.books.findOneById(id);
    const updating = await repositories.books.updateById({
      data: existingBook,
      where: { id },
    });

    if (!updating) {
      throw new NotFoundException("Book Not found");
    }

    return updating;
  }

  async searchBook(params: FindBookParams) {
    const { id } = params;
    const existingBook = await repositories.books.findOneById(id);

    if (!existingBook) {
      throw new NotFoundException("Book Not found");
    }

    return existingBook;
  }

  async sortBook() {
    const allBook = await repositories.books.sortByTitle();

    return allBook;
  }
}
