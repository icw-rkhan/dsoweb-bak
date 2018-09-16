import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (state.url.indexOf('auth') === -1 && !this.authService.isAuthenticated()) {
      this.router.navigate(['/auth', 'welcome']);
      return false;
    }

    if (state.url.indexOf('auth') !== -1 && this.authService.isAuthenticated()) {
      this.router.navigate(['/profile']);
      return false;
    }

    return true;
  }
}
