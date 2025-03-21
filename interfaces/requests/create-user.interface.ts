import { UserRole } from "../user.interface";

export default interface ICreateUserPayload {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}
