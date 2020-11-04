import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {ProjectService} from "../../../services/http/project.service";
import {Subscription} from "rxjs";
import {ProjectShortDto} from "../../../dto/dtos/project-short-dto";

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() sidenavClose = new EventEmitter();

  subscriptions: Subscription[] = [];
  projectDtos: ProjectShortDto[] = [];

  constructor(private projectService: ProjectService) {
    this.loadProjectDtos();
  }

  ngOnInit() {
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
    this.loadProjectDtos();
  }

  private loadProjectDtos() {
    this.subscriptions.push(this.projectService.getProjectDtos()
      .subscribe(dtos => {
        this.projectDtos = dtos;
      }))
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
