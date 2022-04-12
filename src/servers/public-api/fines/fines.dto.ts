import { IsDefined } from 'class-validator';

export class FineDto {
 
  @IsDefined({
    message: 'Value is requred',
  })
  value: string;

}