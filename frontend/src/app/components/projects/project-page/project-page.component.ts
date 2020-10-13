import { Component, OnInit } from '@angular/core';
import {Observable, Observer} from "rxjs";


export interface ProjectTab {
  label: string;
  content: string;
}


@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit {

  asyncTabs: Observable<ProjectTab[]>;

  constructor() {
    this.asyncTabs = new Observable((observer: Observer<ProjectTab[]>) => {
      setTimeout(() => {
        observer.next([
          {label: 'First', content: 'Content 1'},
          {label: 'Second', content: 'Content 2'},
          {label: 'Third', content: 'Content 3'},
        ]);
      }, 1000);
    });
  }

  ngOnInit(): void {
  }

}
