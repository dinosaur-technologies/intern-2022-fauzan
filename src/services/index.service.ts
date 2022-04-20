import { AdminService } from './admin.service';
import { UserService } from './user.service';
import { LoanService } from './loan.service';
import { FineService } from './fine.service';
import { BookService } from './book.service';

export const services = {
  admins: new AdminService(),
  books: new BookService(),
  fines: new FineService(),
  loans: new LoanService(),
  users: new UserService(),
};
