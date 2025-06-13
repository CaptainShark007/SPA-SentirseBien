export interface UserCreate {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  phone?: string;
  license?: string;
  specialty?: string;
  role: 'CUSTOMER' | 'PROFESSIONAL';
}

export interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  createAt: string;
  updateAt: string;
  roleName: 'CUSTOMER' | 'PROFESSIONAL' | 'ADMIN';
}
