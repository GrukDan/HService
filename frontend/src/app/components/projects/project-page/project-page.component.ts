import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Observer, Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../../../services/http/project.service";
import {TaskService} from "../../../services/http/task.service";
import {Project} from "../../../dto/models/project";
import {TaskShortDto} from "../../../dto/view-models/task-short-dto";
import {UserShortDto} from "../../../dto/view-models/user-short-dto";
import {UserService} from "../../../services/http/user.service";
import {Description} from "../../../dto/models/description";


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

  asyncTabs: Observable<ProjectTab[]>;
  subscriptions: Subscription[] = [];
  projectId: number
  project: Project = new Project();
  leads: UserShortDto[] = [];
  taskShortDtos: Observable<TaskShortDto[]>;

  constructor(private activateRoute: ActivatedRoute,
              private router: Router,
              private projectService: ProjectService,
              private taskService: TaskService,
              private userService: UserService) {
    this.subscriptions.push(activateRoute.params.subscribe(params => {
      this.projectId = params['id'];
      this.project.description = new Description();
      this.loadProjectById(this.projectId);
    }));

    this.asyncTabs = new Observable((observer: Observer<ProjectTab[]>) => {
      setTimeout(() => {
        observer.next([
          {label: 'First', content: 'Content 1'},
          {label: 'Second', content: 'Content 2'},
          {label: 'Third', content: 'Content 3'},
        ]);
      }, 1000);
    });
  }

  ngOnInit(): void {
    this.loadProjectLeads();
  }

  loadProjectById(id: number) {
    this.subscriptions.push(this.projectService.getById(id)
      .subscribe(project => this.project = project));
  }

  loadProjectLeads() {
    this.subscriptions.push(this.userService.getProjectLeads()
      .subscribe(leads => this.leads = leads));
  }

  loadTaskShortDtosByProject(project: number) {
    this.taskShortDtos = this.taskService.getTaskShortDtosByProject(project);
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
}
