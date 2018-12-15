import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/internal/operators';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

import { AuthService } from './auth/auth.service';
import { DSOCompany } from '../models/dso-company.model';
import { DSOCompanyReview } from '../models/dso-company-review.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient, private auth: AuthService) {
  }

  getCommentByCompanyId(id: string): Observable<DSOCompanyReview> {
    const url = `${environment.careerAPIUrl}/comment/findCommentByDSOId`;

    const headers = this.getHeaders();

    const body = {
      'dsoId': id,
      'sort': 5,
      'start': 0
    };

    return this.http.post(url, body, {headers}).pipe(
      map((response: any) => response.resultMap.map(comment => new DSOCompanyReview().deserialize(comment)))
    );
  }

  setComment(body: any) {
    const url = `${environment.careerAPIUrl}/comment/addComment`;

    const headers = this.getHeaders();

    return this.http.post(url, body, {headers});
  }

  dsoCompanies(body: any): Observable<DSOCompany[]> {
    const url = `${environment.profileApiUrl}/dso/findAllDSOs`;

    const headers = this.getHeaders();

    return this.http.post(url, body, {headers}).pipe(
      map((response: any) => response.resultMap.map(company => new DSOCompany().deserialize(company)))
    );
  }

  getCompanyById(id: string): Observable<DSOCompany> {
    const url = `${environment.careerAPIUrl}/company/findOneById`;

    const headers = this.getHeaders();

    return this.http.post(url, {'companyId': id}, {headers}).pipe(
      map((response: any) => response.resultMap.map(comment => new DSOCompany().deserialize(comment)))
    );
  }

  getHeaders(): HttpHeaders {
    const headers = new HttpHeaders()
      .append('Authorization', `Bearer ${this.auth.getToken()}`)
      .append('Content-Type', 'application/json');

    return headers;
  }
}
