import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from '../../components/home/home.component';
import {ProjectPageComponent} from "../../components/projects/project-page/project-page.component";
import {UsersCommandsComponent} from "../../components/people/users-commands/users-commands.component";
import {UserPageComponent} from "../../components/people/user-page/user-page.component";
import {RegistrationComponent} from "../../components/people/registration/registration.component";
import {NotFoundComponent} from "../../components/details/error-pages/not-found/not-found.component";
import {ServerErrorComponent} from "../../components/details/error-pages/server-error/server-error.component";
import {ProjectsPageComponent} from "../../components/projects/projects-page/projects-page.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'projects', component: ProjectsPageComponent},
  {path: 'project/:id', component: ProjectPageComponent},
  {path: 'people', component: UsersCommandsComponent , pathMatch: 'full'},
  {path: 'people/:id', component: UserPageComponent , pathMatch: 'full'},
  {path: 'people/registration', component: RegistrationComponent},
  {path: '404', component: NotFoundComponent},
  {path: '500', component: ServerErrorComponent},
  {path: '**', redirectTo: '/404', pathMatch: 'full'},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
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
export class RoutingModule {
}
