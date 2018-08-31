import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { RestService } from '../../services/rest.service';

@Injectable()
export class GalleryService {

  constructor(private _restService: RestService) {
  }

  getPurchasedMovies() {
    return this._restService.get(environment.apiUrls.getDownloadMovies, {});
  }

}
