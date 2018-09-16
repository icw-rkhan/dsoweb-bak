import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return true;
    // if (state.url.indexOf('auth') !== -1) {
    //   if (this.authService.isAuthenticated()) {
    //     this.router.navigate(['/profile']);
    //     return false;
    //   } else {
    //     return true;
    //   }
    // } else {
    //   if (this.authService.isAuthenticated()) {
    //     return true;
    //   } else {
    //     this.router.navigate(['/auth', 'welcome']);
    //     return false;
    //   }
    // }
  }
}
