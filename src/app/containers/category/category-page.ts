import { Component, OnInit } from '@angular/core';

import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './category-page.html',
  styleUrls: ['./category-page.scss']
})
export class CategoryPageComponent implements OnInit {

  categories$: Observable<Category[]>;

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.categories;
  }

}
