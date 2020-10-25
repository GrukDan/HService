import {Type} from "../models/type";

export class TaskShortDto {
  taskId:number;
  taskName:string;
  taskCode:string;
  type:Type;
  created:Date;
}
