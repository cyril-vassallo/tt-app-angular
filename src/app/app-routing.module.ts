import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyHistoryComponent } from './modules/history/layout/my-history.component';
import { MySettingsComponent } from './modules/settings/layout/my-settings.component';
import { ChartsComponent } from './modules/charts/layout/charts.component';

const routes: Routes = [
  { path: '', component: MyHistoryComponent },
  { path: 'my-settings', component: MySettingsComponent },
  { path: 'my-charts', component: ChartsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
