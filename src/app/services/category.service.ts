import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, shareReplay } from 'rxjs/internal/operators';
import { Observable } from 'rxjs';

import { AuthService } from './auth/auth.service';
import { Category } from '../models/category.model';
import { ContentType } from '../models/content-type.model';

import { environment } from '../../environments/environment';

const CACHE_SIZE = 1;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categories$: Observable<Category[]>;

  constructor(
    private http: HttpClient,
    private authService: AuthService) {
  }

  private fetchCategories() {
    const url = `${environment.cmsAPIUrl}/category/findAllCategory`;

    const headers = this.getHeaders();

    return this.http.post(url, null, {headers}).pipe(
      map((response: any) =>
        response.resultMap.data.map(category => new Category().deserialize(category))
      )
    );
  }

  get categories(): Observable<Category[]> {
    if (!this.categories$) {
      this.categories$ = this.fetchCategories().pipe(
        shareReplay(CACHE_SIZE)
      );
    }

    return this.categories$;
  }

  getAllContentTypes(): Observable<ContentType[]> {
    const url = `${environment.cmsAPIUrl}/category/findAllContentType`;

    const headers = this.getHeaders();

    return this.http.post(url, null, {headers}).pipe(
      map((response: any) =>
        response.resultMap.data.map(contentType => new ContentType().deserialize(contentType))
      )
    );
  }

  getHeaders(): HttpHeaders {
    const headers = new HttpHeaders()
      .append('Authorization', `Bearer ${this.authService.getToken()}`)
      .append('Content-Type', 'application/json');

    return headers;
  }

}
