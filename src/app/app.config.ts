import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()
export class Config {

  public endPointUrl: string;
  configureScreen = { showGenre: true };
  public constant = {
    'HTTP_ERRORS': {
      'UNAUTHORIZED': 401
    }
  };


  constructor() {
    this.endPointUrl = environment.baseUrl + '/_ah/api';
  }

  getAppConfig() {
    return this.configureScreen;
  }
}

