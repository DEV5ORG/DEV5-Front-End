export interface IUser {
  name: string;
  email: string;
  role: UserRole;
}

export enum UserRole {
  ADMIN = "ADMIN",
  PROVIDER = "PROVIDER",
  USER = "USER",
}
