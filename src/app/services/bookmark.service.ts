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
    const url = `${environment.profileApiUrl}/bookmark/getAllByEmail`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.auth.getToken()}`);

    return this.http.post(url, null, {
      headers,
      params: {email}
    }).pipe(
      map((response: any) =>
        response.resultMap.bookmarkList.map(post => new Bookmark().deserialize(post))
      ),
    );
  }

  saveBookmark(bookmark: Bookmark) {
    const url = `${environment.profileApiUrl}/bookmark/save`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.auth.getToken()}`);

    return this.http.post(url, bookmark, {headers});
  }

  deleteOneById(id: string) {
    const url = `${environment.profileApiUrl}/bookmark/deleteOneById`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.auth.getToken()}`);

    return this.http.post(url, null, {
      headers,
      params: {id}
    });
  }

}
