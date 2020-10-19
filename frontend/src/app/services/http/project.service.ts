import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../dto/models/user";
import {Project} from "../../dto/models/project";

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
}
