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
      projectName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      projectCode: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      lead: new FormControl(['', Validators.required]),
      descriptionContent: new FormControl(['', Validators.minLength(2), Validators.maxLength(250)])
    });
  }

  public buildCreateTaskDialogFormGroup():FormGroup{
    return this.formBuilder.group({
      taskName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      taskCreator: new FormControl(['', Validators.required]),
      type: new FormControl(['', Validators.required]),
      priority: new FormControl(['', Validators.required]),
      dueDate: new FormControl(['', Validators.required]),
      descriptionContent: new FormControl(['', Validators.minLength(2), Validators.maxLength(250)])
    });
  }

}
