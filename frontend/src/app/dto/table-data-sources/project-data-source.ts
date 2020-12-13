import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Project} from "../models/project";
import {BehaviorSubject, Observable, of} from "rxjs";
import {catchError, finalize} from "rxjs/operators";
import {ProjectService} from "../../services/http/project.service";

export class ProjectDataSource implements DataSource<Project> {

  private projectSubject = new BehaviorSubject<Project[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public $loading = this.loadingSubject.asObservable();

  constructor(private projectService: ProjectService) {
  }

  connect(collectionViewer: CollectionViewer): Observable<Project[] | ReadonlyArray<Project>> {
    return this.projectSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.projectSubject.complete();
    this.loadingSubject.complete();
  }

  loadAllProjectPage(page: number = 0,
                     size: number = 10,
                     order: boolean = true,
                     parameter: string = 'projectName') {
    this.loadingSubject.next(true);
    this.projectService.getProjectsPage(page, size, order, parameter).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false)))
      .subscribe(tasks => this.projectSubject.next(tasks));
  }
}
