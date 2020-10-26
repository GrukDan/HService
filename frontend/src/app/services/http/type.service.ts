import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Type} from "../../dto/models/type";

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  private url: string = '/api/types';

  constructor(private http: HttpClient) { }

  getAll():Observable<Type[]> {
    return this.http.get<Type[]>(this.url + '/all');
  }
}
