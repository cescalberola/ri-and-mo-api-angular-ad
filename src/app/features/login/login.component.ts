// src/app/features/login/login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  loginAsUser() {
    this.auth.loginAs('user');
    this.router.navigate(['/user']);
  }

  loginAsAdmin() {
    this.auth.loginAs('admin');
    this.router.navigate(['/admin']);
  }
}
