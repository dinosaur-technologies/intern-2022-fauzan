import { IsDefined, IsEmail, MinLength, MaxLength, IsInt } from 'class-validator';

export class SignUpDto {
  @IsDefined({
    message: 'Email is required',
  })
  @IsEmail()
  email: string;

  @IsDefined({
    message: 'Username is required',
  })
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsDefined({
    message: 'Password is required',
  })
  @MinLength(4)
  password: string;
}

export class ResetPassDto {
  @IsDefined({
    message: 'New Password is required',
  })
  @MinLength(4)
  newPassword: string;
}

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

  @MaxLength(50, {
    message: 'Reach maximum length of words',
  })
  description: string;

  @IsDefined({
    message: 'Outlet name is required',
  })
  @IsInt()
  createdBy: number;
}
