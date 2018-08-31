import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../auth/userAuth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _userAuthService: UserAuthService,
    private router: Router) {
  }

  ngOnInit() {
  }

  signOut() {
    this._userAuthService.signOut();
  }

}
