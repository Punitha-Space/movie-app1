import { Component, OnInit } from '@angular/core';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angular5-social-login';
import { TokenService } from '../../auth/token.service';
import { Router } from '@angular/router';
import { UserAuthService } from '../../auth/userAuth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private user: any;
  public loggedIn: boolean;
  public version: string = environment.VERSION;

  constructor(private authService: AuthService,
    private _tokenService: TokenService,
    private _userAuthService: UserAuthService,
    private router: Router) {
  }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  public signInWithGoogle() {
    this.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  public signInWithFacebook() {
    this.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  private signIn(socialPlatformProvider) {
    this.authService.signIn(socialPlatformProvider).then(
      (userData) => {
        this._tokenService.setToken(userData.token);
        localStorage.setItem('token', userData.token);
        this._userAuthService.setIsAuthenticated(this.loggedIn);
        this._userAuthService.setLoggedInUser(this.user);
        this.router.navigate(['/home']);
      }
    );
  }


}
