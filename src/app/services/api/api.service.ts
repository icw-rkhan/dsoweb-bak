import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestOptionsArgs, RequestOptions } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';


const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  public get(uri: Array<any> | any, options?: RequestOptionsArgs): Observable<any> {
    const [url, moreOptions] = this._constructRequest(uri, options);
    return this.http.get(url).pipe(
      map(this.extractData),
      catchError(this.handleError())
    );
  }

  public post(uri: Array<any> | any, body: any, options?: RequestOptionsArgs): Observable<any> {
    const [url, moreOptions] = this._constructRequest(uri, options);
    return this.http.post(url, body, moreOptions).pipe(
      catchError(this.handleError())
    );
  }

  public put(uri: Array<any> | any, body: any, options?: RequestOptionsArgs): Observable<any> {
    const [url, moreOptions] = this._constructRequest(uri, options);
    return this.http.put(url, body, moreOptions).pipe(
      catchError(this.handleError())
    );
  }

  public delete(uri: Array<any> | any, options?: RequestOptionsArgs): Observable<any> {
    const [url, moreOptions] = this._constructRequest(uri, options);
    return this.http.delete(url, moreOptions).pipe(
      catchError(this.handleError())
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

  private handleError (operation = 'operation', result?: any) {
    return (error: any): Observable<any> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result);
    };
  }
}
