import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { RestService } from '../../services/rest.service';
import { HttpParams } from '@angular/common/http';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import 'rxjs/add/operator/toPromise';
import {
  Router, Resolve, RouterStateSnapshot, ActivatedRoute, ActivatedRouteSnapshot,
} from '@angular/router';

@Injectable()
export class MovieDetailService implements Resolve<any>  {
  private movieKey: string;
  constructor(private _restService: RestService,
    private _route: ActivatedRoute,
    private router: Router,
    private spinnerService: Ng4LoadingSpinnerService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    this.spinnerService.show();
    this._route.params.subscribe(params => {
      this.movieKey = params['movieKey'] || localStorage.getItem('movieKey');
    });
    return this.getMovie(this.movieKey).toPromise().then(movie => {
      this.spinnerService.hide();
      if (movie) {
        return movie;
      } else { // movie not found
        this.router.navigate(['/login']);
        return false;
      }
    });
  }
  getMovie(params) {
    const queryParams = new HttpParams()
      .set('websafeMovieKey', params);
    return this._restService.getWithResolve(environment.apiUrls.getMovie, queryParams);
  }

}
