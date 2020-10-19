import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../../dto/models/user";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string = '/api/users';

  constructor(private http:HttpClient) { }

  getProjectLeads():Observable<User[]>{
    return this.http.get<User[]>(this.url + '/project-leads')
  }
}
