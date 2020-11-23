import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {UserShortDto} from "../../dto/dtos/user-short-dto";
import {User} from "../../dto/models/user";
import {UserLongDto} from "../../dto/dtos/user-long-dto";
import {AuthRequest} from "../../dto/dtos/auth-request";
import {AuthResponse} from "../../dto/dtos/auth-response";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string = '/api/users';

  private _authResponse:AuthResponse;

  get authResponse():AuthResponse{return this._authResponse};

  set authResponse(authResponse:AuthResponse){this._authResponse = authResponse};

  public clearRegistrationData(){
    this._authResponse.user.password = null;
    this._authResponse.user.userName = null;
  }

  constructor(private http: HttpClient) {
  }

  getProjectLeads(): Observable<UserShortDto[]> {
    return this.http.get<UserShortDto[]>(this.url + '/project-leads')
  }

  getUserShortDtosByProjectId(projectId: number): Observable<UserShortDto[]> {
    return this.http.get<UserShortDto[]>(this.url + '/executors/' + projectId);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(this.url + '/' + id);
  }

  getMembersByProjectId(projectId: number,
                        page: number,
                        size: number,
                        order: boolean,
                        parameter: string): Observable<UserLongDto[]> {
    return this.http.get<UserLongDto[]>(this.url + '/members/' + projectId,
      {
        params: new HttpParams()
          .set('page', page.toString())
          .set('size', size.toString())
          .set('order', order.toString())
          .set('parameter', parameter)
      });
  }

  registration(user: User): Observable<User> {
    return this.http.post<User>(this.url + '/registration', user);
  }

  update(user: User): Observable<User> {
    return this.http.post<User>(this.url + '/update', user);
  }

  invite(user: User): Observable<User> {
    return this.http.post<User>(this.url + '/invite', user);
  }

  auth(authRequest:AuthRequest):Observable<AuthResponse>{
    return this.http.post<AuthResponse>(this.url + '/auth',authRequest);
  }
}
