import { IsDefined } from 'class-validator';

export class LoanDto {
 
  @IsDefined({
    message: 'Date is required',
  })
  startDate: string;

}
