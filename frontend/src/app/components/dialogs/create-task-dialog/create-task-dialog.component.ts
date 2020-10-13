import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.css']
})
export class CreateTaskDialogComponent implements OnInit {

  startDate:Date = new Date();

  constructor() { }

  ngOnInit(): void {
  }

}
