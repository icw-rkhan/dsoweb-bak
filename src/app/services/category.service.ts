import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, shareReplay } from 'rxjs/internal/operators';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';

const CACHE_SIZE = 1;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private _categories$: Observable<Category[]>;

  constructor(private http: HttpClient) {
  }

  public fetchCategories() {
    const url = `@api/categories`;
    return this.http.get(url).pipe(
      map((response: any[]) =>
        response.map(category => new Category().deserialize(category))
      )
    );
  }

  get categories(): Observable<Category[]> {
    if (!this._categories$) {
      this._categories$ = this.fetchCategories().pipe(
        shareReplay(CACHE_SIZE)
      );
    }
    return this._categories$;
  }

}
