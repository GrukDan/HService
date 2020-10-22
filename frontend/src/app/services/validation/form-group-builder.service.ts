import {Injectable} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class FormGroupBuilderService {

  constructor(private formBuilder: FormBuilder) {
  }

  public buildCreateProjectDialogFormGroup(): FormGroup {
    return new FormGroup({
      projectName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      projectCode: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      lead: new FormControl(['', Validators.required]),
      descriptionContent: new FormControl(['', Validators.minLength(2), Validators.maxLength(250)])
    });
  }

}
