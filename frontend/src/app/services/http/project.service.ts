import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Project} from "../../dto/models/project";
import {ProjectDto} from "../../dto/view-models/project-dto";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private url: string = '/api/projects';

  constructor(private http: HttpClient) {
  }

  save(project: Project): Observable<Project> {
    return this.http.post<Project>(this.url, project);
  }

  getProjectDtos(): Observable<ProjectDto[]> {
    return this.http.get<ProjectDto[]>(this.url + '/all/dtos');
  }

  getById(id: number): Observable<Project> {
    return this.http.get<Project>(this.url + '/' + id);
  }

  deleteById(id:number):Observable<void>{
    return this.http.delete<void>(this.url + '/' + id);
  }
}
