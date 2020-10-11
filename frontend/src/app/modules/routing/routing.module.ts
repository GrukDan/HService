import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent} from '../../components/home/home.component';
import {ProjectPageComponent} from "../../components/projects/project-page/project-page.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'project', component: ProjectPageComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class RoutingModule { }
