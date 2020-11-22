import {Component, OnInit} from '@angular/core';
import {DialogService} from "../../services/view-services/dialog.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public dialogService:DialogService,
              private router: Router) { }

  ngOnInit(): void {
  }
}
