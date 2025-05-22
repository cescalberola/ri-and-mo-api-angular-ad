import {
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad, CanActivateChild {
  constructor(private auth: AuthService, private router: Router) {}

  private checkRoles(allowedRoles: string[] | undefined): boolean {
    if (this.auth.isLoggedIn() && allowedRoles?.includes(this.auth.role!)) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    const roles = route.data?.['roles'] as string[] | undefined;
    return this.checkRoles(roles);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const roles = route.data?.['roles'] as string[] | undefined;
    return this.checkRoles(roles);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const roles = childRoute.data?.['roles'] as string[] | undefined;
    return this.checkRoles(roles);
  }
}
