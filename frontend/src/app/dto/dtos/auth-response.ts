import {User} from "../models/user";

export class AuthResponse {
  user:User;
  mustRegister:boolean;
  token:string;
  status:string;
  errors:Map<string,string>;
}
