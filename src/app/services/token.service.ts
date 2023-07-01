import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private JWT_TOKEN: string = "jwt-token";

  constructor() {}

  public getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  public storedJwtToken(jwtToken: string) {
    return localStorage.setItem(this.JWT_TOKEN, jwtToken);
  }

  public clearAllStorage(): void{
    localStorage.clear();
  }

}
