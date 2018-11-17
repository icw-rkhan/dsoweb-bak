import { Injectable } from '@angular/core';
import { map } from 'rxjs/internal/operators';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as _ from 'lodash';


import { BookmarkService } from './bookmark.service';
import { AuthService } from './auth/auth.service';

import { Unite } from '../models/unite.model';
import { Post } from '../models/post.model';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UniteService {

    constructor(
        private http: HttpClient,
        private authService: AuthService) {

    }

    findAll(body: any): Observable<Unite[]> {
        const url = `${environment.cmsAPIUrl}/magazine/findAll`;
        const headers = this.getHeaders();

        return this.http.post(url, body, {headers}).pipe(map((response: any) =>
            response.resultMap.data.map(unite => new Unite().deserialize(unite))));
    }

    findOneById(id: string): Observable<Post[]> {
        const url = `${environment.cmsAPIUrl}/magazine/findOneById`;
        const headers = this.getHeaders();
        const param = {
            'id': id
        };

        return this.http.post(url, null, {headers, params: param}).pipe(map((response: any) =>
        response.resultMap.data.contents.map(post => new Post().deserialize(post))));
    }

    getHeaders(): HttpHeaders {
        const headers = new HttpHeaders()
          .append('Authorization', `Bearer ${this.authService.getToken()}`)
          .append('Content-Type', 'application/json');

        return headers;
      }
}
