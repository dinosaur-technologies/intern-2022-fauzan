import { IsDefined, MaxLength, IsInt } from 'class-validator';

export class BookDto {
  @IsDefined({
    message: 'Outlet name is required',
  })
  title: string;

  @IsDefined({
    message: 'Outlet name is required',
  })
  author: string;

  @IsDefined({
    message: 'Outlet name is required',
  })
  publisher: string;

  @MaxLength(50,{
    message: 'Reach maximum length of words'
  })
  description: string;

  @IsDefined({
    message: 'Outlet name is required',
  })
  @IsInt()
  createdBy: number;
}
