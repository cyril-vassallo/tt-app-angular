import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { constant } from '../../config/config';
import { UserInterface, GithubInterface } from '../Interfaces/Interfaces';
import { map, Observable } from 'rxjs';
import { catchError, of, tap } from 'rxjs';


@Injectable()
export class GithubService {
  constructor(private http: HttpClient) {}


  // path: /github
  public createOne(github: GithubInterface): Observable<GithubInterface> {
    return this.http.post<GithubInterface>( constant.API_URL + constant.GITHUB, github)
    .pipe(
      map( (_observable: any) => {
        return _observable.data as GithubInterface 
      }),
    )
  }

  // path: /github
    public updateOne(github: GithubInterface): Observable<GithubInterface> {
      return this.http.patch<GithubInterface>( constant.API_URL + constant.GITHUB, github)
      .pipe(
        map( (_observable: any) => {
          return _observable.data as GithubInterface 
        }),
      )
    }

  // path: /github/user/{:userId}
  public getGithubByUser(user: UserInterface): Observable<GithubInterface|null> {
    return this.http.get<GithubInterface|null>(constant.API_URL + constant.GITHUB + constant.USER + '/' + user.id)
    .pipe(
      map((_observable: any) => {
        return _observable.data as GithubInterface;
      }),
      catchError((err: any) => {
        return of(null);
      }),
    );
  }

  // path: /repos/{:owner}/{:repository}/branches/{:branch}
  public checkGithubRepository(github: GithubInterface):  Observable<any> {
    return this.http.get<any>(constant.API_GITHUB + constant.REPOS  + '/' + github.owner + '/' + github.repository + constant.BRANCHES + '/' + github.branch)
      .pipe(
        catchError(err => of({status : err.status}))
      );
  }

}
