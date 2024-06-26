export interface Project {
  Project: any;
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

export interface Plan {
  id: string;
  name: string;
  items: string[];
}

export interface User {
  name: string;
  email: string;
  photoUrl: string;
}

export interface ComparisonProps {
  [id: string]: string | undefined;
}

export interface Chat {
  id: string;
  authorName: string;
  authorEmail: string;
  text: string;
  createdAt: Date;
}
