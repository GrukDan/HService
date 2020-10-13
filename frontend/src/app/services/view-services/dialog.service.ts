import { Injectable } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CreateTaskDialogComponent} from "../../components/dialogs/create-task-dialog/create-task-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) {}

  openCreateTaskDialog() {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent);
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }
}
