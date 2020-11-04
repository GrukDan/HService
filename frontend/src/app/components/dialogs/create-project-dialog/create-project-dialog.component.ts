import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Project} from "../../../dto/models/project";
import {Subscription} from "rxjs";
import {UserService} from "../../../services/http/user.service";
import {ProjectService} from "../../../services/http/project.service";
import {UserShortDto} from "../../../dto/dtos/user-short-dto";
import {FormGroupBuilderService} from "../../../services/validation/form-group-builder.service";
import {Description} from "../../../dto/models/description";
import {MatDialogRef} from "@angular/material/dialog";
import {SnackBarService} from "../../../services/view-services/snack-bar.service";

@Component({
  selector: 'app-create-project-dialog',
  templateUrl: './create-project-dialog.component.html',
  styleUrls: ['./create-project-dialog.component.css']
})
export class CreateProjectDialogComponent implements OnInit, OnDestroy {

  projectFormGroup: FormGroup;
  createdProject: Project = new Project();
  description = new Description();
  projectLeads: UserShortDto[] = [];
  subscriptions: Subscription[] = [];

  constructor(private userService: UserService,
              private projectService: ProjectService,
              private formGroupBuilderService: FormGroupBuilderService,
              private snackBarService: SnackBarService,
              private dialogRef: MatDialogRef<CreateProjectDialogComponent>) {
  }

  ngOnInit(): void {
    this.projectFormGroup = this.formGroupBuilderService.buildCreateProjectFormGroup();
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
          this.snackBarService.openSnackBar(`Проект ${project.projectName} создан! 🍕`, 5);
          this.dialogRef.close();
        }))
    }
  }

  blurProjectNameInput(projectName: string) {
    if (projectName != null && projectName.trim() != '') {
      this.checkProjectNameAndGenerateProjectCode(projectName);
    }
  }

  checkProjectNameAndGenerateProjectCode(projectName: string) {
    this.subscriptions.push(this.projectService.checkProjectNameAndGenerateProjectCode(projectName)
      .subscribe(projectShortDto => this.createdProject.projectCode = projectShortDto.projectCode));
  }
}
