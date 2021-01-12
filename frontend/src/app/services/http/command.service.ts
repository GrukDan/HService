import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CommandShortDto} from "../../dto/dtos/command-short-dto";
import {Command} from "../../dto/models/command";

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  private url: string = '/api/commands';

  constructor(private http: HttpClient) {
  }

  getAllDtos(): Observable<CommandShortDto[]> {
    return this.http.get<CommandShortDto[]>(this.url + '/all/dtos');
  }

  save(command: Command): Observable<Command> {
    return this.http.post<Command>(this.url, command);
  }

  getAll():Observable<Command[]> {
    return this.http.get<Command[]>(this.url + '/all');
  }
}
