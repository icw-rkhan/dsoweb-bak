import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MatSelectChange } from '@angular/material';
import { NgProgress } from '@ngx-progressbar/core';

import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';

@Component({
  templateUrl: './category-page.html',
  styleUrls: ['./category-page.scss']
})
export class CategoryPageComponent implements OnInit {

  categories$: Observable<Category[]>;
  posts$: Observable<Post[]>;

  constructor(private categoryService: CategoryService, private postService: PostService, private progress: NgProgress) {
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.categories;
  }

  selectCategory(event: MatSelectChange) {
    this.progress.start();
    this.posts$ = this.postService.fetchByCategory(event.value);
    const categorySub = this.posts$.subscribe(() => {
      this.progress.complete();
      categorySub.unsubscribe();
    });
  }

}
