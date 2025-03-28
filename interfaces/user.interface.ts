export interface IUser {
  name: string;
  email: string;
  role: UserRole;
  id: string;
}

export enum UserRole {
  ADMIN = "ADMIN",
  PROVIDER = "PROVIDER",
  USER = "USER",
}
