import {Component, OnDestroy, OnInit} from '@angular/core';
import {Priority} from "../../../dto/models/priority";
import {Status} from "../../../dto/models/status";
import {Type} from "../../../dto/models/type";
import {ProjectDto} from "../../../dto/view-models/project-dto";
import {ProjectService} from "../../../services/http/project.service";
import {TaskService} from "../../../services/http/task.service";
import {PriorityService} from "../../../services/http/priority.service";
import {StatusService} from "../../../services/http/status.service";
import {TypeService} from "../../../services/http/type.service";
import {Subscription} from "rxjs";
import {UserShortDto} from "../../../dto/view-models/user-short-dto";

@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.css']
})
export class CreateTaskDialogComponent implements OnInit, OnDestroy {

  priorities: Priority[] = [];
  statuses: Status[] = [];
  types: Type[] = [];
  projectDtos: ProjectDto[] = [];
  executors:UserShortDto[] = [];

  startDate: Date = new Date();
  subscriptions: Subscription[] = [];

  constructor(private projectService: ProjectService,
              private taskService: TaskService,
              private priorityService: PriorityService,
              private statusService: StatusService,
              private typeService: TypeService) {
  }

  ngOnInit(): void {
    this.loadProjectDtos();
    this.loadPriorities();
    this.loadStatuses();
    this.loadTypes();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  loadProjectDtos() {
    this.subscriptions.push(this.projectService.getProjectDtos().subscribe(dtos => this.projectDtos = dtos));
  }

  loadStatuses() {
    this.subscriptions.push(this.statusService.getAll().subscribe(statuses => this.statuses = statuses));
  }

  loadTypes() {
    this.subscriptions.push(this.typeService.getAll().subscribe(types => this.types = types));
  }

  loadPriorities() {
    this.subscriptions.push(this.priorityService.getAll().subscribe(priorities => this.priorities = priorities));
  }

}
