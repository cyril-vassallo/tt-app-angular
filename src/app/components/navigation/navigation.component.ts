import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NavigationItemInterface } from '../../Interfaces/Interfaces';
import { NavigationService } from '../../services/navigation.service';
import { Subscription } from 'rxjs';
import { NavigationAndMeta } from '../../types/types';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit, OnDestroy {

  @Input() isAuth!: boolean;
  @Input() handleNavItemClick!: (event?: MouseEvent) => void;
  @Input() logout!: () => void;

  navigationState: NavigationItemInterface[] = [];
  subscriptions: Subscription = new Subscription();
  navigation: NavigationItemInterface[]| null = null;

  constructor(private navigationService: NavigationService) {}

  // ----- Component lifecycle methods ----- //

  ngOnInit(): void {
    this.subscriptions.add(this.navigationService.getNavigation().subscribe((_observer: NavigationAndMeta) => {
      this.navigation =  _observer.data;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe();
  }
  

  // ----- Component methods----- //

  onLogoutClick(): void {
    this.logout();
  }
}
