import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
// title = 'AdminPenal';
isLoggedIn$: Observable<boolean>;
// username: string;
 title: string;
  constructor( private router: Router, private authservice: AuthService) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authservice.isLoggedIn;
    this.title = environment.defaultName;

  }
  onLogOut() {
    this.authservice.logout();
    // this.router.navigate(['/login']);
  }

}
