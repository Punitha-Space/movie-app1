import { Injectable } from '@angular/core';
import { AuthService } from 'angular5-social-login';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UserAuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private isAuthenticated: boolean;
  private user: any;

  constructor(private _authService: AuthService,
    private router: Router,
    private toastr: ToastrService) {
    this.isAuthenticated = false;
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  setIsAuthenticated(value) {
    this.loggedIn.next(true);
    this.isAuthenticated = value;
  }

  isUserAuthenticated() {
    return this.isAuthenticated;
  }

  setLoggedInUser(user) {
    this.user = user;
  }

  getLoggedInUser() {
    console.log('USER' + this.user);
    return this.user;
  }

  signOut() {
    this._authService.signOut().then(() => {
      localStorage.clear();
      this.loggedIn.next(false);
      this.router.navigate(['/login']);
    });
  }
}
