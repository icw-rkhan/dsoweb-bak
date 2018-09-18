import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/internal/operators';
import { Observable } from 'rxjs';

import { AuthService } from './auth/auth.service';
import { environment } from '../../environments/environment';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient, private auth: AuthService) {
  }

  comments(postId: number): Observable<Comment[]> {
    const url = `${environment.profileApiUrl}/getComments/${postId}`;
    console.log(url);
    
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.auth.getToken()}`);
    
    return this.http.get(url,{headers}).pipe(
      map((response: any[]) => {
        return response['resultMap']['comments'];
      })
    );
  }

  setComment(body: any) {
    const url = `${environment.profileApiUrl}/saveComment`;

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.auth.getToken()}`);

    return this.http.post(url, body, {headers});
  }
  
}
