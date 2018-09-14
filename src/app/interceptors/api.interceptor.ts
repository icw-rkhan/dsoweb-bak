import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { AppConfig } from '../app.config';

const PREFIX_API = '@api/';
const SESSION_EXPIRED_STATUS_CODES = [401, 403, 407];

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(private appConfig: AppConfig) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.startsWith(PREFIX_API)) {
      let url = this.appConfig.apiUrl + request.url.slice(PREFIX_API.length - 1);
      if (request.url.endsWith('login')) {
        url = this.appConfig.authUrl + request.url.slice(PREFIX_API.length - 1);
      }

      /*
      TODO: Token example
      const token = this.authService.token;

      const setHeaders = token ? {
        'Authorization': token
      } : {};
      */
      const setHeaders = {};

      request = request.clone({url, setHeaders});
    }

    return next.handle(request).pipe(
      tap(response => this.handleResponse(response)),
      catchError(error => this.handleError(error))
    );
  }

  private handleResponse(response: any): Observable<HttpEvent<any>> {
    this.handleAuthError(response);

    return <Observable<HttpEvent<any>>>of({});
  }

  private handleError(error: any): Observable<HttpEvent<any>> {
    const isAuthError = this.handleAuthError(error);

    return !isAuthError ? throwError(error) : <Observable<HttpEvent<any>>>of({});
  }

  private handleAuthError(response: any) {
    const sessionExpired = SESSION_EXPIRED_STATUS_CODES.includes(response.status)
      && !response.url.endsWith('/user/login');

    return true;
  }
}
