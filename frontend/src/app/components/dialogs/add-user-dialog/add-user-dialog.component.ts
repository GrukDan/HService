import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {UserService} from "../../../services/http/user.service";
import {FormGroupBuilderService} from "../../../services/validation/form-group-builder.service";
import {SnackBarService} from "../../../services/view-services/snack-bar.service";
import {MatDialogRef} from "@angular/material/dialog";
import {User} from "../../../dto/models/user";
import {RoleService} from "../../../services/http/role.service";
import {Role} from "../../../dto/models/role";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css']
})
export class AddUserDialogComponent implements OnInit, OnDestroy {

  emailFormGroup: FormGroup;
  roles: Role[] = [];
  startInviteDate: Date = new Date();
  invitedUser: User = new User();
  subscriptions: Subscription[] = [];

  constructor(private userService: UserService,
              private roleService: RoleService,
              private formGroupBuilderService: FormGroupBuilderService,
              private snackBarService: SnackBarService,
              private dialogRef: MatDialogRef<AddUserDialogComponent>) {
  }

  ngOnInit(): void {
    this.emailFormGroup = this.formGroupBuilderService.buildEmailFormGroup();
    this.loadInviteRoles();
  }

  loadInviteRoles() {
    this.subscriptions.push(this.roleService.getInviteRoles().subscribe(roles => this.roles = roles));
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.emailFormGroup.controls[controlName].hasError(errorName);
  }

  submitForm() {
    if (this.emailFormGroup.valid) {
      this.userService.invite(this.invitedUser)
        .subscribe(invitedUser => {
          this.snackBarService
            .openSnackBar(`Приглашение на адрес ${invitedUser.email} отправлено! 🍕`, 5);
          this.dialogRef.close();
        })
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
