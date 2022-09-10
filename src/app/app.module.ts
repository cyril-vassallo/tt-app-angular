import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';

import { AppComponent } from './app.component';
import { MyHistoryComponent } from './pages/my-history/my-history.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { MySettingsComponent } from './pages/my-settings/my-settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './components/profile/profile.component';
import { DailyTaskComponent } from './components/daily-task/daily-task.component';
import { LoginComponent } from './components/login/login.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TeamComponent } from './components/team/team.component';
import { FormButtonComponent } from './components/buttons/form-button.component';

import { UserService } from './services/user.service';
import { TaskService } from './services/task.service';
import { GithubService } from './services/github.service';
import { GithubComponent } from './components/github/github.component';
import { ParamsComponent } from './components/params/params.component';
import { NavigationService } from './services/navigation.service';
import { LoaderComponent } from './components/loader/loader.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';




@NgModule({
  declarations: [
    AppComponent,
    MyHistoryComponent,
    MySettingsComponent,
    NavigationComponent,
    ProfileComponent,
    DailyTaskComponent,
    LoginComponent,
    TaskFormComponent,
    TeamComponent,
    FormButtonComponent,
    GithubComponent,
    ParamsComponent,
    LoaderComponent,
    SignUpComponent,
  ],
  imports: [  
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule
  ],
  providers: [UserService, TaskService, GithubService, NavigationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
