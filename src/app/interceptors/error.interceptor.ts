import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        retry(0),
        catchError(err => {

          if (err instanceof ErrorEvent) {
            console.log(`Error: ${err.error.message}`);
          } else {

            if ([403, 401].includes(err.status)) {
              console.log("deal with errors");
            }

          }

          // create method throw erros by status with switch case and conditional

          const errorMessage = err.error.message || err.statusText;
          return throwError(() => new Error(`${errorMessage}`));
        })
      );
  }
}

export const httpRequestInterceptorErrorsProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorsInterceptor,
  multi: true
}
