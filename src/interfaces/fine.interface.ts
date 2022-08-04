export interface ChargeFineParams {
  value: string;
  loanId: number;
}

export interface SearchFineParams {
  loanId: number;
}

export interface DeleteFineParams {
  id: number;
}

export interface UpdateFineDetailParams {
  status: string;
  value: string;
}
