import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  showError(message: string, action: string = 'OK', duration = 10000) {
    this.snackBar
      .open(message, action, {
        duration: duration,
        verticalPosition: 'top',
        panelClass: ['notification-error'],
      })
      .onAction()
      .subscribe(() => this.snackBar.dismiss());
  }
}
