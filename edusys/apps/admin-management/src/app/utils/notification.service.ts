import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ICommonError } from '@edusys/core';
import { transformError } from './error-transform';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  showSuccess(message: string, action: string = 'OK', duration = 5000) {
    this.snackBar
      .open(message, action, {
        duration: duration,
        verticalPosition: 'top',
        panelClass: ['notification-info'],
      })
      .onAction()
      .subscribe(() => this.snackBar.dismiss());
  }

  showWarning(message: string, action: string = 'OK', duration = 10000) {
    this.snackBar
      .open(message, action, {
        duration: duration,
        verticalPosition: 'top',
        panelClass: ['notification-warning'],
      })
      .onAction()
      .subscribe(() => this.snackBar.dismiss());
  }

  showError(error: string | HttpErrorResponse | ICommonError, action: string = 'OK', duration = 10000) {
    const errorMessage = transformError(error);
    this.snackBar
      .open(errorMessage, action, {
        duration: duration,
        verticalPosition: 'top',
        panelClass: ['notification-error'],
      })
      .onAction()
      .subscribe(() => this.snackBar.dismiss());
  }
}
