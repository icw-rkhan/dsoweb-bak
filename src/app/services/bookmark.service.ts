import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { map } from 'rxjs/internal/operators';

import { environment } from '../../environments/environment';
import { Bookmark } from '../models/bookmark.model';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  constructor(private http: HttpClient, private auth: AuthService) {
  }

  getAllByEmail(email: string): Observable<Bookmark[]> {
    const url = `${environment.cmsAPIUrl}/bookmark/findAllByEmail`;

    const headers = this.getHeaders();

    const result =  this.http.post(url, {'email': email}, {headers}).pipe(
      map((response: any) =>
        response.resultMap.bookmarkList.map(post => new Bookmark().deserialize(post))
      ));

    return result;
  }

  saveBookmark(bookmark: Bookmark) {
    const url = `${environment.cmsAPIUrl}/bookmark/save`;

    const headers = this.getHeaders();

    return this.http.post(url, bookmark, {headers});
  }

  deleteOneById(id: string) {
    const url = `${environment.cmsAPIUrl}/bookmark/deleteOneById`;

    const headers = this.getHeaders();

    return this.http.post(url, null, {headers, params: {'id': id}});
  }

  getHeaders(): HttpHeaders {
    const headers = new HttpHeaders()
      .append('Authorization', `Bearer ${this.auth.getToken()}`)
      .append('Content-Type', 'application/json');

    return headers;
  }

}
