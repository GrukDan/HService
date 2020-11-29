import {Role} from "./role";
import {Command} from "./command";
import {Project} from "./project";

export class User {
  userId:number;
  userName:string;
  firstName:string;
  lastName:string;
  email:string;
  password:string;
  role:Role;
  commands:Command[];
  projects:Project[];
  position:string;
  department:string;
  placeOfResidence:string;
  lastActivity:Date;
  avatarUrl:string;
  dateOfRegistration:Date;
  status:string;
  expirationTime:Date;
}
