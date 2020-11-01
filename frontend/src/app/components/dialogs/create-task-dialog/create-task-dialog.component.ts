import {Component, OnDestroy, OnInit} from '@angular/core';
import {Priority} from "../../../dto/models/priority";
import {Status} from "../../../dto/models/status";
import {Type} from "../../../dto/models/type";
import {ProjectService} from "../../../services/http/project.service";
import {TaskService} from "../../../services/http/task.service";
import {PriorityService} from "../../../services/http/priority.service";
import {StatusService} from "../../../services/http/status.service";
import {TypeService} from "../../../services/http/type.service";
import {Subscription} from "rxjs";
import {UserShortDto} from "../../../dto/view-models/user-short-dto";
import {UserService} from "../../../services/http/user.service";
import {MatDialogRef} from "@angular/material/dialog";
import {SnackBarService} from "../../../services/view-services/snack-bar.service";
import {Task} from "../../../dto/models/task";
import {FormGroup} from "@angular/forms";
import {FormGroupBuilderService} from "../../../services/validation/form-group-builder.service";
import {Description} from "../../../dto/models/description";
import {ProjectShortDto} from "../../../dto/view-models/project-short-dto";

@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.css']
})
export class CreateTaskDialogComponent implements OnInit, OnDestroy {

  priorities: Priority[] = [];
  statuses: Status[] = [];
  types: Type[] = [];
  projectDtos: ProjectShortDto[] = [];
  executors: UserShortDto[] = [];
  description = new Description();

  createdTask:Task = new Task();

  startDate: Date = new Date();
  subscriptions: Subscription[] = [];
  taskFormGroup:FormGroup;

  constructor(private projectService: ProjectService,
              private taskService: TaskService,
              private priorityService: PriorityService,
              private statusService: StatusService,
              private typeService: TypeService,
              private userService: UserService,
              private snackBarService:SnackBarService,
              private dialogRef: MatDialogRef<CreateTaskDialogComponent>,
              private formGroupBuilderService:FormGroupBuilderService) {
  }

  ngOnInit(): void {
    this.taskFormGroup= this.formGroupBuilderService.buildCreateTaskDialogFormGroup();
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

  loadExecutorsByProjectId(projectId: number) {
    this.subscriptions.push(this.userService.getUserShortDtosByProjectId(projectId)
      .subscribe(executors => this.executors = executors));
  }

  changeProject(event) {
    this.loadExecutorsByProjectId(event.value)
  }

  hasError = (controlName: string, errorName: string) => {
    return this.taskFormGroup.controls[controlName].hasError(errorName);
  }

  submitForm() {
    // if (this.taskFormGroup.valid) {
    //   if (this.description.content?.length > 0)
    //     this.createdProject.description = this.description;
    //   this.subscriptions.push(this.projectService.save(this.createdProject)
    //     .subscribe(project => {
    //       this.snackBarService.openSnackBar(`Проект ${project.projectName} создан! 🍕`, 5);
    //       this.dialogRef.close();
    //     }))
    // }
  }
}
