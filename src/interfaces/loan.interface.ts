export interface LoanBookParams {
    bookId: number;
    userId: number;
    startDate: string;
  }
  
  export interface FindLoanParams {
    userId: number;
  }
  
  export interface DeleteLoanParams {
    id: number;
  }
  