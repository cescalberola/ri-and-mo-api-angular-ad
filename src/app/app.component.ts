import { Component } from '@angular/core';
import { AuthService } from './core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  constructor(public auth: AuthService, private router: Router) {
  }

  login(role: 'user' | 'admin') {
    this.auth.loginAs(role);
    this.router.navigate(['/']);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
