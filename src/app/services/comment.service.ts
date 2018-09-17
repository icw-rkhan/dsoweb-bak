import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) {
  }

  comments(postId: number): Observable<Comment[]> {
    const url = `${environment.profileApiUrl}/getComments/${postId}`;
    console.log(url);
    
    return this.http.get(url).pipe(
      map((response: any[]) =>{
        return response['resultMap']['comments'];
      })
    );
  }

  setComment(body: any) {
    const url = `${environment.profileApiUrl}/saveComment`;
    return this.http.post(url, Object.assign(body)).pipe(
      map(this.extractData)
    );
  }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }
}
