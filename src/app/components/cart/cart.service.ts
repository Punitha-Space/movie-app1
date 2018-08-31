import { Injectable } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { environment } from '../../../environments/environment';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class CartService {

  constructor(private _restService: RestService) { }

  getProfile(params) {
    return this._restService.get(environment.apiUrls.getProfile, params);
  }

  purchaseMovie(params) {
    return this._restService.postWithQuery(environment.apiUrls.purchaseMovie, params);
  }

  makePaymentTransaction(params) {
    return this._restService.post(environment.apiUrls.makeTransaction, params);
  }

  queryOffers(limit) {
    const queryParams = new HttpParams()
      .set('queryLimit', limit);
    return this._restService.getWithParams(environment.apiUrls.queryOffers, queryParams);

  }

}
