import {Component, OnInit} from '@angular/core';
import {DialogService} from "../../services/view-services/dialog.service";
import {Router} from "@angular/router";
import {UserService} from "../../services/http/user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isUserAuth:boolean = false;

  constructor(public dialogService:DialogService,
              private userService:UserService,
              private router: Router) {
    this.isUserAuth = userService.isUserAuth();
  }

  ngOnInit(): void {
  }
}
