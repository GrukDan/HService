import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../../../services/http/project.service";
import {TaskService} from "../../../services/http/task.service";
import {Project} from "../../../dto/models/project";
import {UserShortDto} from "../../../dto/dtos/user-short-dto";
import {UserService} from "../../../services/http/user.service";
import {Description} from "../../../dto/models/description";
import {FormGroup} from "@angular/forms";
import {FormGroupBuilderService} from "../../../services/validation/form-group-builder.service";
import {SnackBarService} from "../../../services/view-services/snack-bar.service";


export interface ProjectTab {
  label: string;
  content: string;
}


@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit, OnDestroy {

  projectId: number;
  formChangeFlag: boolean = false;

  project: Project = new Project();

  projectFormGroup: FormGroup;
  subscriptions: Subscription[] = [];

  leads: UserShortDto[] = [];

  constructor(private activateRoute: ActivatedRoute,
              private router: Router,
              private projectService: ProjectService,
              private taskService: TaskService,
              private userService: UserService,
              private formGroupBuilderService: FormGroupBuilderService,
              private snackBarService: SnackBarService) {
    this.subscriptions.push(activateRoute.params.subscribe(params => {
      this.projectId = params['id'];
      this.project.description = new Description();
      this.projectFormGroup = this.formGroupBuilderService.buildCreateProjectFormGroup();
      this.projectFormGroup.controls['projectCode'].disable();
      this.projectFormGroup.valueChanges.subscribe(changes => this.formChangeFlag = true);
      this.loadProjectLeads();
      this.loadProjectById(this.projectId);
    }));
  }

  ngOnInit(): void {
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.projectFormGroup.controls[controlName].hasError(errorName);
  }

  loadProjectById(id: number) {
    this.subscriptions.push(this.projectService.getById(id)
      .subscribe(project => {
        this.project = project;
        if (this.project.description == null) {
          this.project.description = new Description();
        }
      }));
  }

  loadProjectLeads() {
    this.subscriptions.push(this.userService.getProjectLeads()
      .subscribe(leads => this.leads = leads));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  delete(id: number) {
    this.subscriptions.push(this.projectService.deleteById(id)
      .subscribe(() => {
        this.router.navigate(['/projects']);
      }))
  }

  submitForm(project: Project) {

  }
}
