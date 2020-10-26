import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Priority} from "../../dto/models/priority";

@Injectable({
  providedIn: 'root'
})
export class PriorityService {

  private url: string = '/api/priorities';

  constructor(private http: HttpClient) { }

  getAll():Observable<Priority[]>{
    return this.http.get<Priority[]>(this.url + '/all');
  }
}
