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
  @Input() isGitSyncButtonDisplayed: boolean = false;
  @Input() isFormDisplayed: boolean = false;
  @Output() onToggleFormEvent = new EventEmitter<void>();
  @Output() onSyncGithubEvent = new EventEmitter<void>();
  @Input() teamPartner!: UserInterface | null;
  disabledButton: boolean = true;

  // ----- Component lifecycle methods ----- //

  ngOnChanges(): void {
    this.teamPartner !== null
      ? (this.disabledButton = true)
      : (this.disabledButton = false);
  }

  // ----- Component methods----- //

  onOpenFormClick(): void {
    this.onToggleFormEvent.emit();
  }

  onSyncGithubClick(): void {
    this.onSyncGithubEvent.emit();
  }
}
