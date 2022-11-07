import {
  Component,
  Input,
  Output,
  OnInit,
  OnDestroy,
  EventEmitter,
} from '@angular/core';
import { NavigationItemInterface } from '../../../../shared/interfaces/interfaces';
import { NavigationAndMeta } from '../../../../shared/types/types';
import { NavigationService } from '../../../../shared/services/navigation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit, OnDestroy {
  @Input() isAuth!: boolean;
  @Input() handleNavItemClick!: (event?: MouseEvent) => void;
  @Output() onLogoutEvent = new EventEmitter<void>();
  isNavDisplayed: boolean = false;

  navigationState: NavigationItemInterface[] = [];
  subscriptions: Subscription = new Subscription();
  navigation: NavigationItemInterface[] | null = null;

  constructor(private navigationService: NavigationService) {}

  // ----- Component lifecycle methods ----- //

  ngOnInit(): void {
    this.isNavDisplayed = false;
    this.subscriptions.add(
      this.navigationService
        .getNavigation()
        .subscribe((_observer: NavigationAndMeta) => {
          this.navigation = _observer.data;
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe();
  }

  // ----- Component methods----- //

  onLogoutClick(): void {
    this.onLogoutEvent.emit();
    this.isNavDisplayed = false;
  }

  onBurgerClick(): void {
    this.isNavDisplayed = !this.isNavDisplayed;
  }
}
