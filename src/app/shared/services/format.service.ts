import { Injectable } from '@angular/core';
import { formatISO } from 'date-fns';

@Injectable()
export class FormatService {
  public dateToIso(date: Date): string {
    return formatISO(
      new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() - 1,
        date.getHours(),
        date.getMinutes(),
        date.getSeconds()
      )
    );
  }
}
