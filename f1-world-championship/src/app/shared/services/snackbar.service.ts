import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable()
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(otext: string, action?: string, position: MatSnackBarVerticalPosition = 'bottom', durationInMilliSeconds: number = 2500) {
      this.snackBar.open(otext, (action),
      { duration: durationInMilliSeconds,
        panelClass: 'successful-snackbar',
        horizontalPosition: 'center',
        verticalPosition: position
      });
  }

  openWarningSnackBar(otext: string, action?: string, position: MatSnackBarVerticalPosition = 'bottom', durationInMilliSeconds: number = 2500) {
    this.snackBar.open(otext, action,
      {
        duration: durationInMilliSeconds,
        panelClass: 'warn-snackbar',
        horizontalPosition: 'center',
        verticalPosition: position });
  }

  disposeWarningSnackbarSubscription() {
  }
}
