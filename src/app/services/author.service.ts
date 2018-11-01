import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/internal/operators';
import * as _ from 'lodash';

import { AuthService } from './auth/auth.service';

import { Author } from '../models/author.model';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(
    private http: HttpClient,
    private authService: AuthService) {
  }

  getAuthorInfoById(id: string) {
    const url = `${environment.cmsAPIUrl}/author/findOneById`;

    const headers = this.getHeaders();

    return this.http.post(url, null, {headers, params: {'id': id}}).pipe(
      map((response: any) => new Author().deserialize(response.resultMap.data)
    ));
  }

  getHeaders(): HttpHeaders {
    const headers = new HttpHeaders()
      .append('Authorization', `Bearer ${this.authService.getToken()}`)
      .append('Content-Type', 'application/json');

    return headers;
  }
}
