import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../services/http/user.service";
import {ProjectService} from "../../../services/http/project.service";
import {TaskService} from "../../../services/http/task.service";
import {Subscription} from "rxjs";
import {User} from "../../../dto/models/user";
import {Task} from "../../../dto/models/task";
import {CommandShortDto} from "../../../dto/dtos/command-short-dto";
import {CommandService} from "../../../services/http/command.service";
import {TaskTypesEnum} from "../../../dto/enums/task-types.enum";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  imageUrls: string[] = [
    '/assets/images/users-svg/SPECIFICATION_DEVELOPMENT.svg',
    '/assets/images/users-svg/DESIGN.svg',
    '/assets/images/users-svg/DEVELOPMENT.svg',
    '/assets/images/users-svg/TESTING.svg',
    '/assets/images/users-svg/FIND_ERRORS.svg',
    '/assets/images/users-svg/REFACTORING.svg',
    '/assets/images/users-svg/DEPLOYMENT.svg',];

  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

  subscriptions: Subscription[] = [];
  userId: number;
  loadedUser: User = new User();

  tasks:Task[] = [];
  commandDtos:CommandShortDto[] = [];

  constructor(private activateRoute: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private projectService: ProjectService,
              private taskService: TaskService,
              private commandService:CommandService) {
    this.subscriptions.push(activateRoute.params.subscribe(params => {
      this.userId = params['id'];
    }));
  }

  ngOnInit(): void {
    this.loadUserById(this.userId);
  }

  getUrl(task:Task) {
    switch (task.type.typeName) {
      case 'Разработка спецификации':return `url(${this.imageUrls[TaskTypesEnum.SPECIFICATION_DEVELOPMENT]})`;
      case 'Проектирование':return `url(${this.imageUrls[TaskTypesEnum.DESIGN]})`;
      case 'Разработка':return `url(${this.imageUrls[TaskTypesEnum.DEVELOPMENT]})`;
      case 'Тестирование':return `url(${this.imageUrls[TaskTypesEnum.TESTING]})`;
      case 'Поиск ошибок':return `url(${this.imageUrls[TaskTypesEnum.FIND_ERRORS]})`;
      case 'Рефакторинг':return `url(${this.imageUrls[TaskTypesEnum.REFACTORING]})`;
      case 'Развертывание':return `url(${this.imageUrls[TaskTypesEnum.DEPLOYMENT]})`;
    }
  }

  loadUserById(id: number) {
    this.subscriptions.push(this.userService.getUserById(this.userId)
      .subscribe(user => this.loadedUser = user));
  }

  loadTasksByExecutor(executor:number){
    this.subscriptions.push(this.taskService.getTasksByExecutor(executor)
      .subscribe(tasks=>this.tasks = tasks));
  }
}
