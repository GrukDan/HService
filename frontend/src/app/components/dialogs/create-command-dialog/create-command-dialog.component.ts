import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FormGroupBuilderService} from "../../../services/validation/form-group-builder.service";
import {CommandService} from "../../../services/http/command.service";
import {Command} from "../../../dto/models/command";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-command-dialog',
  templateUrl: './create-command-dialog.component.html',
  styleUrls: ['./create-command-dialog.component.css']
})
export class CreateCommandDialogComponent implements OnInit,OnDestroy {

  createCommandFormGroup:FormGroup;
  command:Command = new Command();
  subscription:Subscription;

  constructor(private formGroupBuilderService:FormGroupBuilderService,
              private commandService:CommandService,
              private router: Router) { }

  ngOnInit(): void {
    this.createCommandFormGroup = this.formGroupBuilderService.buildCreateCommandFormGroup();
  }

  submitForm() {
    this.subscription = this.commandService.save(this.command)
      .subscribe(command=>{
        this.router.navigateByUrl(`/commands/${command.commandId}`);
    })
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.createCommandFormGroup.controls[controlName].hasError(errorName);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
