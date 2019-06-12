import { UserInfo } from './../models/userInfo';
import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { EndpointService } from './endpoint.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
// tslint:disable-next-line:import-blacklist

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit, OnDestroy {
  private loggedIn = new BehaviorSubject<boolean>(this.getUserAvailability());
  userinfo: UserInfo;
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
    this.endpointService.ValidateUser(email, password).subscribe(loginResponse => {
      try {
        if (loginResponse && loginResponse.token) {
          this.cookieService.set('currentUser', JSON.stringify(loginResponse));
          this.loggedIn.next(true);
          this.router.navigate(['/home']);
        } else {
          this.loggedIn.next(false);
          this.router.navigate(['/login']);
        }
      } catch (err) {
        console.error('login failed');
      }
    });
    this.router.navigate(['/home']);
  }
  logout() {
    this.cookieService.delete('currentUser');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
