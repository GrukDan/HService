import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {UserLongDto} from "../dtos/user-long-dto";
import {BehaviorSubject, Observable, of} from "rxjs";
import {UserService} from "../../services/http/user.service";
import {catchError, finalize} from "rxjs/operators";

export class UsersDataSource implements DataSource<UserLongDto> {

  private usersSubject = new BehaviorSubject<UserLongDto[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public $loading = this.loadingSubject.asObservable();

  constructor(private userService: UserService) {
  }

  connect(collectionViewer: CollectionViewer): Observable<UserLongDto[] | ReadonlyArray<UserLongDto>> {
    return this.usersSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.usersSubject.complete();
    this.loadingSubject.complete();
  }

  loadMembersByProjectId(projectId: number,
                         page: number = 0,
                         size: number = 5,
                         order: boolean = true,
                         parameter: string = 'userName') {
    this.loadingSubject.next(true);
    this.userService.getMembersByProjectId(projectId, page, size, order, parameter).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false)))
      .subscribe(users => this.usersSubject.next(users));
  }
}
