import { UsersRepository } from './user.repository';
import { LoansRepository } from './loan.repository';
import { FinesRepository } from './fine.repository';
import { BooksRepository } from './book.repository';
import { AdminsRepository } from './admin.repository';

export const repositories = {
  admins: new AdminsRepository(),
  books: new BooksRepository(),
  fines: new FinesRepository(),
  loans: new LoansRepository(),
  users: new UsersRepository(),
};