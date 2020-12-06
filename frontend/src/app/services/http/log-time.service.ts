import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LogTime} from "../../dto/models/log-time";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LogTimeService {

  private url: string = '/api/log-times';

  constructor(private http: HttpClient) {
  }

  save(logTime: LogTime): Observable<LogTime> {
    return this.http.post<LogTime>(this.url, logTime);
  }

  getLogTimesByTask(task: number): Observable<LogTime[]> {
    return this.http.get<LogTime[]>(this.url + `/by-task/${task}`);
  }
}
