import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SettingsModule } from './modules/settings/settings.module';
import { HistoryModule } from './modules/history/history.module';
import { ChartsModule } from './modules/charts/charts.module';

import { UserService } from './shared/services/user.service';
import { TaskService } from './shared/services/task.service';
import { GithubService } from './shared/services/github.service';
import { FormatService } from './shared/services/format.service';
import { CoreModule } from './modules/core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const providers = [UserService, TaskService, GithubService, FormatService];

const modules = [
  CoreModule,
  HistoryModule,
  SettingsModule,
  ChartsModule,
  BrowserAnimationsModule,
];

@NgModule({
  declarations: [AppComponent],
  imports: modules,
  providers: providers,
  bootstrap: [AppComponent],
})
export class AppModule {}
