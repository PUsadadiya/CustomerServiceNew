import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginform: FormGroup;
  public submitted: boolean = false;
  // tslint:disable-next-line:max-line-length
  constructor(private formBuilder: FormBuilder, private cookieService: CookieService, private authservice: AuthService, private router: Router) {
    if (this.cookieService.get('currentUser') != null) {
      this.router.navigate(['/home']);
    }
  }
  ngOnInit() {
    this.loginform = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      }
    );
  }
  get f() { return this.loginform.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.loginform.invalid) {
      return;
    }
    this.authservice.ValidateUser(this.loginform.value.email, this.loginform.value.password);

  }
}
