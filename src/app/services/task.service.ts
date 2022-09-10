import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { constant } from '../../config/config';
import { UserInterface } from '../Interfaces/Interfaces';
import { Observable } from 'rxjs';
import { TaskAndMeta, TasksAndMeta, IdAndMeta } from '../types/types';
import { TaskInterface } from '../Interfaces/Interfaces';

@Injectable()
export class TaskService {
  constructor(private http: HttpClient) {}


  // path: /task
  public createTask(task: TaskInterface): Observable<TaskAndMeta> {
    return this.http.post<TaskAndMeta>(constant.API_URL + constant.TASK, task);
  }

  // path: /task/last
  public getLastCreatedTaskId(): Observable<IdAndMeta> {
    return this.http.get<IdAndMeta>(constant.API_URL + constant.TASK + constant.LAST);
  }

  // path: /task/user/{:userId}
  public getTasksByUser(user: UserInterface): Observable<TasksAndMeta> {
    return this.http.get<TasksAndMeta>(
      constant.API_URL + constant.TASK + constant.USER + '/'+ user.id
    );
  }

  // path: /task
  public updateTask(task: TaskInterface): Observable<TaskAndMeta> {
    return this.http.patch<TaskAndMeta>(constant.API_URL + constant.TASK, task);
  }

  // path: /task/user/{:userId}
  public deleteTasksByUser(user: UserInterface): Observable<TaskAndMeta> {
    return this.http.delete<TaskAndMeta>(constant.API_URL + constant.TASK + constant.USER + '/'+ user.id );
  }

  // path: /task/user/{:userId}/today
  public deleteTodayTask(user: UserInterface): Observable<TaskAndMeta> {
    return this.http.delete<TaskAndMeta>(constant.API_URL + constant.TASK + constant.USER + '/' + user.id + constant.TODAY);
  }

  // path: /task
  public deleteAllAppTask(): Observable<TaskAndMeta> {
    return this.http.delete<TaskAndMeta>(constant.API_URL + constant.TASK);
  }

}
