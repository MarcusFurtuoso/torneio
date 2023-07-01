import { TokenService } from '../services/token.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const jwtToken: string | null = this.tokenService.getJwtToken();

    if (jwtToken) {
      const requestWithToken = request.clone({
        withCredentials: true,
        headers: new HttpHeaders({
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": `application/json`,
        })
      });
      return next.handle(requestWithToken);
    };

    return next.handle(request);
  };
};

export const httpRequestInterceptorJwtProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: JwtInterceptor,
  multi: true
}
