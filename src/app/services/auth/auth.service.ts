import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { environment } from '../../../environments/environment';

const CLIENT_ID = 'fooClientIdPassword';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) {
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  login(body: any): Observable<any> {
    const url = `${environment.profileApiUrl}/userAccount/login`;
    return this.http.post(url, Object.assign({client_id: CLIENT_ID}, body)).pipe(
      map(this.extractData)
    );
  }

  register(body: any): Observable<any> {
    const url = `${environment.profileApiUrl}/userAccount/register`;
    return this.http.post(url, Object.assign({client_id: CLIENT_ID}, body)).pipe(
      map(this.extractData)
    );
  }

  loginSuccess(data: any) {
    this.storeUserInformation(data.resultMap);
  }

  sendEmail(body: any) {
    const url = `${environment.profileApiUrl}/emailToken/sendEmail`;
    return this.http.post(url, body).pipe(
      map(this.extractData)
    );
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
