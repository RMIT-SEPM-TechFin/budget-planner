export interface Project {
  id: string;
  name: string;
  ownerName: string;
  ownerEmail: string;
  members: string[];
  createdAt: Date;
}

export interface Item {
  id: string;
  category: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
}

export interface User {
  name: string;
  email: string;
  photoUrl: string;
}
