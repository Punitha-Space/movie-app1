import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { RestService } from './rest.service';
import { HttpParams } from '@angular/common/http';


@Injectable()
export class MoviesService {

  constructor(private _restService: RestService) {
  }

  fetchMovies(params) {
    return this._restService.post(environment.apiUrls.queryMovies, params);
  }

  fetchTrendingMovies(limit) {
    const queryParams = new HttpParams().set('queryLimit', limit);
    return this._restService.getWithParams(environment.apiUrls.queryTrendingMovies, queryParams);
  }

}
