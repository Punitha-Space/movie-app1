import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { RestService } from '../../services/rest.service';

@Injectable()
export class ProfileService {

  constructor(private _restService: RestService) {
  }
  getProfile(params) {
    return this._restService.get(environment.apiUrls.getProfile, params);
  }
  getProfileOTP(params) {
    return this._restService.post(environment.apiUrls.getProfileOTP, params);
  }

  saveProfile(params) {
    return this._restService.post(environment.apiUrls.saveProfile, params);
  }
}

