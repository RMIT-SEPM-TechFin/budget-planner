export interface Project {
  id: string;
  name: string;
  ownerName: string;
  ownerEmail: string;
  members: string[];
  createdAt: Date;
}

export interface User {
  name: string;
  email: string;
  photoUrl: string;
}
