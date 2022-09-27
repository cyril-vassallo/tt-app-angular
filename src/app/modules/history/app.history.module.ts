import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MyHistoryComponent } from './components/my-history/my-history.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DailyTaskComponent } from './components/daily-task/daily-task.component';
import { LoginComponent } from './components/login/login.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TeamComponent } from './components/team/team.component';
import { FormButtonComponent } from './components/buttons/form-button.component';

import { UserService } from './../../services/user.service';
import { TaskService } from './../../services/task.service';
import { GithubService } from './../../services/github.service';
import { NavigationService } from './../../services/navigation.service';
import { SignUpComponent } from './components/sign-up/sign-up.component';


@NgModule({
  declarations: [
    MyHistoryComponent,
    NavigationComponent,
    ProfileComponent,
    DailyTaskComponent,
    LoginComponent,
    TaskFormComponent,
    TeamComponent,
    FormButtonComponent,
    SignUpComponent,
  ],
  imports: [  
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class HistoryModule {}
