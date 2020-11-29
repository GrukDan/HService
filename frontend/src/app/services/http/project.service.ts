import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Project} from "../../dto/models/project";
import {ProjectShortDto} from "../../dto/dtos/project-short-dto";

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

  getProjectDtos(): Observable<ProjectShortDto[]> {
    return this.http.get<ProjectShortDto[]>(this.url + '/all/dtos');
  }

  getById(id: number): Observable<Project> {
    return this.http.get<Project>(this.url + '/' + id);
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(this.url + '/' + id);
  }

  checkProjectNameAndGenerateProjectCode(projectName: string): Observable<ProjectShortDto> {
    return this.http.get<ProjectShortDto>(
      this.url + '/project-code',
      {
        params: new HttpParams().set('projectName', projectName)
      });
  }

  //todo: заменить на ProjectShortDto
  existsByProjectCode(projectCode: string): Observable<any> {
    return this.http.get(
      this.url + '/exists',
      {
        params: new HttpParams().set('projectCode', projectCode)
      });
  }

  getAll():Observable<Project[]>{
    return this.http.get<Project[]>(this.url + '/all/data');
  }
}
