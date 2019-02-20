import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
      'skip': args.page * args.per_page,
      'authorId': args.authorId ? args.authorId : null,
      'categoryId': args.categoryId ? args.categoryId : null,
      'contentTypeId': args.type ? args.type : null,
      'sponsorId': args.sponsorId ? args.sponsorId : null,
      'isFeatured': args.isFeatured ? args.isFeatured : null
    };

    // set auth token
    const headers = this.getHeaders();

    console.log(headers);

    return this.http.post(url, body, {headers}).pipe(
      map((response: any) => response.resultMap.data.map(post => new Post().deserialize(post)))
    );
  }

  fetchByCategoryId(args: PostArgs): Observable<Post[]> {
    return this.posts(args);
  }

  fetchByContentTypeId(args: PostArgs): Observable<Post[]> {
    return this.posts(args);
  }

  fetchBySponsorId(args: PostArgs): Observable<Post[]> {
    return this.posts(args);
  }

  fetchById(id: string): Observable<Post> {
    const url = `${environment.cmsAPIUrl}/content/findOneContents`;

    // set auth token
    const headers = this.getHeaders();

    const email = this.authService.getUserInfo().user_name;

    return forkJoin(
      this.http.post(url, null, {headers, params: {'id': id}}).pipe(
        map((response: any) => new Post().deserialize(response.resultMap.data))
      ),
      this.bookmarkService.getAllByEmail(email)
    ).pipe(
      map(join => {
        const post = join[0];
        const bookmarks = join[1];
        // Check if post has isBookmark
        const bookmark = bookmarks.find(b => b.postId === post.id);
        // Add bookmarks attributes
        return Object.assign({}, post, {
          isBookmark: !_.isUndefined(bookmark),
          bookmarkId: !_.isUndefined(bookmark) ? bookmark.postId : undefined
        });
      })
    );
  }

  search(body: any): Observable<Post[]> {
    const url = `${environment.cmsAPIUrl}/content/findAllByValue`;

    // set auth token
    const headers = this.getHeaders();

    return this.http.post(url, body, {headers}).pipe(
      map((response: any) => response.resultMap.data.map(post => new Post().deserialize(post)))
    );
  }

  getHeaders(): HttpHeaders {
    const headers = new HttpHeaders()
      .append('Authorization', `Bearer ${this.authService.getToken()}`)
      .append('Content-Type', 'application/json');

    return headers;
  }

}
