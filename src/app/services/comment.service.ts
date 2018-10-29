import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/internal/operators';
import { Observable } from 'rxjs';

import { AuthService } from './auth/auth.service';
import { environment } from '../../environments/environment';
import { Comment } from '../models/comment.model';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private profileService: ProfileService) {
  }

  comments(postId: string): Observable<Comment[]> {
    const url = `${environment.cmsAPIUrl}/comment/findAllByContent`;

    const headers = this.getHeaders();

    return this.http.post(url, null, {headers, params: {'contentId': postId}}).pipe(
      map((response: any) => response.resultMap.data.map(comment => new Comment(this.profileService).deserialize(comment)))
    );
  }

  setComment(body: any) {
    const url = `${environment.cmsAPIUrl}/comment/addComment`;

    const headers = this.getHeaders();

    return this.http.post(url, body, {headers});
  }

  getHeaders(): HttpHeaders {
    const headers = new HttpHeaders()
      .append('Authorization', `Bearer ${this.auth.getToken()}`)
      .append('Content-Type', 'application/json');

    return headers;
  }
}
