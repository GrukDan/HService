import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Project} from "../../../dto/models/project";
import {User} from "../../../dto/models/user";
import {Observable, Subscription} from "rxjs";
import {UserService} from "../../../services/http/user.service";
import {ProjectService} from "../../../services/http/project.service";

@Component({
  selector: 'app-create-project-dialog',
  templateUrl: './create-project-dialog.component.html',
  styleUrls: ['./create-project-dialog.component.css']
})
export class CreateProjectDialogComponent implements OnInit,OnDestroy {

  projectFormGroup: FormGroup;

  createdProject: Project = new Project();
  projectLeads: User[] = [];
  subscriptions:Subscription[] = [];

  constructor(private userService: UserService,
              private projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.loadProjectLeads();
  }

  private loadProjectLeads(){
    this.subscriptions.push(
      this.userService.getProjectLeads().subscribe(leads=>{
        this.projectLeads = leads as User[];
      }))
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription=> subscription.unsubscribe());
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.projectFormGroup.controls[controlName].hasError(errorName);
  }

}
