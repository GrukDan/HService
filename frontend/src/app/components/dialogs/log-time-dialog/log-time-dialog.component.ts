import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../../services/http/user.service";
import {FormGroupBuilderService} from "../../../services/validation/form-group-builder.service";
import {LogTimeService} from "../../../services/http/log-time.service";
import {Subscription} from "rxjs";
import {Type} from "../../../dto/models/type";
import {FormGroup} from "@angular/forms";
import {LogTime} from "../../../dto/models/log-time";
import {Description} from "../../../dto/models/description";
import {SnackBarService} from "../../../services/view-services/snack-bar.service";

@Component({
  selector: 'app-log-time-dialog',
  templateUrl: './log-time-dialog.component.html',
  styleUrls: ['./log-time-dialog.component.css']
})
export class LogTimeDialogComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  logTimeFormGroup: FormGroup;
  logTime: LogTime = new LogTime();
  description: Description = new Description();

  constructor(private dialogRef: MatDialogRef<LogTimeDialogComponent>,
              private logTimeService: LogTimeService,
              private userService: UserService,
              private formGroupBuilderService: FormGroupBuilderService,
              private snackBarService: SnackBarService,
              @Inject(MAT_DIALOG_DATA) public data:
                {
                  activityTypes: Type[],
                  taskId: number
                }) {
  }

  ngOnInit(): void {
    this.logTimeFormGroup = this.formGroupBuilderService.buildLogTimeFormGroup();
    this.logTime.task = this.data.taskId;
    this.logTime.executor = this.userService.getAuthUserId();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }


  hasError = (controlName: string, errorName: string) => {
    return this.logTimeFormGroup.controls[controlName].hasError(errorName);
  }

  submitForm() {
    if (this.logTimeFormGroup.valid) {
      if (this.description.content?.length > 0) {
        this.logTime.description = this.description;
      }
      this.subscriptions.push(this.logTimeService.save(this.logTime)
        .subscribe(logTime => {
          this.snackBarService.openSnackBar(`Отмечено ${logTime.workTime} создана! 🍕`, 4);
          this.dialogRef.close();
        }))
    }
  }

  public typeComparator = function (option, value): boolean {
    return option?.typeId === value?.typeId;
  }

  timeChanged(time: string) {
    this.logTime.workTime = time;
  }
}
