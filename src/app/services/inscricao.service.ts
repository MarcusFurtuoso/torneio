import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InscricaoForm } from '../dto/model';

@Injectable({
  providedIn: 'root'
})
export class InscricaoService {

  
  private baseUrl: string = "http://localhost:8080/api/inscricao";

  constructor(private http: HttpClient) {}

  public realizarInscricao(inscricaoForm: InscricaoForm): Observable<any> {
    return this.http.post(this.baseUrl, inscricaoForm);
  }

}
