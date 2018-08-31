import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { RestService } from '../../services/rest.service';
import { HttpParams } from '@angular/common/http';


@Injectable()
export class HomeService {

  constructor(private _restService: RestService) {
  }

  getMovies(params) {
    return this._restService.post(environment.apiUrls.queryMovies, params);
  }

  getTrendingMovies(limit) {
    const queryParams = new HttpParams()
      .set('queryLimit', limit);
    return this._restService.getWithParams(environment.apiUrls.queryTrendingMovies, queryParams);

  }

}
