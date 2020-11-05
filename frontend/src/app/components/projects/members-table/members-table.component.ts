import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../../services/http/user.service";
import {Observable, Subscription} from "rxjs";
import {UserLongDto} from "../../../dto/dtos/user-long-dto";


const sortParameters: string[] =
  ['userId',
    'userName',
    'firstName',
    'lastName',
    'email',
    'role',
    'position',
    'department',
    'placeOfResidence'];


@Component({
  selector: 'app-members-table',
  templateUrl: './members-table.component.html',
  styleUrls: ['./members-table.component.css']
})
export class MembersTableComponent implements OnInit,OnDestroy {

  @Input() projectId: Observable<number>;
  subscriptions: Subscription[] = [];

  id:number;
  members: UserLongDto[] = [];

  page: number = 0;
  size: number = 5;
  order: boolean = true;
  parameter: string = sortParameters[1];

  parameters: string[] = [];

  constructor(private userService: UserService) {
    this.projectId.subscribe(id=>this.id = id);
  }

  ngOnInit(): void {
    this.loadMembersByProjectId(this.id,this.page,this.size,this.order,this.parameter);
  }

  loadMembersByProjectId(id: number,page:number,size:number,order:boolean,parameter:string) {
    this.subscriptions.push(this.userService.getMembersByProjectId(id,page,size,order,parameter)
      .subscribe(members=>this.members = members));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
