import {Component, OnDestroy, OnInit} from '@angular/core';
import {Task} from "../../../dto/models/task";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../services/http/user.service";
import {ProjectService} from "../../../services/http/project.service";
import {TaskService} from "../../../services/http/task.service";
import {Status} from "../../../dto/models/status";
import {Type} from "../../../dto/models/type";
import {Priority} from "../../../dto/models/priority";
import {Comment} from "../../../dto/models/comment";
import {StatusService} from "../../../services/http/status.service";
import {TypeService} from "../../../services/http/type.service";
import {PriorityService} from "../../../services/http/priority.service";
import {UserShortDto} from "../../../dto/dtos/user-short-dto";
import {User} from "../../../dto/models/user";
import {LogTimeService} from "../../../services/http/log-time.service";
import {CommentService} from "../../../services/http/comment.service";
import {LogTime} from "../../../dto/models/log-time";
import {DialogService} from "../../../services/view-services/dialog.service";
import {getStatusNameByTaskStatusEnum, TaskStatusesEnum} from "../../../dto/enums/task-statuses.enum";
import {Description} from "../../../dto/models/description";

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.css']
})
export class TaskPageComponent implements OnInit, OnDestroy {

  taskId: number;
  task: Task = new Task();
  subscriptions: Subscription[] = [];

  statuses: Status[] = [];
  types: Type[] = [];
  priorities: Priority[] = [];
  executors: UserShortDto[] = [];
  comments: Comment[] = [];
  logTimes: LogTime[] = [];
  taskCreator: User = new User();
  description: Description = new Description();
  edit: boolean = false;
  hours: number;
  minutes: number;

  constructor(private activateRoute: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private projectService: ProjectService,
              private taskService: TaskService,
              private statusService: StatusService,
              private typeService: TypeService,
              private priorityService: PriorityService,
              private commentService: CommentService,
              private logTimeService: LogTimeService,
              public dialogService: DialogService) {
    this.subscriptions.push(activateRoute.params.subscribe(params => {
      this.taskId = params['id'];
    }));
  }

  ngOnInit(): void {
    this.loadPriorities();
    this.loadStatuses();
    this.loadTypes();
    this.loadTaskById(this.taskId);
    this.loadCommentsByTask(this.taskId);
    this.loadLogTimesByTask(this.taskId);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  loadTaskById(taskId: number) {
    this.subscriptions.push(this.taskService.getTaskById(taskId)
      .subscribe(task => {
        this.task = task;
        if (this.task.description != null) {
          this.description = this.task.description;
        }
        this.loadExecutorsByProject(this.task.project);
        this.loadTaskCreator(task.taskCreator);
      }));
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

  loadExecutorsByProject(projectId: number) {
    this.subscriptions.push(this.userService.getUserShortDtosByProjectId(projectId)
      .subscribe(execitors => this.executors = execitors));
  }

  loadTaskCreator(userId: number) {
    this.subscriptions.push(this.userService.getUserById(userId).subscribe(creator => this.taskCreator = creator));
  }

  loadCommentsByTask(taskId: number) {
    this.subscriptions.push(this.commentService.getCommentsByTask(taskId).subscribe(comments => this.comments = comments));
  }

  loadLogTimesByTask(taskId: number) {
    this.subscriptions.push(this.logTimeService.getLogTimesByTask(taskId).subscribe(logTimes => {
      this.logTimes = logTimes;
      logTimes.forEach(time => this.calculateTime(time.workTime));
    }));
  }

  public typeComparator = function (option, value): boolean {
    return option?.typeId === value?.typeId;
  }

  public statusComparator = function (option, value): boolean {
    return option?.statusId === value?.statusId;
  }

  public priorityComparator = function (option, value): boolean {
    return option?.priorityId === value?.priorityId;
  }

  editTask(edit: boolean) {
    this.edit = !edit;
  }

  saveChanges() {

  }

  isTaskAwaiting(): boolean {
    return this.task?.status?.statusName === getStatusNameByTaskStatusEnum(TaskStatusesEnum.AWAITING);
  }

  isTaskSelectForDevelopment(): boolean {
    return this.task?.status?.statusName === getStatusNameByTaskStatusEnum(TaskStatusesEnum.SELECT_FOR_DEVELOPMENT);
  }

  isTaskInDevelopment(): boolean {
    return this.task?.status?.statusName === getStatusNameByTaskStatusEnum(TaskStatusesEnum.IN_DEVELOPMENT);
  }

  isTaskReadyForTest(): boolean {
    return this.task?.status?.statusName === getStatusNameByTaskStatusEnum(TaskStatusesEnum.READY_FOR_TESTING);
  }

  isTaskInTesting(): boolean {
    return this.task?.status?.statusName === getStatusNameByTaskStatusEnum(TaskStatusesEnum.IN_TESTING);
  }

  isTaskClosed(): boolean {
    return this.task?.status?.statusName === getStatusNameByTaskStatusEnum(TaskStatusesEnum.CLOSED);
  }

  isTaskReady(): boolean {
    return this.task?.status?.statusName === getStatusNameByTaskStatusEnum(TaskStatusesEnum.READY);
  }

  calculateTime(workTime: string) {
    const times = workTime.split(':');
    this.hours += Number(times[0]);
    this.minutes += Number(times[1]);
  }
}
