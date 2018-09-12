import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestOptionsArgs, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

const apiUrl = environment.apiUrl;
const CLIENT_ID = 'fooClientIdPassword';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  public get(uri: Array<any> | any, options?: RequestOptionsArgs): Observable<any> {
    const [url, moreOptions] = this._constructRequest(uri, options);
    const request = this.http.get(url, moreOptions);
    return this._connect(request);
  }

  public post(uri: Array<any> | any, body: any, options?: RequestOptionsArgs): Observable<any> {
    const [url, moreOptions] = this._constructRequest(uri, options);
    const request = this.http.post(url, Object.assign({}, body, { client_id: CLIENT_ID }), moreOptions);
    return this._connect(request);
  }

  public put(uri: Array<any> | any, body: any, options?: RequestOptionsArgs): Observable<any> {
    const [url, moreOptions] = this._constructRequest(uri, options);
    const request = this.http.put(url, Object.assign({}, body, { client_id: CLIENT_ID }), moreOptions);
    return this._connect(request);
  }

  public delete(uri: Array<any> | any, options?: RequestOptionsArgs): Observable<any> {
    const [url, moreOptions] = this._constructRequest(uri, options);
    const request = this.http.delete(url, moreOptions);
    return this._connect(request);
  }

  private _connect(request: any) {
    return request.pipe(
      map(this.extractData)
    );
  }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  private _constructRequest(uri: Array<any> | any, moreOptions?: RequestOptionsArgs): any {
    const url = Array.prototype.concat(apiUrl, uri).join(String.fromCharCode(47));
    let options: RequestOptions = new RequestOptions();
    if (moreOptions) {
      options = options.merge(moreOptions);
    }
    return [url, options];
  }
}
