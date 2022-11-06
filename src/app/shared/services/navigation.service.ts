import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { constant } from '../../../config/config';
import { Observable } from 'rxjs';
import { NavigationAndMeta } from '../types/types';

@Injectable()
export class NavigationService {
  constructor(private http: HttpClient) {}

  // path: /navigation
  public getNavigation(): Observable<NavigationAndMeta> {
    return this.http.get<NavigationAndMeta>(
      constant.API_URL + constant.NAVIGATION
    );
  }
}
