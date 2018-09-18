import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators';
import { Observable } from 'rxjs';

import { Post } from '../models/post.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {
  }

  posts(type?: string): Observable<Post[]> {
    const url = `${environment.cmsApiUrl}/posts?_embed`;
    let result = this.http.get(url).pipe(
      map((response: any[]) => response.map(post => new Post().deserialize(post)))
    );

    // TODO: Temporal while API is ready to filter in the server
    if (type) {
      result = result.pipe(map(posts => posts.filter(post => post.format === type)));
    }

    return result;
  }

  fetchByCategory(id: number): Observable<Post[]> {
    const url = `${environment.cmsApiUrl}/posts?_embed&categories=${id}`;
    return this.http.get(url).pipe(
      map((response: any[]) => response.map(post => new Post().deserialize(post)))
    );
  }

  fetchById(id: number): Observable<Post> {
    const url = `${environment.cmsApiUrl}/posts/${id}?_embed`;
    return this.http.get(url).pipe(
      map((response: any) => new Post().deserialize(response))
    );
  }

}
