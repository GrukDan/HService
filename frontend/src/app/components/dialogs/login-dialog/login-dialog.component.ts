import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../../services/http/user.service";
import {Subscription} from "rxjs";
import {AuthRequest} from "../../../dto/dtos/auth-request";
import {FormGroup} from "@angular/forms";
import {FormGroupBuilderService} from "../../../services/validation/form-group-builder.service";

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit,OnDestroy {

  subscriptions: Subscription[] = [];
  auth:AuthRequest = new AuthRequest();
  authFormGroup:FormGroup;

  constructor(private dialogRef: MatDialogRef<LoginDialogComponent>,
              private userService: UserService,
              private formGroupBuilderService:FormGroupBuilderService) { }

  ngOnInit(): void {
    this.authFormGroup = this.formGroupBuilderService.buildAuthFormGroup();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  hasError = (controlName: string, errorName: string) => {
    return this.authFormGroup.controls[controlName].hasError(errorName);
  }

  submitForm() {

  }
}
