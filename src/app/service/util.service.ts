import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor(private snackBar: MatSnackBar) {}
  convDateToStr(date: Date): string {
    const mm = date.getMonth() + 1;
    const dd = date.getDate();

    return [
      date.getFullYear(),
      (mm > 9 ? '' : '0') + mm,
      (dd > 9 ? '' : '0') + dd,
    ].join('');
  }

  openSnackBar(
    message: string,
    action: string,
    type: 'info' | 'error' | 'warn' = 'info'
  ): void {
    this.snackBar.open(message, action, { panelClass: [`${type}-snackbar`] });
  }
}
