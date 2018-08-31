import { Component, OnInit } from '@angular/core';
import { UserAuthService } from './auth/userAuth.service';
import { Observable } from 'rxjs/Observable';
import { TokenService } from './auth/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'movieBox';
  public loading = false;
  public authenticated = false;
  isLoggedIn$: Observable<boolean>;

  constructor(private _userAuthService: UserAuthService,
    private _token: TokenService) {
    this.authenticated = false;
  }

  ngOnInit() {
    this.isLoggedIn$ = this._userAuthService.isLoggedIn;
    if (localStorage.getItem('token')) {
      this.authenticated = true;
    }
  }

}
