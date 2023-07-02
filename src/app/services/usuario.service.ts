import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../dto/model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private baseUrl: string = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient) {}

  public buscarUsuarios(): Observable<Usuario[]> {
    const usuario = JSON.parse(localStorage.getItem('usuario-logado')!);
    return this.http.get<Usuario[]>(`${this.baseUrl}/${usuario.id}`);
  }
}
