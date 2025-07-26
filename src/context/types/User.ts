export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  createdAt?: string;
  birthDate?: string;
}

export interface RegisterData {
  name: string;
  birthDate: string;
  email: string;
  password: string;
  photoURL?: string;
}
