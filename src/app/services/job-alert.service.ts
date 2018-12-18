import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/internal/operators';
import { Observable } from 'rxjs';

import { AuthService } from './auth/auth.service';
import { environment } from '../../environments/environment';
import { Alert } from '../models/alert.model';

@Injectable({
  providedIn: 'root'
})
export class JobAlertService {

  constructor(private http: HttpClient, private auth: AuthService) {
  }

  jobAlerts(body: any): Observable<Alert[]> {
    const url = `${environment.careerAPIUrl}/remind/findRemindsByUserId`;

    const headers = this.getHeaders();

    return this.http.post(url, body, {headers}).pipe(
      map((response: any) => response.resultMap.positionRemindingPOs.map(alert => new Alert().deserialize(alert)))
      );
  }

  addAlert(body: any) {
    const url = `${environment.careerAPIUrl}/remind/addRemind`;

    const headers = this.getHeaders();

    return this.http.post(url, body, {headers});
  }

  editAlert(body: any) {
    const url = `${environment.careerAPIUrl}/remind/updateOneById`;

    const headers = this.getHeaders();

    return this.http.post(url, body, {headers});
  }

  deleteAlert(id: string) {
    const url = `${environment.careerAPIUrl}/remind/deleteOneById`;

    const headers = this.getHeaders();

    return this.http.post(url, null, {headers, params: {'id': id}});
  }

  jobAlert(id: string): Observable<Alert> {
    const url = `${environment.careerAPIUrl}/remind/findOneById`;

    const headers = this.getHeaders();

    return this.http.post(url, null, {headers, params: {'id': id}}).pipe(
      map((response: any) => new Alert().deserialize(response.resultMap.positionReminding)));
  }

  getHeaders(): HttpHeaders {
    const headers = new HttpHeaders()
      .append('Authorization', `Bearer ${this.auth.getToken()}`)
      .append('Content-Type', 'application/json');

    return headers;
  }
}
