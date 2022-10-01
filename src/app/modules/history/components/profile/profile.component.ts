import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UserInterface } from '../../../../shared/interfaces/interfaces';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  @Input() user!: UserInterface | null;
  @Output() onLoadUserTasksEvent = new EventEmitter<UserInterface | null>();

  // ----- Component methods----- //

  onUserProfileClick() {
    if (this.user !== null) {
      this.onLoadUserTasksEvent.emit(this.user);
    }
  }
}
