import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {UserShortDto} from "../../dto/dtos/user-short-dto";
import {User} from "../../dto/models/user";
import {UserLongDto} from "../../dto/dtos/user-long-dto";
import {AuthRequest} from "../../dto/dtos/auth-request";
import {AuthResponse} from "../../dto/dtos/auth-response";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string = '/api/users';
  private localStorageKey: string = 'authUser';

  getAuthResponse(): AuthResponse {
    return this.getAuthFromLocalStorage()
  };

  public getAuthUserId(): number {
    return this.getAuthFromLocalStorage().user.userId;
  }

  public clearRegistrationData() {
    let auth: AuthResponse = this.getAuthFromLocalStorage();
    auth.user.password = "";
    auth.user.userName = "";
    this.setAuthInLocalStorage(auth);
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

  registration(user: User): Observable<AuthResponse> {
    this.http.post<User>(this.url + '/registration', user)
      .subscribe(registeredUser => {
        let authResponse = this.getAuthFromLocalStorage();
        authResponse.user = registeredUser;
        authResponse.mustRegister = false;
        this.setAuthInLocalStorage(authResponse);
      });
    return of(this.getAuthFromLocalStorage());
  }

  update(user: User): Observable<User> {
    return this.http.post<User>(this.url + '/update', user);
  }

  invite(user: User): Observable<User> {
    return this.http.post<User>(this.url + '/invite', user);
  }

  sendAuth(authRequest: AuthRequest) {
    this.http.post<AuthResponse>(this.url + '/auth', authRequest)
      .subscribe(auth => {
        this.setAuthInLocalStorage(auth);
      });
  }

  auth(authRequest: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.url + '/auth', authRequest)
      .pipe(map(auth => {
        this.setAuthInLocalStorage(auth);
        return this.getAuthFromLocalStorage();
      }));
  }

  private setAuthInLocalStorage(auth: AuthResponse) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(auth));
  }

  private getAuthFromLocalStorage(): AuthResponse {
    return <AuthResponse>JSON.parse(localStorage.getItem(this.localStorageKey));
  }

  exit() {
    localStorage.removeItem(this.localStorageKey);
  }

  isUserAuth(): boolean {
    return this.getAuthFromLocalStorage() != null;
  }
}
