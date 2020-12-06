import {User} from "./user";

export class Comment {
  commentId:number;
  creationTime:Date;
  content:string;
  task:number;
  commentator:User;
}
