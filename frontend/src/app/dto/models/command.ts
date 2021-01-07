import {User} from "./user";

export class Command {
  commandId:number;
  commandName:string;
  creationDate:Date;
  users:User[];
}
