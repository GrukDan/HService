import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../../services/http/user.service";
import {Subscription} from "rxjs";
import {AuthRequest} from "../../../dto/dtos/auth-request";
import {FormGroup} from "@angular/forms";
import {FormGroupBuilderService} from "../../../services/validation/form-group-builder.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  auth: AuthRequest = new AuthRequest();
  authFormGroup: FormGroup;

  constructor(private dialogRef: MatDialogRef<LoginDialogComponent>,
              private userService: UserService,
              private formGroupBuilderService: FormGroupBuilderService,
              private router: Router) {
  }

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
    this.userService.auth(this.auth).subscribe(res => {
        this.userService.authResponse = res;

        //todo if if expired
          if (res.mustRegister) {
            this.userService.clearRegistrationData();
            this.router.navigateByUrl(`/registration`);
          } else {
            this.router.navigateByUrl(`/people/${res.user.userId}`);
          }
        this.dialogRef.close()
      }
    )
  }
}
