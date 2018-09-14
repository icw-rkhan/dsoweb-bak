import { Component, OnInit } from '@angular/core';

import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { Observable } from 'rxjs';
import { MatSelectChange } from '@angular/material';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';

@Component({
  templateUrl: './category-page.html',
  styleUrls: ['./category-page.scss']
})
export class CategoryPageComponent implements OnInit {

  categories$: Observable<Category[]>;
  posts$: Observable<Post[]>;

  constructor(private categoryService: CategoryService, private postService: PostService) {
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.categories;
  }

  selectCategory(event: MatSelectChange) {
    this.posts$ = this.postService.fetchByCategory(event.value);
  }

}
