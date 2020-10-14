import {Component, OnInit} from '@angular/core';
import {DialogService} from "../../../services/view-services/dialog.service";

@Component({
  selector: 'app-users-commands',
  templateUrl: './users-commands.component.html',
  styleUrls: ['./users-commands.component.css']
})
export class UsersCommandsComponent implements OnInit {

  constructor(public dialogService:DialogService) {
  }

  ngOnInit(): void {
    this.users.forEach(()=>{
      this.backgroundUrlClass.push(this.getUrl());
    })
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
  users: string[] = ["Max Hersher", "Albert Zimmer", "Ulrich Hingern", "Maria Vindsor", "Victor Gugo"];

  getUrl()
  {
    return `url(${this.imageUrls[this.randomInteger(0,23)]})`;
  }

  randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
