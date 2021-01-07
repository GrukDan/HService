import {Component, OnDestroy, OnInit} from '@angular/core';
import {DialogService} from "../../../services/view-services/dialog.service";
import {UserShortDto} from "../../../dto/dtos/user-short-dto";
import {UserService} from "../../../services/http/user.service";
import {Subscription} from "rxjs";
import {ProjectService} from "../../../services/http/project.service";
import {ProjectShortDto} from "../../../dto/dtos/project-short-dto";
import {CommandShortDto} from "../../../dto/dtos/command-short-dto";
import {CommandService} from "../../../services/http/command.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-users-commands',
  templateUrl: './users-commands.component.html',
  styleUrls: ['./users-commands.component.css']
})
export class UsersCommandsComponent implements OnInit, OnDestroy {

  userDtos: UserShortDto[] = [];
  subscriptions: Subscription[] = [];
  projectDtos: ProjectShortDto[] = [];
  commandDtos: CommandShortDto[] = [];

  constructor(public dialogService: DialogService,
              private userService: UserService,
              private projectService: ProjectService,
              private commandService: CommandService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadProjectShortDtos();
    this.loadCommandShortDtos();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  backgroundUrlClass: string[] = [];

  imageUrls: string[] = [
    '/assets/images/users-svg/animal-dog-svgrepo-com.svg',
    '/assets/images/users-svg/animal-svgrepo-com.svg',
    '/assets/images/users-svg/animal-weird-svgrepo-com.svg',
    '/assets/images/users-svg/beetle-animal-svgrepo-com.svg',
    '/assets/images/users-svg/camel-animal-svgrepo-com.svg',
    '/assets/images/users-svg/camel-animal-svgrepo-com-2.svg',
    '/assets/images/users-svg/cockroach-animal-svgrepo-com.svg',
    '/assets/images/users-svg/crocodile-animal-svgrepo-com.svg',
    '/assets/images/users-svg/dog-happy-pet-animal-svgrepo-com.svg',
    '/assets/images/users-svg/duck-animal-svgrepo-com.svg',
    '/assets/images/users-svg/elk-animal-svgrepo-com.svg',
    '/assets/images/users-svg/fish-animal-svgrepo-com.svg',
    '/assets/images/users-svg/fish-animal-svgrepo-com-2.svg',
    '/assets/images/users-svg/globefish-animal-svgrepo-com.svg',
    '/assets/images/users-svg/halloween-monster-animal-head-with-big-open-mouth-svgrepo-com.svg',
    '/assets/images/users-svg/ladybug-animal-svgrepo-com.svg',
    '/assets/images/users-svg/ladybug-animal-svgrepo-com-2.svg',
    '/assets/images/users-svg/lion-wild-animal-cat-svgrepo-com.svg',
    '/assets/images/users-svg/monster-svgrepo-com.svg',
    '/assets/images/users-svg/monster-svgrepo-com-2.svg',
    '/assets/images/users-svg/ostrich-animal-svgrepo-com.svg',
    '/assets/images/users-svg/pastafarianism-monster-svgrepo-com.svg',
    '/assets/images/users-svg/turtle-animal-svgrepo-com.svg',
    '/assets/images/users-svg/user-svgrepo-com.svg'
  ];

  getUrl() {
    return `url(${this.imageUrls[this.randomInteger(0, 23)]})`;
  }

  setBackgroundUrls() {
    this.userDtos.forEach(() => {
      this.backgroundUrlClass.push(this.getUrl());
    })
  }

  randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  loadUserShortDtosByProjectId(projectId: number) {
    this.subscriptions.push(this.userService.getUserShortDtosByProjectId(projectId)
      .subscribe(projectExecutors => {
        this.userDtos = projectExecutors;
        this.setBackgroundUrls();
      }))
  }

  toUserPage(userId: number) {
    this.router.navigateByUrl(`/people/${userId}`);
  }

  changeProject(event) {
    this.loadUserShortDtosByProjectId(event.value);
  }

  loadProjectShortDtos() {
    this.subscriptions.push(this.projectService.getProjectDtos()
      .subscribe(projectDtos => this.projectDtos = projectDtos));
  }

  loadCommandShortDtos() {
    this.subscriptions.push(this.commandService.getAllDtos()
      .subscribe(commandDtos => this.commandDtos = commandDtos));
  }

  createCommand() {
    this.dialogService.openCreateCommandDialog();
  }
}
