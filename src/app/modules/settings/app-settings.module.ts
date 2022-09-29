import { NgModule, Component } from '@angular/core';
import { CoreModule } from '../core/app.core.module';
import { MySettingsComponent } from './components/my-settings/my-settings.component';
import { GithubComponent } from './components/github/github.component';
import { ParamsComponent } from './components/params/params.component';
import { LoaderComponent } from './components/loader/loader.component';

const components = [
  MySettingsComponent,
  GithubComponent,
  ParamsComponent,
  LoaderComponent,
]

@NgModule({
  declarations: [
      ...components
  ],
  imports: [  
    CoreModule,
  ],
})
export class SettingsModule {}
