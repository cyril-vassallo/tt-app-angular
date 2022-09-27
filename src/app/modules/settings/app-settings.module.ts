import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';

import { MySettingsComponent } from './components/my-settings/my-settings.component';
import { ReactiveFormsModule } from '@angular/forms';

import { UserService } from '../../services/user.service';
import { TaskService } from '../../services/task.service';
import { GithubService } from '../../services/github.service';
import { GithubComponent } from './components/github/github.component';
import { ParamsComponent } from './components/params/params.component';
import { LoaderComponent } from './components/loader/loader.component';


@NgModule({
  declarations: [
    MySettingsComponent,
    GithubComponent,
    ParamsComponent,
    LoaderComponent,
  ],
  imports: [  
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
})
export class SettingsModule {}
