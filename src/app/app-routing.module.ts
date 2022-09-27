import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyHistoryComponent } from './modules/history/components/my-history/my-history.component';
import { MySettingsComponent } from './modules/settings/components/my-settings/my-settings.component';

const routes: Routes = [
  { path: '', component: MyHistoryComponent },
  { path: 'my-settings', component: MySettingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
