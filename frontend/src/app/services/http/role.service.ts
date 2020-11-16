import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Role} from "../../dto/models/role";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private url: string = '/api/roles';

  constructor(private http: HttpClient) { }

  getAll():Observable<Role[]>{
    return this.http.get<Role[]>(this.url + 'all')
  }

  getInviteRoles():Observable<Role[]>{
    return this.http.get<Role[]>(this.url + '/invite-roles');
  }
}

