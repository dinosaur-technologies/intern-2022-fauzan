import { IsDefined, IsEmail, MinLength, MaxLength } from 'class-validator';

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
