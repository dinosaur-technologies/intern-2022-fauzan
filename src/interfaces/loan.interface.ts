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

export interface FilterLoanParams {
  status?;
}

export interface UpdateLoanDetailParams {
  status: string;
}
