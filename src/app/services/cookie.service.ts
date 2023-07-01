import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  private cookie: string;

  constructor() {
    this.cookie = document.cookie;
  }

  public setCookie(cookieName: string, cookieValue: string, expirationTime: number): void {

    const cookieNameStr: string = encodeURIComponent(cookieName);
    const cookieValueStr: string = encodeURIComponent(cookieValue);
    const expire: string = this.expirationDate(expirationTime);

    this.cookie = `${cookieNameStr}=${cookieValueStr};expires=${expire};path=/;`;

    console.log(this.cookie)
  }

  public getCookie(cookieName: string): string | null {

    const cookies: string[] = this.cookie.split(';');

    for (const cookie of cookies) {

      const [name, value] = cookie.trim().split('=');

      if (decodeURIComponent(name) === cookieName) {
        return decodeURIComponent(value);
      }
    }
    return null;
  }

  public deleteCookie(cookieName: string): void {

    const cookieNameStr: string = encodeURIComponent(cookieName);
    const expire: string = this.expirationDate(-1);

    this.cookie = `${cookieNameStr}=;expires=${expire};path=/;`;
  }

  public expirationDate(expirationDays: number): string {
    const date = new Date();
    date.setDate(date.getDate() + expirationDays);
    return date.toUTCString();
  }

}
