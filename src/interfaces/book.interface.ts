export interface RegisterBookParams {
  title: string;
  author: string;
  publisher: string;
  year: number;
  description: string;
  ISBN: string;
  createdBy: number;
}

export interface UpdateBookParams {
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
  title: string;
}
