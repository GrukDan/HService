import {Description} from "./description";

export class Project {
  projectId: number;
  projectName: string;
  projectCode: string;
  lead: number;
  creationDate: Date;
  description: Description;
}
