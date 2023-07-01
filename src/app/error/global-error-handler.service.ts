import { ErrorHandler } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler{

  constructor() {}

  handleError(error: Error): void {

    console.error(`global intercept error: ${error.message}`);
    // deal with errors
  }

}

export const customErrorHandler = {
  provide: ErrorHandler,
  useClass: GlobalErrorHandlerService
}
