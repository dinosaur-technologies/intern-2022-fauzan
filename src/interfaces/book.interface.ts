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
}

export interface FindBookParams {
  id: number;
}
