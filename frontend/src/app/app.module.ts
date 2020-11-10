import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RoutingModule} from './modules/routing/routing.module';
import {HomeComponent} from './components/home/home.component';
import {MaterialModule} from './modules/material/material.module';
import {NavbarComponent} from './components/navigation/navbar/navbar.component';
import {SidenavListComponent} from './components/navigation/sidenav-list/sidenav-list.component';
import {ProjectPageComponent} from './components/projects/project-page/project-page.component';
import {TasksTableComponent} from './components/projects/tasks-table/tasks-table.component';
import {CreateTaskDialogComponent} from './components/dialogs/create-task-dialog/create-task-dialog.component';
import {DialogService} from "./services/view-services/dialog.service";
import {InfoTaskDialogComponent} from './components/dialogs/info-task-dialog/info-task-dialog.component';
import {UsersCommandsComponent} from './components/people/users-commands/users-commands.component';
import {UserPageComponent} from './components/people/user-page/user-page.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {AddUserDialogComponent} from './components/dialogs/add-user-dialog/add-user-dialog.component';
import {RegistrationComponent} from './components/people/registration/registration.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CreateProjectDialogComponent} from './components/dialogs/create-project-dialog/create-project-dialog.component';
import {NotFoundComponent} from './components/details/error-pages/not-found/not-found.component';
import {ServerErrorComponent} from './components/details/error-pages/server-error/server-error.component';
import {HttpClientModule} from "@angular/common/http";
import {SnackBarComponent} from './components/dialogs/snack-bar/snack-bar.component';
import {ProjectsPageComponent} from './components/projects/projects-page/projects-page.component';
import {MembersTableComponent} from './components/projects/members-table/members-table.component';
import {HeaderComponent} from './components/navigation/header/header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    SidenavListComponent,
    ProjectPageComponent,
    TasksTableComponent,
    CreateTaskDialogComponent,
    InfoTaskDialogComponent,
    UsersCommandsComponent,
    UserPageComponent,
    AddUserDialogComponent,
    RegistrationComponent,
    CreateProjectDialogComponent,
    NotFoundComponent,
    ServerErrorComponent,
    SnackBarComponent,
    ProjectsPageComponent,
    MembersTableComponent,
    HeaderComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [DialogService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
