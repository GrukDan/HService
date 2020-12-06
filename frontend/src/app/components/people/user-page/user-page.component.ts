import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../services/http/user.service";
import {ProjectService} from "../../../services/http/project.service";
import {TaskService} from "../../../services/http/task.service";
import {Subscription} from "rxjs";
import {User} from "../../../dto/models/user";
import {Task} from "../../../dto/models/task";
import {CommandShortDto} from "../../../dto/dtos/command-short-dto";
import {CommandService} from "../../../services/http/command.service";
import {Type} from "../../../dto/models/type";
import {Project} from "../../../dto/models/project";
import {DialogService} from "../../../services/view-services/dialog.service";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  userId: number;
  loadedUser: User = new User();

  edit: boolean = false;
  tasks: Task[] = [];
  commandDtos: CommandShortDto[] = [];
  projects: Project[] = [];
  addProject: Project;
  canAddProject: boolean = true;

  constructor(private activateRoute: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private projectService: ProjectService,
              private taskService: TaskService,
              private commandService: CommandService,
              public dialogService: DialogService) {
    this.subscriptions.push(activateRoute.params.subscribe(params => {
      this.userId = params['id'];
    }));
  }

  ngOnInit(): void {
    this.loadUserById(this.userId);
    this.loadProjects();
    this.loadTasksByExecutor(this.userId);
  }

  getImageUrlByTaskType(type: Type): string {
    switch (type?.typeName) {
      case 'Разработка спецификации':
        return `/assets/images/task-types-svg/SPECIFICATION_DEVELOPMENT.svg`;
      case 'Проектирование':
        return `/assets/images/task-types-svg/DESIGN.svg`;
      case 'Разработка':
        return `/assets/images/task-types-svg/DEVELOPMENT.svg`;
      case 'Тестирование':
        return `/assets/images/task-types-svg/TESTING.svg`;
      case 'Поиск ошибок':
        return `/assets/images/task-types-svg/FIND_ERRORS.svg`;
      case 'Рефакторинг':
        return `/assets/images/task-types-svg/REFACTORING.svg`;
      case 'Развертывание':
        return `/assets/images/task-types-svg/DEPLOYMENT.svg`;
    }
  }

  loadUserById(id: number) {
    this.subscriptions.push(this.userService.getUserById(id)
      .subscribe(user => this.loadedUser = user));
  }

  loadTasksByExecutor(executor: number) {
    this.subscriptions.push(this.taskService.getTasksByExecutor(executor)
      .subscribe(tasks => this.tasks = tasks));
  }

  loadProjects() {
    this.subscriptions.push(this.projectService.getAll()
      .subscribe(projects => {
        this.projects = this.filterProjects(projects);
      }));
  }

  private filterProjects(filteredProjects: Project[]): Project[] {
    return filteredProjects
      .filter(elem => !this.loadedUser?.projects?.some(project => project.projectId == elem.projectId));
  }

  editUser(edit: boolean) {
    this.edit = !edit;
  }

  toProject(id: number) {
    this.router.navigateByUrl(`/project/${id}`);
  }

  removeProject(removedProject: Project) {
    if (this.loadedUser.projects.length > 0) {
      this.loadedUser.projects.splice(
        this.loadedUser.projects.findIndex(elem => elem.projectId == removedProject.projectId),
        1
      )
      this.update();
    }
  }

  saveChanges() {
    this.editUser(this.edit);
    this.update();
  }

  private update() {
    this.subscriptions.push(this.userService.update(this.loadedUser)
      .subscribe(updatedUser => this.loadedUser = updatedUser));
  }

  addProjectSelectChange($event: any) {
    this.canAddProject = false;
  }

  addProjectToUser(project: Project) {
    if (!this.loadedUser.projects.includes(project)) {
      this.loadedUser.projects.push(project);
      this.subscriptions.push(this.userService.update(this.loadedUser).subscribe(user => {
        this.projects = this.filterProjects(this.projects);
      }))
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  toTask(taskId: number) {
    this.router.navigateByUrl(`/tasks/${taskId}`);
  }
}
