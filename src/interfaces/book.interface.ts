export interface RegisterBookParams {
  title: string;
  author: string;
  publisher: string;
  year: number;
  description: string;
  ISBN: string;
  createdBy: number;
}

export interface UpdateBookDetailParams {
  id: number;
  title: string;
  author: string;
  publisher: string;
  year: number;
  description: string;
  ISBN: string;
  createdBy: number;
  createdAt: string;
  updatedAt: string;
}

export interface FindBookParams {
  id: number;
}

export interface SortBookParams {
  title?
  author?
  createdAt?
  year?
}

export interface FilterBookParams {
  title?
  author?
  year?
}

export interface DeleteBookParams {
  id: number;
}

