import {Type} from "./type";
import {Description} from "./description";

export class LogTime {
  logTimeId:number;
  workTime:string;
  task:number;
  executor:number;
  loggingTime:Date;
  activityType:Type;
  description:Description;
}
