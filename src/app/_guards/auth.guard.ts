import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public router: Router) {
  }

  canActivate(): boolean {
    if (localStorage.getItem('token')) {
      // logged in so return true
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
