import { LoginResponse } from './../models/loginResponse';
import { UserInfo } from './../models/userInfo';
import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { EndpointService } from './endpoint.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { Common } from '../shared/common';
import { HttpHeaders } from '@angular/common/http';
// tslint:disable-next-line:import-blacklist

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit, OnDestroy {
  private loggedIn = new BehaviorSubject<boolean>(this.getUserAvailability());
  userinfo: UserInfo;

  // loginResponse: LoginResponse;
  constructor(private endpointService: EndpointService, private cookieService: CookieService,
    // tslint:disable-next-line:align
    private router: Router) { }
  ngOnInit(): void {
  }

  ngOnDestroy(): void {

  }
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }
  getUserAvailability(): boolean {
    if (this.cookieService.get('currentUser') !== '') {
      return true;
    } else {
      return false;
    }
  }
  ValidateUser(email, password) {
    // this.ValidateUser(email, password).subscribe (loginResponse => {
    this.endpointService.ValidateUser(email, password).subscribe(loginResponse => {

      try {
        console.log(email, password);
        console.log(loginResponse);

        if (loginResponse && loginResponse.token) {
          // headers: HttpHeaders = new HttpHeaders();
          this.cookieService.set('currentUser', JSON.stringify(loginResponse));
          // const headers = new HttpHeaders();
          // headers.append("Authorization", loginResponse.token);
          // console.log(headers);
          this.loggedIn.next(true);
          this.router.navigate(['/home']);
        } else {
          this.loggedIn.next(false);
          this.router.navigate(['/login']);
          // console.error('login failed');
        }
      } catch (err) {
        console.error('login failed');
      }

    });
    this.router.navigate(['/home']);
    // console.log(username, password);
  }
  logout() {
    this.cookieService.delete('currentUser');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
