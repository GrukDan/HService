import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Status} from "../../dto/models/status";

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private url: string = '/api/statuses';

  constructor(private http: HttpClient) { }

  getAll():Observable<Status[]>{
    return this.http.get<Status[]>(this.url + '/all');
  }
}
