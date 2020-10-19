import {Role} from "./role";
import {Command} from "./command";

export class User {
  userId:number;
  userName:string;
  firstName:string;
  lastName:string;
  email:string;
  password:string;
  role:Role;
  commands:Set<Command>;
  position:string;
  department:string;
  placeOfResidence:string;
  lastActivity:Date;
  avatarUrl:string;
}
