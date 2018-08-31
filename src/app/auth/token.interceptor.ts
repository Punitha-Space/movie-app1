import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';
import { UserAuthService } from './userAuth.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private auth_token: string;
  constructor(public token: TokenService,
    private _userAuthService: UserAuthService,
    private router: Router) {
    if (localStorage.getItem('token')) {
      this.auth_token = localStorage.getItem('token');
    }

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth_token}`
      }
    });
    return next.handle(request).do((event: HttpEvent<any>) => { }, (error: any) => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {
          // this._userAuthService.signOut();
          this.token.setToken(false);
          localStorage.clear();
          this.router.navigate(['login']);
        }
      }
    });
  }
}
