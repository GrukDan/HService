import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../../services/http/user.service";
import {merge} from "rxjs";
import {UsersDataSource} from "../../../dto/table-data-sources/users-data-source";
import {MatPaginator} from "@angular/material/paginator";
import {tap} from "rxjs/operators";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-members-table',
  templateUrl: './members-table.component.html',
  styleUrls: ['./members-table.component.css']
})
export class MembersTableComponent implements AfterViewInit, OnInit {

  @Input() projectId: number;
  @Input() membersAmount: number;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource: UsersDataSource;
  displayedColumns: string[] = [
    'userName',
    'firstName',
    'lastName',
    'email',
    'position',
    'department',
    'placeOfResidence'];

  constructor(private userService: UserService) {
  };

  ngOnInit(): void {
    this.dataSource = new UsersDataSource(this.userService);
    this.dataSource.loadMembersByProjectId(this.projectId);
  }

  loadMembersByProjectId() {
    this.dataSource.loadMembersByProjectId(
      this.projectId,
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.sort.direction === 'asc',
      this.sort.active);
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadMembersByProjectId())).subscribe();
  }

  getDefaultValue(value: string): string {
    return value === null ? '━' : value;
  }
}
