import { Injectable, Injector } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpResponse,
    HttpErrorResponse,
    HttpEvent,
} from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { SpinnerService } from '../services/spinner.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

    constructor(
        public spinnerService: SpinnerService,
    ) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // const showLoader = request.headers.get('showLoader') ? request.headers.get('showLoader')?.toLowerCase() === 'true' : false;
        // The showLoader should be added to the header to the api when the develloper wants to show the loader on api call and stop it when it returns
        // Commented because of the cors error from backend
        const showLoader = false;
        if (showLoader) { this.spinnerService.pushRequest(request); }
        return next.handle(request).pipe(
            tap((response: HttpEvent<any>) => {
                    if (
                        (response instanceof HttpResponse) ||
                        (response instanceof HttpErrorResponse)
                    ) {
                        if (showLoader) { this.spinnerService.popRequest(); }
                    }
                    return response;
                }
            ), catchError((error) => {
                if (showLoader) { this.spinnerService.popAllRequest(); }
                return throwError(error);
            })
        );
    }

}
