import { NgModule, Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerInterceptor } from '../interceptors/spinner.interceptor';
import { BadRequestsInterceptor } from '../interceptors/bad-requests.interceptor';
import { JsonFormatterInterceptor } from '../interceptors/json-formatter.interceptor';

@NgModule({
})
export class InterceptorsModule {
    static forShared(): Provider[] {
        return [
            {
                provide: HTTP_INTERCEPTORS,
                useClass: SpinnerInterceptor,
                multi: true
            },
            {
                provide: HTTP_INTERCEPTORS,
                useClass: BadRequestsInterceptor,
                multi: true
            },
            {
                provide: HTTP_INTERCEPTORS,
                useClass: JsonFormatterInterceptor,
                multi: true
            },
            
        ];
    }
}
