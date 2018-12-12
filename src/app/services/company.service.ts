import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/internal/operators';
import { Observable } from 'rxjs';

import { AuthService } from './auth/auth.service';
import { environment } from '../../environments/environment';
import { Company } from '../models/company.model';
import { Review } from '../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient, private auth: AuthService) {
  }

  comments(): Observable<Company[]> {
    const url = `${environment.careerAPIUrl}/comment/findAllCompanyComment`;

    const headers = this.getHeaders();

    return this.http.post(url, null, {headers}).pipe(
      map((response: any) => response.resultMap.map(comment => new Company().deserialize(comment)))
    );
  }

  getCommentByCompanyId(id: string): Observable<Review> {
    const url = `${environment.careerAPIUrl}/comment/findCommentByCompanyId`;

    const headers = this.getHeaders();

    return this.http.post(url, {'companyId': id}, {headers}).pipe(
      map((response: any) => response.resultMap.map(comment => new Review().deserialize(comment)))
    );
  }

  companies(): Observable<Company[]> {
    const url = `${environment.careerAPIUrl}/company/findAllCompanys`;

    const headers = this.getHeaders();

    return this.http.post(url, null, {headers}).pipe(
      map((response: any) => response.resultMap.map(comment => new Company().deserialize(comment)))
    );
  }

  getCompanyById(id: string): Observable<Company> {
    const url = `${environment.careerAPIUrl}/company/findOneById`;

    const headers = this.getHeaders();

    return this.http.post(url, {'companyId': id}, {headers}).pipe(
      map((response: any) => response.resultMap.map(comment => new Company().deserialize(comment)))
    );
  }

  getHeaders(): HttpHeaders {
    const headers = new HttpHeaders()
      .append('Authorization', `Bearer ${this.auth.getToken()}`)
      .append('Content-Type', 'application/json');

    return headers;
  }
}
