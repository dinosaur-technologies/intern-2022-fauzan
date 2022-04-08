export interface RegisterBook {
  title: string;
  author: string;
  publisher: string;
  year: number;
  description: string;
  ISBN: string;
  createdBy: number;
}

export interface UpdateBook {
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

export interface FindBook {
  title: string;
}
