import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SettingsModule } from './modules/settings/settings.module';
import { HistoryModule } from './modules/history/history.module';
import { ChartsModule } from './modules/charts/charts.module';

import { UserService } from './shared/services/user.service';
import { TaskService } from './shared/services/task.service';
import { GithubService } from './shared/services/github.service';
import { FormatService } from './shared/services/format.service';
import { CoreModule } from './modules/core/core.module';

const providers = [UserService, TaskService, GithubService, FormatService];

@NgModule({
  declarations: [AppComponent],
  imports: [CoreModule, HistoryModule, SettingsModule, ChartsModule],
  providers: [...providers],
  bootstrap: [AppComponent],
})
export class AppModule {}
