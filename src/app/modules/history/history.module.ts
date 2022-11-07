import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { NavigationService } from '../../shared/services/navigation.service';
import { MyHistoryComponent } from './layout/my-history.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DailyTaskComponent } from './components/daily-task/daily-task.component';
import { LoginComponent } from './components/login/login.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TeamComponent } from './components/team/team.component';
import { FormButtonComponent } from './components/buttons/form-button.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

const components = [
  MyHistoryComponent,
  NavigationComponent,
  ProfileComponent,
  DailyTaskComponent,
  LoginComponent,
  TaskFormComponent,
  TeamComponent,
  FormButtonComponent,
  SignUpComponent,
];

@NgModule({
  declarations: [...components],
  imports: [CoreModule],
  providers: [NavigationService],
})
export class HistoryModule {}
