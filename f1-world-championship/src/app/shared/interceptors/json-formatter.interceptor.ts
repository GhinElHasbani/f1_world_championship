import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SpinnerService } from '../services/spinner.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class JsonFormatterInterceptor implements HttpInterceptor {

    constructor(
        public spinnerService: SpinnerService,
    ) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(request.url.includes(environment.baseUrl)){

            request = request.clone({
                url: `${request.url}.json`
            });
        }

        return next.handle(request).pipe(tap(
            event => { },
            error => { }
        ));
    }

}
