import {
  Component,
  Input,
  Output,
  OnInit,
  OnDestroy,
  EventEmitter,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import format from 'date-fns/format';
import { UserInterface } from 'src/app/shared/interfaces/interfaces';
import { Subscription } from 'rxjs';
import { TaskService } from '../../../../shared/services/task.service';
import {
  TaskInterface,
  CommitInterface,
} from '../../../../shared/interfaces/interfaces';
import { TaskAndMeta } from '../../../../shared/types/types';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit, OnDestroy {
  constructor(private taskService: TaskService) {}

  @Input() hasTask: boolean = false;
  @Input() tasks: TaskInterface[] | null = null;
  @Input() user: UserInterface | null = null;
  @Output() onTasksStateEvent = new EventEmitter<TaskInterface[] | null>();

  task: TaskInterface | null = null;
  isTodayTaskExist: boolean = false;
  isValidCommit: boolean = true;
  date: string = format(new Date(), 'dd/MM/yyyy');
  userAgent: string = navigator.userAgent;
  lastCreatedTaskId: number | null = null;

  taskForm = new FormGroup({
    taskInput: new FormControl(''),
  });

  commitForm = new FormGroup({
    commitHashInput: new FormControl(''),
    commitUrlInput: new FormControl(''),
  });

  subscriptions: Subscription = new Subscription();

  // ----- Component lifecycle methods ----- //

  ngOnInit(): void {
    this.todayTaskExistChecking();
    this.updateTask();
    this.isTodayTaskExist ? (this.hasTask = true) : (this.hasTask = false);
  }

  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe();
  }

  // ----- Component methods ----- //

  onTaskFormSubmit(): void {
    this.todayTaskExistChecking();

    if (!this.isTodayTaskExist) {
      this.initializeNewTask();
    }

    this.updateTaskList();
    this.updateTask();
  }

  onCommitFormSubmit(): void {
    this.checkIfCommitInputsAreValid();
    if (this.isValidCommit) {
      this.updateCommitsList();
      this.updateTask();
    } else {
      this.isValidCommit = false;
    }
    this.resetInputsState();
  }

  todayTaskExistChecking(): void {
    if (this.tasks) {
      const todayTasks: TaskInterface[] = this.tasks.filter((task) => {
        return task.date == this.date;
      });

      if (todayTasks.length > 0) {
        this.task = todayTasks[0];
        this.isTodayTaskExist = true;
      } else {
        this.isTodayTaskExist = false;
      }
    } else {
      this.isTodayTaskExist = false;
    }
  }

  updateTask(): void {
    switch (this.isTodayTaskExist) {
      case true:
        if (this.task !== null) {
          this.subscriptions.add(
            this.taskService
              .updateTask(this.task)
              .subscribe((_observer: TaskAndMeta) => {
                this.task = _observer.data;
                this.updateTasksState();
              })
          );
        }
        break;
      case false:
        if (this.task !== null) {
          this.subscriptions.add(
            this.taskService
              .createTask(this.task)
              .subscribe((_observer: TaskAndMeta) => {
                this.task = _observer.data;
                this.updateTasksState();
              })
          );
        }
        break;
    }
  }

  updateTasksState(): void {
    if (this.tasks) {
      this.tasks = this.tasks.map((task) => {
        if (task.id && task.id === this.task?.id) {
          return this.task;
        } else {
          return task;
        }
      });
    } else if (!this.tasks && this.task) {
      this.tasks = [this.task];
    } else {
      this.tasks = null;
    }

    if (this.tasks) {
      this.onTasksStateEvent.emit(this.tasks);
      this.resetInputsState();
      this.hasTask = true;
    }
  }

  updateTaskList(): void {
    if (this.task?.list && this.taskForm.value.taskInput) {
      this.task.list.push(this.taskForm.value.taskInput);
    }
  }

  updateCommitsList(): void {
    const commit: CommitInterface = {
      url: this.commitForm.value.commitUrlInput,
      hash: this.commitForm.value.commitHashInput,
    };

    this.task?.commits?.push(commit);
  }

  initializeNewTask(): void {
    if (this.user?.id && this.taskForm.value.taskInput !== null) {
      this.task = {
        user: this.user.id,
        date: this.date,
        list: [],
        commits: [],
      };
    }
  }

  resetInputsState(): void {
    this.taskForm.reset();
    this.commitForm.reset();
  }

  checkIfCommitInputsAreValid(): void {
    this.isValidCommit =
      this.commitForm.value.commitHashInput !== null &&
      this.commitForm.value.commitHashInput !== undefined &&
      this.commitForm.value.commitHashInput !== '' &&
      this.commitForm.value.commitUrlInput !== null &&
      this.commitForm.value.commitUrlInput !== undefined &&
      this.commitForm.value.commitUrlInput !== '';
  }

  getLastTaskIdFromDb(): void {
    //Mouve to initializeNewTask
    this.subscriptions.add(
      this.taskService.getLastCreatedTaskId().subscribe((_observer) => {
        this.lastCreatedTaskId = _observer.data;
      })
    );
  }
}
