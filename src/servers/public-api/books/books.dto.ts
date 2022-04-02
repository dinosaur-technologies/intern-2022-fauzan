import { IsDefined } from 'class-validator';

export class BookDto {
  @IsDefined({
    message: 'Outlet name is required',
  })
  name: string;
}
