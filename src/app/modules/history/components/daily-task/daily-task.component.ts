import { Component, Input, OnInit } from '@angular/core';
import { UserInterface } from 'src/app/shared/interfaces/interfaces';
import { TaskInterface } from '../../../../shared/interfaces/interfaces';

@Component({
  selector: 'app-daily-task',
  templateUrl: './daily-task.component.html',
  styleUrls: ['./daily-task.component.scss'],
})
export class DailyTaskComponent implements OnInit {
  @Input() tasks!: TaskInterface[] | null;
  @Input() teamPartner!: UserInterface | null;
  @Input() user!: UserInterface | null;

  usersState: UserInterface[] | null = null;

  private unknownUser: UserInterface;

  constructor() {
    this.unknownUser = {
      firstName: 'unknown',
      lastName: 'user',
      job: 'no job',
      description: 'this is an unknown user',
      photo: 'unknown-user',
    };
  }

  // ----- Component lifecycle methods ----- //

  ngOnInit(): void {
    if (this.teamPartner !== null) {
      this.user = this.teamPartner;
    }
  }

  // ----- Component methods----- //

  getUser(): UserInterface {
    if (this.teamPartner && this.teamPartner !== undefined) {
      return this.teamPartner;
    } else {
      if (this.user && this.user !== undefined) {
        return this.user;
      } else {
        return this.unknownUser;
      }
    }
  }
}
