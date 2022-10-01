import { Component, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import {
  UserInterface,
  TaskInterface,
} from '../../../../shared/interfaces/interfaces';
import { Subscription } from 'rxjs';
import { LoginFormInterface } from '../../interfaces/history.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoginFailed: boolean = false;
  errorMsg: string = '';
  tasks: TaskInterface[] | null = null;


  @Output() onLoginEvent = new EventEmitter<UserInterface | null >();
  @Output() onShowSignUpEvent = new EventEmitter<boolean>();
  @Input() user!: UserInterface | null;

  subscriptions: Subscription = new Subscription();

  constructor(private userService: UserService) {
    this.userService = userService;
  }

  // ----- Component lifecycle methods ----- //

  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe();
  }

  // ----- Component methods----- //

  onSubmitLogin(loginForm: LoginFormInterface) {
    this.subscriptions.add(
      this.userService.login(loginForm).subscribe((_observer: any) => {
        if (_observer.hasOwnProperty('status')) {
          this.errorMessage = _observer.message;
          this.isLoginFailed = true;
        } else {
          this.user = _observer;
          this.errorMessage = '';
          this.isLoginFailed = false;
          this.onLoginEvent.emit(this.user);
        }
      })
    );
  }

  onShowSignUpClick(): void {
    this.onShowSignUpEvent.emit(true);
  }
}
