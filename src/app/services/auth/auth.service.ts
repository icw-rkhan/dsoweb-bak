import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { JwtHelper } from 'angular2-jwt';

const CLIENT_ID = 'fooClientIdPassword';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(
    private http: HttpClient
  ) { }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  login(body: any): Observable<any> {
    const url = '@api/userAccount/login';
    return this.http.post(url, Object.assign({ client_id: CLIENT_ID }, body)).pipe(
      map(this.extractData)
    );
  }

  register(body): Observable<any> {
    const url = '@api/userAccount/register';
    return this.http.post(url, Object.assign({ client_id: CLIENT_ID }, body)).pipe(
      map(this.extractData)
    );
  }

  loginSuccess(data: any) {
    this.storeUserInformation(data.resultMap);
  }

  storeUserInformation(data: any) {
    if (data) {
      localStorage.setItem('token', data.accesstoken);
    }
  }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }
}
