import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { UserService } from '../../../../shared/services/user.service';
import { UserInterface } from '../../../../shared/interfaces/interfaces';
import { Subscription } from 'rxjs';
import { SignUpFormInterface } from '../../interfaces/history.interface';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  passwordConfirm: string = '';

  errorMessage: string = '';
  isSignUpFailed: boolean = false;

  @Output() onShowSignUpEvent = new EventEmitter<boolean>();

  subscriptions: Subscription = new Subscription();

  constructor(private userService: UserService) {
    this.userService = userService;
  }
  ngOnInit(): void {}

  onSubmitSignup(signUpForm: SignUpFormInterface) {
    const user: UserInterface = {
      firstName: signUpForm.firstName,
      lastName: signUpForm.lastName,
      email: signUpForm.email,
      password: signUpForm.password,
    };

    const passwordConfirm: string = signUpForm.passwordConfirm;

    const fieldChecker =
      user.email !== '' &&
      user.firstName !== '' &&
      user.lastName !== '' &&
      user.password !== '' &&
      passwordConfirm !== '';

    if (user.password === passwordConfirm && fieldChecker) {
      this.isSignUpFailed = false;
      this.errorMessage = '';
      this.subscriptions.add(
        this.userService
          .createUser(user)
          .subscribe((_observer: UserInterface) => {
            this.onShowSignUpEvent.emit(false);
          })
      );
    } else {
      this.errorMessage =
        'All field are required and password must be sames !!';
      this.isSignUpFailed = true;
    }
  }
}
