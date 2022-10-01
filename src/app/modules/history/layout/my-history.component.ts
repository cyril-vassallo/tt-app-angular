import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  UserInterface,
  GithubInterface,
} from '../../../shared/interfaces/interfaces';
import { TaskService } from '../../../shared/services/task.service';
import { UserService } from '../../../shared/services/user.service';
import { GithubService } from '../../../shared/services/github.service';
import { Subscription } from 'rxjs';
import { TaskInterface } from '../../../shared/interfaces/interfaces';
import { TasksAndMeta } from '../../../shared/types/types';

@Component({
  selector: 'app-my-history',
  templateUrl: './my-history.component.html',
  styleUrls: ['./my-history.component.scss'],
})
export class MyHistoryComponent implements OnInit, OnDestroy {
  isAuthState: boolean = false;

  isSigningUpState: boolean = false;

  userState: UserInterface | null = null;

  teamPartnerState: UserInterface | null = null;

  usersState: UserInterface[] | null = null;

  tasksState: TaskInterface[] | null = null;

  githubState: GithubInterface | null = null;

  formDisplayState: boolean = false;

  subscriptions: Subscription = new Subscription();

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private githubService: GithubService
  ) {
    this.toggleFormState = this.toggleFormState.bind(this);
    this.loadUserTasks = this.loadUserTasks.bind(this);
    this.syncGitTasks = this.syncGitTasks.bind(this);
    this.showSignUp = this.showSignUp.bind(this);
  }

  // ----- Component lifecycle methods ----- //

  ngOnInit() {
    const serializedUser: string | null = localStorage.getItem('user');
    if (serializedUser) {
      const user: UserInterface = JSON.parse(serializedUser);
      this.initHistoryFeatureStates(user);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe();
  }

  // ----- Component methods ----- //

  validAuthentication(): void {
    this.isAuthState = true;
  }

  loadUsers(): void {
    this.subscriptions.add(
      this.userService.getAllUsers().subscribe((_observer: UserInterface[]) => {
        const data = _observer;
        this.usersState = data.filter((user: UserInterface) => {
          return user.firstName !== this.userState?.firstName;
        });
      })
    );
  }

  loadUserGithub(): void {
    if (this.userState !== null) {
      this.subscriptions.add(
        this.githubService
          .getGithubByUser(this.userState)
          .subscribe((_observer: GithubInterface | null) => {
            this.githubState = _observer;
          })
      );
    }
  }

  restStates(): void {
    this.isAuthState = false;
    this.isSigningUpState = false;
    this.userState = null;
    this.usersState = null;
    this.teamPartnerState = null;
    this.tasksState = null;
    this.githubState = null;
    this.formDisplayState = false;

    localStorage.removeItem('user');
  }

  updateUsersState(users: UserInterface[] | null) {
    if (users !== null) {
      this.usersState = users;
    } else {
      this.usersState = null;
    }
  }

  isFormShouldDisplayed(): boolean {
    return this.formDisplayState;
  }

  onClickNavItem(event?: MouseEvent): void {
    //TODO: check user.role
  }

  saveToLocalStorage(key: string, content: string) {
    localStorage.setItem(key, content);
  }

  // ----- Child component triggered methods ----- //

  onLogin(user: UserInterface | null): void {
    if (user != null) {
      this.initHistoryFeatureStates(user);
      this.userService.saveUserToLocalStorage(JSON.stringify(user));
    } else {
      this.restStates();
    }
  }

  onLogout(): void {
    this.restStates();
  }

  initHistoryFeatureStates(user: UserInterface): void {
    this.updateUserState(user);
    this.validAuthentication();
    this.loadUsers();
    this.loadUserTasks(user);
    this.loadUserGithub();
  }

  updateUserState(user: UserInterface) {
    if (user !== null) {
      this.userState = user;
    } else {
      this.userState = null;
    }
  }

  onTasksStateUpdate(tasks: TaskInterface[] | null) {
    this.tasksState = tasks;
  }

  toggleFormState(): void {
    this.formDisplayState = !this.formDisplayState;
  }

  loadUserTasks(user: UserInterface | null) {
    if (this.userState !== null && this.isAuthState && user) {
      if (this.userState !== user) {
        this.formDisplayState = false;
        this.teamPartnerState = { ...this.userState };
      } else {
        this.teamPartnerState = null;
      }

      this.subscriptions.add(
        this.taskService
          .getTasksByUser(user)
          .subscribe((_observer: TasksAndMeta) => {
            if (_observer.data && _observer.data.length > 0) {
              this.tasksState = _observer.data;
            } else {
              this.tasksState = null;
            }
          })
      );
    }
  }

  syncGitTasks(): void {
    console.log('sync...');
    console.log(this.githubState);
    //TODO: parse all commits and message from github api and update tasksSate
  }

  showSignUp(isShown: boolean): void {
    this.isSigningUpState = isShown;
  }
}
