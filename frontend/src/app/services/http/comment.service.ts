import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Comment} from "../../dto/models/comment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private url: string = '/api/comments';

  constructor(private http: HttpClient) { }

  save(comment:Comment):Observable<Comment>{
    return this.http.post<Comment>(this.url,comment);
  }

  getCommentsByTask(task:number):Observable<Comment[]>{
    return this.http.get<Comment[]>(this.url + `/by-task/${task}`);
  }
}
