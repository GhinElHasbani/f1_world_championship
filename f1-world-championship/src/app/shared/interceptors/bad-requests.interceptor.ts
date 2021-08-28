import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
  HttpEvent
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class BadRequestsInterceptor implements HttpInterceptor {

  constructor(
    public _snackBar: MatSnackBar
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((err: HttpEvent<any>) => {
        if (err instanceof HttpErrorResponse && !request.url.includes('/version.json')) {
          if (err.status === 400 || err.status === 403) {
            if (err.error) {
              this._snackBar.open(err.error['message'], null, {
                duration: 1000
              });
            }
            else {
              this._snackBar.open('error', null, {
                duration: 1000
              });
            }
          }
          if (err.status === 500) {
            this._snackBar.open('Something went wrong.', null, {
              duration: 1000
            });
          }
          if (err.status === 0) {
            this._snackBar.open('Fatal error', null, {
              duration: 1000,
            });
          }
          if (err.status === 404) {
            this._snackBar.open('Not found', null, {
              duration: 1000,
            });
          }
        }
      }),
      catchError(err => {
        if (!request.url.includes('/version.json')) {
          if (err.status === 400 || err.status === 403 || err.status===401) {
            if (err.error) {
              if (err.error['message'] === "Invalid Credentials" || err.error['error_description'] ==="Invalid user credentials") {
                this._snackBar.open("إن اسم المستخدم أو كلمة المرور غير صحيحة", null, {
                  duration: 3000
                });
              } else if (err.error['code'] === "DUPLICATE") {

              }
              else {
                if (err.error['message'] === undefined) {
                  this._snackBar.open(JSON.parse(err.error)['message'], null, {
                    duration: 1000
                  });
                } else {
                  this._snackBar.open(err.error['message'], null, {
                    duration: 1000
                  });
                }
              }
            }
            else {
              this._snackBar.open('error', null, {
                duration: 1000
              });
            }
            //this._snackBar.open(err.error['message']);
          }
          if (err.status === 500) {
            this._snackBar.open('Something went wrong.', null, {
              duration: 1000
            });
          }
          if (err.status === 0) {
            this._snackBar.open('Fatal error', null, {
              duration: 1000,
            });
          }
          if (err.status === 404) {
            this._snackBar.open('Not found', null, {
              duration: 1000,
            });
          }
        }
        if (request.url.includes('/curfew_officer_log')) {
          return throwError(JSON.parse(err.error));
        }

        if (err.error?.code) {
          this._snackBar.open(err.error.message, null, {
            duration: 1000,
          });
          if (err.error.code == "DUPLICATE") {
            return throwError(err.error)
          }
          return throwError(err.error?.code);
        }
        if (JSON.parse(err.error).code) {
          return throwError(JSON.parse(err.error)['code']);
        }
        if (JSON.parse(err.error).message) {
          return throwError(JSON.parse(err.error)['message']);
        }
        else {
          return throwError(err.error);
        }
      })
    )
  }

}
