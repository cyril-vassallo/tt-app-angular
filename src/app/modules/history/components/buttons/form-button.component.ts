import { Component, Input, OnChanges } from '@angular/core';
import { UserInterface } from '../../../../shared/interfaces/interfaces';

@Component({
  selector: 'app-form-button',
  templateUrl: './form-button.component.html',
  styleUrls: ['./form-button.component.scss'],
})
export class FormButtonComponent implements OnChanges {
  @Input() buttonTextOpenForm: string = 'Archive today tasks!';
  @Input() buttonTextSyncGithub: string = 'Sync today task with git!';
  @Input() isFormDisplayed: boolean = false;
  @Input() handleToggleForm!: () => void;
  @Input() handleSyncGithub!: () => void;
  @Input() teamPartner!: UserInterface | null;
  disabledSate: boolean = true;

  // ----- Component lifecycle methods ----- //

  ngOnChanges(): void {
    this.teamPartner !== null
      ? (this.disabledSate = true)
      : (this.disabledSate = false);
  }

  // ----- Component methods----- //

  onOpenFormClick(): void {
    this.handleToggleForm();
  }

  onSyncGithubClick(): void {
    this.handleSyncGithub();
  }
}
