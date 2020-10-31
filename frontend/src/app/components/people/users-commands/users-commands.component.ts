import {Component, OnDestroy, OnInit} from '@angular/core';
import {DialogService} from "../../../services/view-services/dialog.service";
import {UserShortDto} from "../../../dto/view-models/user-short-dto";
import {UserService} from "../../../services/http/user.service";
import {Subscription} from "rxjs";
import {ProjectDto} from "../../../dto/view-models/project-dto";
import {ProjectService} from "../../../services/http/project.service";

@Component({
  selector: 'app-users-commands',
  templateUrl: './users-commands.component.html',
  styleUrls: ['./users-commands.component.css']
})
export class UsersCommandsComponent implements OnInit,OnDestroy {

  userShortDtos:UserShortDto[] = [];
  subscriptions:Subscription[] = [];
  projectDtos:ProjectDto[] = [];

  constructor(public dialogService:DialogService,
              private userService:UserService,
              private projectService:ProjectService) {
  }

  ngOnInit(): void {
    this.loadProjectShortDtos();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  backgroundUrlClass:string[] = [];

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

  getUrl()
  {
    return `url(${this.imageUrls[this.randomInteger(0,23)]})`;
  }

  setBackgroundUrls(){
    this.userShortDtos.forEach(()=>{
      this.backgroundUrlClass.push(this.getUrl());
    })
  }

  randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  loadUserShortDtosByProjectId(projectId:number){
    this.subscriptions.push(this.userService.getUserShortDtosByProjectId(projectId)
      .subscribe(projectExecutors=> {
        this.userShortDtos = projectExecutors;
        this.setBackgroundUrls();
      }))
  }

  toUserPage(userId: number) {

  }

  changeProject(event) {
    this.loadUserShortDtosByProjectId(event.value);
  }

  loadProjectShortDtos(){
    this.subscriptions.push(this.projectService.getProjectDtos()
      .subscribe(projectDtos=>this.projectDtos = projectDtos));
  }
}
