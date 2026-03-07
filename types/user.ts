export interface User {
  email: string;
  username: string;
  avatar: string; 
}

export interface RegisterData {
  email: string;
  username: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
} 