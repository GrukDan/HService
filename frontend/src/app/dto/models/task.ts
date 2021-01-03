import {Type} from "./type";
import {Priority} from "./priority";
import {Status} from "./status";
import {Description} from "./description";

export class Task {
  taskId: number;
  taskName: string;
  taskCode: string;
  dueDate: Date;
  created: Date;
  updated: Date;
  type: Type;
  priority: Priority;
  status: Status;
  description: Description;
  project: number;
  taskCreator: number;
  taskExecutor: number;
}
