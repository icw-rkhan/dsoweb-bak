import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, shareReplay } from 'rxjs/internal/operators';
import { Observable } from 'rxjs';

import { AuthService } from './auth/auth.service';

import { Category } from '../models/category.model';

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

    return this.http.get(url).pipe(
      map((response: any[]) =>
        response.map(category => new Category().deserialize(category))
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

  getHeaders(): HttpHeaders {
    const headers = new HttpHeaders()
      .append('Authorization', `Bearer ${this.authService.getToken()}`)
      .append('Content-Type', 'application/json');

    return headers;
  }

}
