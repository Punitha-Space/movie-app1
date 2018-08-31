import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../app.config';


@Injectable()
export class RestService {

  constructor(private _http: HttpClient,
    private _config: Config) {
  }

  /**
   *  Extends the HttpOptions to include custom headers
   *  @param customHeaders optional custom headers
   *  @returns {httpOptions}
   */
  private _extendHttpOptions(customHeaders?: Object) {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    let extendedHeader: any;
    if (customHeaders) {
      for (const header in customHeaders) {
        if (header) {
          extendedHeader = headers.append(header, customHeaders[header]);
        }
      }
    } else {
      extendedHeader = headers;
    }
    const httpOptions: any = { headers: extendedHeader };
    return httpOptions;
  }

  /**
   *  Perform HTTP GET request
   *  @param url url of the resource to be fetched
   *  @param headers optional custom headers
   *  @returns {Observable}
   */
  public get(url: string, headers?: Object): Observable<any> {
    return this._http.get(this.constructUrl(url), this._extendHttpOptions(headers));
  }

  /**
   *  Perform HTTP POST request
   *  @param url url of the resource
   *  @param body request body
   *  @param headers optional custom headers
   *  @returns {Observable}
   */
  public post(url: string, body: Object, headers?: Object): Observable<any> {
    return this._http.post(this.constructUrl(url), JSON.stringify(body), this._extendHttpOptions(headers));
  }

  /**
   *  Perform HTTP PUT request
   *  @param url url of the resource
   *  @param body request body
   *  @param headers optional custom headers
   *  @returns {Observable}
   */
  public put(url: string, body: Object, headers?: Object): Observable<any> {
    return this._http.put(this.constructUrl(url), JSON.stringify(body), this._extendHttpOptions(headers));
  }

  /**
   *  Perform HTTP DELETE request
   *  @param url url of the resource to be deleted
   *  @param headers optional custom headers
   *  @returns {Observable}
   */
  public delete(url: string, headers?: Object): Observable<any> {
    return this._http.delete(this.constructUrl(url), this._extendHttpOptions(headers));
  }

  /**
   *  Perform HTTP PATCH request
   *  @param url url of the resource
   *  @param body request body
   *  @param headers optional custom headers
   */
  public patch(url: string, body: Object, headers?: Object): Observable<any> {
    return this._http.patch(this.constructUrl(url), JSON.stringify(body), this._extendHttpOptions(headers));
  }

  /**
   * Constructs the full url based on configuration.
   * @param url
   * @returns {any}
   */
  private constructUrl(url: string) {
    return `${this._config.endPointUrl}${url}`;
  }

  public postWithQuery(url: string, queryParams: String, headers?: Object): Observable<any> {
    return this._http.post(this.constructUrl(url) + '?' + queryParams, {}, this._extendHttpOptions(headers));
  }

  public getWithResolve(url: string, params?: HttpParams) {
    return this._http.get(this.constructUrl(url), { params });
  }

  public getWithParams(url: string, params?: HttpParams): Observable<any> {
    return this._http.get(this.constructUrl(url), { params });
  }
}
