import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {DialogService} from "../../../services/view-services/dialog.service";
import {TaskDataSource} from "../../../dto/table-data-sources/task-data-source";
import {merge} from "rxjs";
import {tap} from "rxjs/operators";
import {TaskService} from "../../../services/http/task.service";

@Component({
  selector: 'app-tasks-table',
  templateUrl: './tasks-table.component.html',
  styleUrls: ['./tasks-table.component.css']
})
export class TasksTableComponent implements AfterViewInit, OnInit {

  @Input() projectId: number;
  @Input() tasksAmount: number;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource: TaskDataSource;
  displayedColumns: string[] = [
    'taskName',
    'type',
    'priority',
    'status',
    'created',
    'updated',
    'dueDate'];

  constructor(public dialogService: DialogService,
              private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.dataSource = new TaskDataSource(this.taskService);
    this.dataSource.loadTasksByProjectId(this.projectId);
  }

  loadTasksByProjectId() {
    this.dataSource.loadTasksByProjectId(
      this.projectId,
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.sort.direction === 'asc',
      this.sort.active);
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadTasksByProjectId())).subscribe();
  }
}
