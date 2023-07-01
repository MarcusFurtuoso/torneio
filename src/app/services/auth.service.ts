import { Injectable } from '@angular/core';
import {Observable, tap} from 'rxjs';
import { TokenService } from './token.service';
import {HttpClient} from '@angular/common/http';
import { UserCredentials } from '../models/user-credentials';
import { UserRegister } from '../models/user-register';
import {AuthResponse} from "../dto/auth-response";
import {ForgotPasswordResponse} from "../dto/forgot-password-response";
import {ForgotPasswordRequest} from "../dto/forgot-password-request";
import {ResetPasswordRequest} from "../dto/reset-password-request";
import {ResetPasswordResponse} from "../dto/reset-password-response";
import {CheckResetCodeResponse} from "../dto/check-reset-code-response";
import {CheckResetCodeRequest} from "../dto/check-reset-code-request";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // add url to env
  private apiUrl: string = "http://localhost:8080/api/v1/auth";
  private resetPasswordToken!: string;

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) {}

  public signIn(credentials: UserCredentials): Observable<AuthResponse> {
    const url: string = `${this.apiUrl}/login`;
    return this.httpClient.post<AuthResponse>(url, credentials)
      .pipe(
        tap((response: AuthResponse) => {
          const token: string = response.token;
          // add refresh
          this.tokenService.storedJwtToken(token)
        }),
      );
  };

  public signUp(user: UserRegister): Observable<AuthResponse> {
    const url:string = `${this.apiUrl}/register`;
    return this.httpClient.post<AuthResponse>(url, user)
      .pipe(
        tap((response: AuthResponse) => {
          const token: string = response.token;
          // add refresh
          this.tokenService.storedJwtToken(token)
        }),
      );
  };

  public forgotPassword(data: ForgotPasswordRequest): Observable<ForgotPasswordResponse> {
    const url: string = `${this.apiUrl}/forgot-password`;
    return this.httpClient.post<ForgotPasswordResponse>(url, data);
  }

  public checkResetCode(data: CheckResetCodeRequest): Observable<CheckResetCodeResponse> {
    const url: string = `${this.apiUrl}/check-code`;
    return this.httpClient.post<CheckResetCodeResponse>(url, data)
      .pipe(
        tap((response: CheckResetCodeResponse) => {
          this.resetPasswordToken = response.resetToken;
        }),
      );
  }

  public resetPassword(data: ResetPasswordRequest): Observable<ResetPasswordResponse> {
    const url: string = `${this.apiUrl}/reset-password`;
    const dataAddResetToken: ResetPasswordRequest = {
      resetToken: this.resetPasswordToken,
      ...data
    };
    return this.httpClient.post<ResetPasswordResponse>(url, dataAddResetToken)
      .pipe(tap(() => this.resetPasswordToken = ""));
  }

  public logout(): void {
    this.tokenService.clearAllStorage();
  };

  public hasUserLoggedIn(): boolean {
    return !!this.tokenService.getJwtToken();
  };

}
