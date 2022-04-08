export interface LoanBook {
    bookId: number;
    userId: number;
    startDate: string;
  }
  
  export interface FindLoan {
    userId: number;
  }
  
  export interface DeleteLoan {
    id: number;
  }
  