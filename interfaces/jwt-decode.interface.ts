import { JwtPayload } from "jwt-decode";
import { UserRole } from "./user.interface";

export default interface IJwtDecodedData extends JwtPayload {
  nombre: string;
  role: UserRole;
  id: string;
}
