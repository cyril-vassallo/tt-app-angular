import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UserInterface } from '../../../../shared/interfaces/interfaces';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent {
  @Input() users: UserInterface[] | null = null;
  @Output() onTeamPartnerTasksEvent = new EventEmitter<UserInterface>();

  // ----- Component methods----- //

  onTeamPartnerClick(teamPartner: UserInterface): void {
    this.onTeamPartnerTasksEvent.emit(teamPartner);
  }
}
