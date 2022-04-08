import { NotFoundException } from "@exceptions/http-exception";
import { RegisterBook, UpdateBook, FindBook } from "@interfaces/book.interface";
import { Logger } from "@providers/logger.provider";
import { repositories } from "@repositories/index.repository";

export class BookService {
  private readonly logger = Logger("BookService");

  async register(params: { data: RegisterBook }) {
    const newBook = await repositories.books.create(params);
    return newBook;
  }

  async updateBook(params: UpdateBook) {
    const { id } = params;
    const updating = await repositories.books.updateById({
      data: params,
      where: { id },
    });

    if (!updating) {
      throw new NotFoundException("Book Not found");
    }

    return updating;
  }

  async searchBook(params: FindBook) {
    const { title } = params;
    const existingBook = await repositories.books.findOneByTitle(title);

    if (!existingBook) {
      throw new NotFoundException("Book Not found");
    }

    return existingBook;
  }

  async sortBook() {
    const allBook = await repositories.books.sortByTitle;

    return allBook;
  }
}
