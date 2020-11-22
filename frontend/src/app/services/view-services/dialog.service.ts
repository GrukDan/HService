import {Injectable} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CreateTaskDialogComponent} from "../../components/dialogs/create-task-dialog/create-task-dialog.component";
import {AddUserDialogComponent} from "../../components/dialogs/add-user-dialog/add-user-dialog.component";
import {CreateProjectDialogComponent} from "../../components/dialogs/create-project-dialog/create-project-dialog.component";
import {LoginDialogComponent} from "../../components/dialogs/login-dialog/login-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) {}

  openCreateTaskDialog() {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent);
    dialogRef.backdropClick()
  }

  close(){
    this.dialog.closeAll();
  }

  openAddUserDialog(){
    this.dialog.open(AddUserDialogComponent);
  }

  openCreateProjectDialog(){
    this.dialog.open(CreateProjectDialogComponent);
  }

  openLoginDialog(){
    this.dialog.open(LoginDialogComponent);
  }
}
