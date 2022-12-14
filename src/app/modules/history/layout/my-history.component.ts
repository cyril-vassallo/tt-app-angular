import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  UserInterface,
  GithubInterface,
} from '../../../shared/interfaces/interfaces';
import { TaskService } from '../../../shared/services/task.service';
import { UserService } from '../../../shared/services/user.service';
import { GithubService } from '../../../shared/services/github.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { TaskInterface } from '../../../shared/interfaces/interfaces';
import { TasksAndMeta } from '../../../shared/types/types';
import format from 'date-fns/format';
import { FormatService } from '../../../shared/services/format.service';

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

  todayDate: string = '';

  todayDateIso: string = '';

  isGitSyncButtonDisplayed: boolean = false;

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private githubService: GithubService,
    private formatService: FormatService
  ) {}

  // ----- Component lifecycle methods ----- //

  ngOnInit() {
    this.todayDate = format(new Date(), 'dd/MM/yyyy');
    this.todayDateIso = this.formatService.dateToIso(new Date());
    const serializedUser: string | null = localStorage.getItem('user');
    if (serializedUser) {
      const user: UserInterface = JSON.parse(serializedUser);
      this.initHistoryFeatureStates(user);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe();
  }

  // ----- OnInit Component methods ----- //

  initHistoryFeatureStates(user: UserInterface): void {
    this.updateUserState(user);
    this.validAuthentication();
    this.loadUsers();
    this.onLoadUserTasks(user);
    this.loadUserGithub();
  }

  updateUsersState(users: UserInterface[] | null) {
    if (users !== null) {
      this.usersState = users;
    } else {
      this.usersState = null;
    }
  }

  validAuthentication(): void {
    this.isAuthState = true;
  }

  loadUsers(): void {
    this.subscriptions.add(
      this.userService.getAllUsers().subscribe((_observer: UserInterface[]) => {
        const data = _observer;
        this.usersState = data.filter((user: UserInterface) => {
          return user.id !== this.userState?.id;
        });
      })
    );
  }

  onLoadUserTasks(user: UserInterface | null) {
    if (this.userState !== null && this.isAuthState && user) {
      if (this.userState !== user) {
        this.formDisplayState = false;
        this.teamPartnerState = { ...user };
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

  onCloseForm(event: boolean) {
    this.formDisplayState = !event;
  }

  loadUserGithub(): void {
    if (this.userState !== null) {
      this.subscriptions.add(
        this.githubService
          .getGithubByUser(this.userState)
          .subscribe((_observer: GithubInterface | null) => {
            this.githubState = _observer;
            if (_observer) this.isGitSyncButtonDisplayed = _observer.enabled;
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

  onToggleFormState(): void {
    this.formDisplayState = !this.formDisplayState;
  }

  onSyncGitTasks(): void {
    if (this.githubState && this.userState?.id) {
      const newTask: TaskInterface = {
        user: this.userState.id,
        date: this.todayDate,
        commits: [],
        list: [],
      };

      const todayTask = this.tasksState?.find(
        (task) => task.date === this.todayDate
      );

      this.subscriptions.add(
        this.githubService
          .geGithubCommits(this.githubState, this.todayDateIso)
          .pipe(
            map((commits) => {
              return commits.filter(
                (commit: any) =>
                  this.githubState?.committer === commit.author.login
              );
            })
          )
          .subscribe((response) => {
            if (response.length > 0) {
              newTask.list?.push(
                ...response.map((resp: any) => resp.commit.message)
              );

              newTask.commits?.push(
                ...response.map((resp: any) => {
                  return {
                    hash: resp.sha,
                    url: resp.html_url,
                  };
                })
              );

              if (todayTask === undefined) {
                this.taskService
                  .createTask(newTask)
                  .subscribe((tasks: TasksAndMeta) => {
                    this.tasksState = tasks.data;
                    //TODO create message modal component
                    alert(
                      `Sync well done: A new task set for today has been created from github !`
                    );
                  });
              } else {
                newTask.id = todayTask.id;
                this.taskService
                  .updateTask(newTask)
                  .subscribe((tasks: TasksAndMeta) => {
                    this.tasksState = tasks.data;
                    //TODO create message modal component
                    alert(
                      `Sync well done: The task set for today has been updated from github !`
                    );
                  });
              }
            } else {
              //TODO create message modal component
              alert(
                `Not commit found today for the github user:  ${this.githubState?.committer}`
              );
            }
          })
      );
    }
  }

  onShowSignUp(isShown: boolean): void {
    this.isSigningUpState = isShown;
  }
}
