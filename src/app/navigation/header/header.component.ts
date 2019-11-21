import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isNavbarCollapsed=true;
  isLogued: boolean;
  isAdmin: boolean = true;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
      this.isLogued = this.loginService.isLogued;
  }

  logout(): void {
    this.isLogued = false;
    this.loginService.deleteCookie();
    this.router.navigate([""]);
  }
}
