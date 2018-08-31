import {Injectable} from '@angular/core';

@Injectable()
export class TokenService {
  public token: string;

  constructor() {
  }

  setToken(token) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }

}
