import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.model';
import { map } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {
  }

  posts(): Observable<Post[]> {
    const url = `@api/posts?_embed`;
    return this.http.get(url).pipe(
      map((response: any[]) => response.map(post => new Post().deserialize(post)))
    );
  }

  getPostbyCategory(category: number): Observable<Post[]> {
    const url = `@api/posts?categories=` + category;
    return this.http.get(url).pipe(
      map((response: any[]) => response.map(post => new Post().deserialize(post)))
    );    
  }
}

