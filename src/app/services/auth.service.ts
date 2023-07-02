import { CadastroForm, LoginForm, UsuarioRespostaApi } from 'src/app/dto/model';
import { Injectable } from '@angular/core';
import {Observable, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AuthResponse} from "../dto/auth-response";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl: string = "http://localhost:8080/api/usuario";

  constructor(
    private httpClient: HttpClient,
  ) {}

  public login(loginForm: LoginForm): Observable<UsuarioRespostaApi> {
    const url: string = `${this.apiUrl}/login`;
    return this.httpClient.post<UsuarioRespostaApi>(url, loginForm)
      .pipe(
        tap((response) => {
          localStorage.setItem("usuario-logado", JSON.stringify(response))
        }),
      );
  };

  public cadastro(cadastroForm: CadastroForm): Observable<UsuarioRespostaApi> {
    const url:string = `${this.apiUrl}/cadastro`;
    return this.httpClient.post<UsuarioRespostaApi>(url, cadastroForm);
  };


  public logout(): void {
    localStorage.clear();
  };

  public temUsuarioLogado(): boolean {
    return !!localStorage.getItem("usuario-logado");
  };

}
