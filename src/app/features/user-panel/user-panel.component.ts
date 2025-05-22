import { Component } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  gotoCharacters() {
    this.router.navigate(['/characters']);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
