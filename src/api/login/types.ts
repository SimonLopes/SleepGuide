export type UserDTO = {
  createdAt: string;
  displayName: string | null;
  email: string | null;
  emailVerified: boolean;
  isAnonymous: boolean;
  lastLoginAt: string;
  phoneNumber: string | null;
  photoURL: string | null;
  uid: string;
};
