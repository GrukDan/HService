import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {BehaviorSubject, Observable, of} from "rxjs";
import {catchError, finalize} from "rxjs/operators";
import {Task} from "../models/task";
import {TaskService} from "../../services/http/task.service";

export class TaskDataSource implements DataSource<Task> {

  private tasksSubject = new BehaviorSubject<Task[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public $loading = this.loadingSubject.asObservable();

  constructor(private taskService: TaskService) {
  }

  connect(collectionViewer: CollectionViewer): Observable<Task[] | ReadonlyArray<Task>> {
    return this.tasksSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.tasksSubject.complete();
    this.loadingSubject.complete();
  }

  loadTasksByProjectId(projectId: number,
                       page: number = 0,
                       size: number = 10,
                       order: boolean = true,
                       parameter: string = 'taskName') {
    this.loadingSubject.next(true);
    this.taskService.getTasksByProjectId(projectId, page, size, order, parameter).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false)))
      .subscribe(tasks => this.tasksSubject.next(tasks));
  }
}
