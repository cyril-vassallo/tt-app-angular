import { Component, OnInit } from '@angular/core';
import { UserInterface } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: 'app-my-settings',
  templateUrl: './my-settings.component.html',
  styleUrls: ['./my-settings.component.scss'],
})
export class MySettingsComponent implements OnInit {
  userState: UserInterface | null = null;
  currentActiveFeature: string = 'params';

  // ----- Component lifecycle methods ----- //

  ngOnInit(): void {
    const user: string | null = localStorage.getItem('user');
    if (user) {
      this.userState = JSON.parse(user);
    }
  }

  // ----- Component methods ----- //

  onClickSubNavItem(featureName: string) {
    this.currentActiveFeature = featureName;
  }

  checkFeatureIsActive(featureName: string) {
    return this.currentActiveFeature === featureName ? true : false;
  }
}
