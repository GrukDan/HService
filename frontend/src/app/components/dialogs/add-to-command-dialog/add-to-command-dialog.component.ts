import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroupBuilderService} from "../../../services/validation/form-group-builder.service";
import {SnackBarService} from "../../../services/view-services/snack-bar.service";
import {MatDialogRef} from "@angular/material/dialog";
import {Subscription} from "rxjs";
import {Command} from "../../../dto/models/command";
import {CommandService} from "../../../services/http/command.service";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-add-to-command-dialog',
  templateUrl: './add-to-command-dialog.component.html',
  styleUrls: ['./add-to-command-dialog.component.css']
})
export class AddToCommandDialogComponent implements OnInit,OnDestroy {

  addTotCommandFormGroup:FormGroup;
  commands:Command[] = [];
  subscriptions:Subscription[] = [];

  constructor(private formGroupBuilderService: FormGroupBuilderService,
              private snackBarService: SnackBarService,
              private dialogRef: MatDialogRef<AddToCommandDialogComponent>,
              private commandService:CommandService) { }

  ngOnInit(): void {
    this.addTotCommandFormGroup = this.formGroupBuilderService.buildAddToCommandFormGroup();
    this.loadAllCommands();
  }

  loadAllCommands(){
    this.subscriptions.push(this.commandService.getAll()
      .subscribe(commands => this.commands = commands));
  }

  submitForm(command:Command) {
    if (this.addTotCommandFormGroup.valid) {
      this.commandService.save(command)
        .subscribe(command => {
          this.snackBarService
            .openSnackBar(`Пользователь добавлен в команду ${command.commandName}! 🍕`, 5);
          this.dialogRef.close();
        })
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
