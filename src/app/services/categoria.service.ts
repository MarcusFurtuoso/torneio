import { Injectable } from '@angular/core';
import { Categoria } from '../dto/model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private baseUrl: string = "http://localhost:8080/api/categoria";

  constructor(private http: HttpClient) {}


  buscarCategoriasPorTorneioId(torneioId: string | null): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.baseUrl}/${torneioId}`);
  }
}
