import { Component, OnInit } from '@angular/core';
import { CategoryService } from './services/category.service';

@Component({
  selector: 'dso-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit() {
    // Fetch categories once
    this.categoryService.fetchCategories();
  }

}
