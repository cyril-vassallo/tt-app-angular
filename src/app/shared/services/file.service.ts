import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { constant } from '../../../config/config';
import { map, mapTo, observable, Observable } from 'rxjs';
import { FileUrlDataInterface } from '../interfaces/interfaces';
import { FileUrlAndMeta } from '../types/types';

@Injectable()
export class FileService {
  constructor(private http: HttpClient) {}

  public upload(file: any): Observable<FileUrlAndMeta> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http
      .post(constant.API_URL + constant.FILE, formData)
      .pipe(map((_observable) => _observable as FileUrlAndMeta));
  }
}
