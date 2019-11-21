import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private _isLogued: boolean = false;
  private cookieName: string = "login";

  constructor(private cookieService: CookieService) {

  }

  setUserLogued(user: string) {
    this.cookieService.set(this.cookieName, user);
    this._isLogued = true;
  }

  deleteCookie() {
    this.cookieService.delete(this.cookieName);
    this._isLogued = false;
  }

  getUserLogued(): string {
    return this.cookieService.get(this.cookieName);
  }

  get isLogued(): boolean {
    return this.cookieService.get(this.cookieName) != "";
  }
}