import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandler extends ErrorHandler {

    handleError(error: any): void {
        const chunkFailedMessage = /Loading chunk [\d]+ failed/;

        if (chunkFailedMessage.test(error.message)) {
            console.log('failed chuck error');
            window.location.reload();
        }
        else { 
            console.log('not chuck error');
            super.handleError(error) }
        // other stuff for error handling.
    }
}