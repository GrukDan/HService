import {Component, OnInit} from '@angular/core';
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import {AbstractControl, FormGroup} from "@angular/forms";
import {User} from "../../../dto/models/user";
import {FormGroupBuilderService} from "../../../services/validation/form-group-builder.service";
import {UserService} from "../../../services/http/user.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class RegistrationComponent implements OnInit {

  userFormGroup: FormGroup;
  registrationUser:User = new User();

  constructor(private formGroupBuilderService:FormGroupBuilderService,
              private userService:UserService) {}

  ngOnInit() {
    this.userFormGroup = this.formGroupBuilderService.buildUserFormGroup()
  }

  get formArray(): AbstractControl | null { return this.userFormGroup.get('formArray'); }

  submitForm() {

  }
}
