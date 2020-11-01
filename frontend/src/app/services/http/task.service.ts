import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Task} from "../../dto/models/task";
import {TaskShortDto} from "../../dto/view-models/task-short-dto";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private url: string = '/api/tasks';

  constructor(private http: HttpClient) {
  }

  save(task: Task): Observable<Task> {
    return this.http.post<Task>(this.url, task);
  }

  getTaskShortDtosByProject(project:number):Observable<TaskShortDto[]> {
    return this.http.get<TaskShortDto[]>(this.url + '/all/short-dtos/by-project/' + project);
  }

  generateTaskCodeByProject(projectId: number):Observable<TaskShortDto> {
    return this.http.get<TaskShortDto>(
      this.url + '/task-code',
      {
        params: new HttpParams().set('projectId', projectId.toString())
      });
  }
}
