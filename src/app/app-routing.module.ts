import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyHistoryComponent } from './modules/history/base-component/my-history.component';
import { MySettingsComponent } from './modules/settings/base-component/my-settings.component';

const routes: Routes = [
  { path: '', component: MyHistoryComponent },
  { path: 'my-settings', component: MySettingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
