import {
  Component,
  Input,
  Output,
  OnChanges,
  EventEmitter,
} from '@angular/core';
import { UserInterface } from '../../../../shared/interfaces/interfaces';

@Component({
  selector: 'app-form-button',
  templateUrl: './form-button.component.html',
  styleUrls: ['./form-button.component.scss'],
})
export class FormButtonComponent implements OnChanges {
  // TODO remove inputs for buttons, not used anymore
  @Input() buttonTextOpenForm: string = 'Update manually';
  @Input() buttonTextSyncGithub: string = 'Sync with git';
  @Input() isFormDisplayed: boolean = false;
  @Output() onToggleFormEvent = new EventEmitter<void>();
  @Output() onSyncGithubEvent = new EventEmitter<void>();
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
    this.onToggleFormEvent.emit();
  }

  onSyncGithubClick(): void {
    this.onSyncGithubEvent.emit();
  }
}
