import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Torneio } from '../dto/model';

@Injectable({
  providedIn: 'root'
})
export class TorneioService {

  private baseUrl: string = "http://localhost:808/api/torneio";

  constructor(private http: HttpClient) {}

  public buscarTorneios(): Observable<Torneio[]> {
    return this.http.get<Torneio[]>(this.baseUrl);
  }

  buscarTorneioPorId(torneioId: string | null): Observable<Torneio> {
    return this.http.get<Torneio>(`${this.baseUrl}/${torneioId}`);
  }

}
