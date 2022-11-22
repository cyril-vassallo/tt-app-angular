import { NgModule, Component } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { MatIconModule } from '@angular/material/icon';
import { MySettingsComponent } from './layout/my-settings.component';
import { GithubComponent } from './components/github/github.component';
import { ParamsComponent } from './components/params/params.component';
import { LoaderComponent } from './components/loader/loader.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { FileService } from 'src/app/shared/services/file.service';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

const components = [
  MySettingsComponent,
  GithubComponent,
  ParamsComponent,
  LoaderComponent,
  FileUploadComponent,
];

@NgModule({
  declarations: [...components],
  imports: [CoreModule, MatIconModule, MatButtonModule, MatSlideToggleModule],
  providers: [FileService],
})
export class SettingsModule {}
