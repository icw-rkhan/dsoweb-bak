import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,
   HttpParams } from '@angular/common/http';
import { map } from 'rxjs/internal/operators';
import { forkJoin, Observable } from 'rxjs';
import * as _ from 'lodash';

import { Post, PostArgs } from '../models/post.model';

import { BookmarkService } from './bookmark.service';
import { AuthService } from './auth/auth.service';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private bookmarkService: BookmarkService) {
  }

  posts(args: PostArgs): Observable<Post[]> {
    const url = `${environment.cmsAPIUrl}/content/findAllContents`;

    const body = {
      'limit': args.per_page,
      'skip': args.page,
      'categoryId': args.categoryId ? args.categoryId : null,
      'contentTypeId': args.type ? args.type : null,
      'sponserId': args.sponsorId ? args.sponsorId : null
    };

    // set auth token
    const headers = this.getHeaders();

    const result = this.http.post(url, body, {headers}).pipe(
      map((response: any) => response.resultMap.data.map(post => new Post().deserialize(post)))
    );

    return result;
  }

  fetchByCategoryId(args: PostArgs): Observable<Post[]> {
    return this.posts(args);
  }

  fetchByContentTypeId(args: PostArgs): Observable<Post[]> {
    return this.posts(args);
  }

  fetchById(id: number): Observable<Post> {
    const url = `${environment.cmsAPIUrl}/content/findOneContents`;

    const param = new HttpParams();
    param.append('id', id.toString());

    // set auth token
    const headers = this.getHeaders();

    const email = this.authService.getUserInfo().user_name;

    return forkJoin(
      this.http.post(url, null, {headers, params: param}).pipe(
        map((response: any) => new Post().deserialize(response))
      ),
      this.bookmarkService.getAllByEmail(email)
    ).pipe(
      map(join => {
        const post = join[0];
        const bookmarks = join[1];
        // Check if post has bookmarked
        const bookmark = bookmarks.find(b => b.postId === post.id);
        // Add bookmarks attributes
        return Object.assign({}, post, {
          isBookmark: !_.isUndefined(bookmark),
          bookmarkId: !_.isUndefined(bookmark) ? bookmark.id : undefined
        });
      })
    );
  }

  search(term: string): Observable<Post[]> {
    const url = `${environment.cmsAPIUrl}/posts?_embed&search=${term}&order=desc`;
    return this.http.get(url).pipe(
      map((response: any[]) => response.map(post => new Post().deserialize(post)))
    );
  }

  fetchBySponsorId(args: PostArgs): Observable<Post[]> {
    return this.posts(args);
  }

  getHeaders(): HttpHeaders {
    const headers = new HttpHeaders()
      .append('Authorization', `Bearer ${this.authService.getToken()}`)
      .append('Content-Type', 'application/json');

    return headers;
  }

}
