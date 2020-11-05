import {Role} from "../models/role";

export class UserLongDto {
  userId:number;
  userName:string;
  firstName:string;
  lastName:string;
  email:string;
  role:Role;
  position:string;
  department:string;
  placeOfResidence:string;
  lastActivity:Date;
  avatarUrl:string;
}
