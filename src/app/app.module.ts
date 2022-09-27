import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SettingsModule } from './modules/settings/app-settings.module';
import { HistoryModule } from './modules/history/app.history.module';

import { UserService } from './services/user.service';
import { TaskService } from './services/task.service';
import { GithubService } from './services/github.service';
import { NavigationService } from './services/navigation.service';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [  
    AppRoutingModule,
    SettingsModule,
    HistoryModule
  ],
  providers: [UserService, TaskService, GithubService, NavigationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
