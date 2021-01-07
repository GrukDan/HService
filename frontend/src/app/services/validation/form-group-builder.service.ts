import {Injectable} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class FormGroupBuilderService {

  constructor(private formBuilder: FormBuilder) {
  }

  public buildCreateProjectFormGroup(): FormGroup {
    return this.formBuilder.group({
      projectName: new FormControl(
        '',
        [Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40)]),
      projectCode: new FormControl(
        '',
        [Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40)]),
      lead: new FormControl(['', Validators.required]),
      descriptionContent: new FormControl(
        ['',
          Validators.minLength(2),
          Validators.maxLength(250)])
    });
  }

  public buildCreateTaskDialogFormGroup(): FormGroup {
    return this.formBuilder.group({
      taskName: new FormControl(
        '',
        [Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40)]),
      taskCreator: new FormControl(['', Validators.required]),
      project: new FormControl(['', Validators.required]),
      type: new FormControl(['', Validators.required]),
      priority: new FormControl(['', Validators.required]),
      status: new FormControl(['', Validators.required]),
      dueDate: new FormControl(['', Validators.required]),
      descriptionContent: new FormControl(
        ['',
          Validators.minLength(2),
          Validators.maxLength(250)])
    });
  }

  buildEmailFormGroup() {
    return this.formBuilder.group({
      email: new FormControl(
        '',
        [Validators.required,
          Validators.minLength(7),
          Validators.maxLength(50)]),
      role: new FormControl(
        '',
        [Validators.required]),
      expirationTime: new FormControl(
        '',
        [Validators.required])
    });
  }

  buildAuthFormGroup() {
    return this.formBuilder.group({
      username: new FormControl('',
        [Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20)]),
      password: new FormControl('',
        [Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20)]),
    });
  }

  buildUserFormGroup() {
    return this.formBuilder.group({
      formArray: this.formBuilder.array([
        this.formBuilder.group({
          username: new FormControl('',
            [Validators.required,
              Validators.minLength(5),
              Validators.maxLength(20)]),
        }),
        this.formBuilder.group({
          firstName: new FormControl(
            '',
            [Validators.required,
              Validators.minLength(2),
              Validators.maxLength(20)]),
          lastName: new FormControl('',
            [Validators.required,
              Validators.minLength(2),
              Validators.maxLength(20)]),
        }),
        this.formBuilder.group({
          email: new FormControl(
            '',
            [Validators.required,
              Validators.minLength(7),
              Validators.maxLength(50)]),
        }),
        this.formBuilder.group({
          password: new FormControl(
            '',
            [Validators.required,
              Validators.minLength(7),
              Validators.maxLength(20)]),
        }),
      ])
    });
  }

  buildLogTimeFormGroup() {
    return this.formBuilder.group({
      workTime: new FormControl('',
        [Validators.required]),
      activityType: new FormControl(
        '',
        [Validators.required]),
      loggingTime: new FormControl(
        '',
        [Validators.required]),
      descriptionContent: new FormControl(
        ['',
          Validators.minLength(2),
          Validators.maxLength(250)])
    });
  }

  buildCreateCommandFormGroup() {
    return this.formBuilder.group({
      commandName: new FormControl(
        '',
        [Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)]),
    });
  }
}
