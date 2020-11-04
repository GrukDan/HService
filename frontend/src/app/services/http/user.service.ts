import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {UserShortDto} from "../../dto/dtos/user-short-dto";
import {User} from "../../dto/models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string = '/api/users';

  constructor(private http:HttpClient) { }

  getProjectLeads():Observable<UserShortDto[]>{
    return this.http.get<UserShortDto[]>(this.url + '/project-leads')
  }

  getUserShortDtosByProjectId(projectId:number):Observable<UserShortDto[]>{
    return this.http.get<UserShortDto[]>(this.url + '/executors/' + projectId);
  }

  getUserById(id: number):Observable<User> {
    return this.http.get<User>(this.url + '/' + id);
  }

}
