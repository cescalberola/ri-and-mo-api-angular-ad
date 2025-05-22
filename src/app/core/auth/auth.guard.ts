import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const expectedRoles = route.data['roles'] as Array<string>;
    if (this.auth.isLoggedIn() && expectedRoles.includes(this.auth.role!)) {
      return true;
    }
    // no autorizado → redirigir al home
    this.router.navigate(['/']);
    return false;
  }
}
