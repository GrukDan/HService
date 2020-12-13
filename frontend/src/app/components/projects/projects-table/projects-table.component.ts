import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {ProjectDataSource} from "../../../dto/table-data-sources/project-data-source";
import {Router} from "@angular/router";
import {merge} from "rxjs";
import {tap} from "rxjs/operators";
import {ProjectService} from "../../../services/http/project.service";

@Component({
  selector: 'app-projects-table',
  templateUrl: './projects-table.component.html',
  styleUrls: ['./projects-table.component.css']
})
export class ProjectsTableComponent implements AfterViewInit, OnInit {

  projectsAmount: number = 10;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource: ProjectDataSource;
  displayedColumns: string[] = [
    'projectName',
    'projectCode',
    'creationDate',
    'sprintTime',
    'membersAmount',
    'tasksAmount'];

  constructor(private projectService: ProjectService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.dataSource = new ProjectDataSource(this.projectService);
    this.dataSource.loadAllProjectPage();
  }

  loadAllProjectPage() {
    this.dataSource.loadAllProjectPage(
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.sort.direction === 'asc',
      this.sort.active);
  }

  loadAllProjectsAmount() {
    this.projectService.getAllProjectsAmount().subscribe(amount => this.projectsAmount = amount);
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadAllProjectPage())).subscribe();
  }

  toProject(projectId: any) {
    console.log(projectId)
    this.router.navigateByUrl(`/project/${projectId}`);
  }

  getDefault(value: any): any {
    return value != null ? value : 'Не установлено';
  }
}
