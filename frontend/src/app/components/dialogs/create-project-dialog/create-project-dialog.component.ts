import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Project} from "../../../dto/models/project";
import {Subscription} from "rxjs";
import {UserService} from "../../../services/http/user.service";
import {ProjectService} from "../../../services/http/project.service";
import {UserShortDto} from "../../../dto/view-models/user-short-dto";
import {FormGroupBuilderService} from "../../../services/validation/form-group-builder.service";
import {Description} from "../../../dto/models/description";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackBarComponent} from "../snack-bar/snack-bar.component";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-create-project-dialog',
  templateUrl: './create-project-dialog.component.html',
  styleUrls: ['./create-project-dialog.component.css']
})
export class CreateProjectDialogComponent implements OnInit, OnDestroy {

  projectFormGroup: FormGroup;
  durationInSeconds = 5;
  createdProject: Project = new Project();
  description = new Description();
  projectLeads: UserShortDto[] = [];
  subscriptions: Subscription[] = [];

  constructor(private userService: UserService,
              private projectService: ProjectService,
              private formGroupBuilderService: FormGroupBuilderService,
              private snackBar: MatSnackBar,
              private dialogRef: MatDialogRef<CreateProjectDialogComponent>) {
  }

  ngOnInit(): void {
    this.projectFormGroup = this.formGroupBuilderService.buildCreateProjectDialogFormGroup();
    this.loadProjectLeads();
  }

  private loadProjectLeads() {
    this.subscriptions.push(
      this.userService.getProjectLeads().subscribe(leads => {
        this.projectLeads = leads;
      }))
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.projectFormGroup.controls[controlName].hasError(errorName);
  }

  submitForm() {
    if (this.projectFormGroup.valid) {
      if (this.description.content?.length > 0)
        this.createdProject.description = this.description;
      this.subscriptions.push(this.projectService.save(this.createdProject)
        .subscribe(project => {
          this.openSnackBar(`Проект ${project.projectName} создан! 🍕`, this.durationInSeconds);
          this.dialogRef.close();
        }))
    }
  }

  openSnackBar(message: string, durationInSeconds: number) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: message,
      duration: durationInSeconds * 1000,
    });
  }
}
