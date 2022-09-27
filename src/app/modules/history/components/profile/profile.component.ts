import { Component, Input } from '@angular/core';
import { UserInterface } from '../../../../Interfaces/Interfaces';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  @Input() user!: UserInterface | null;
  @Input() handleLoadUserTasks!: (user: UserInterface | null) => void;


  // ----- Component methods----- //

  onUserProfileClick() {
    if (this.user !== null) {
      this.handleLoadUserTasks(this.user);
    }
  }
}
