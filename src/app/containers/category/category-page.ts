import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Category } from '../../models/category.model';

@Component({
  templateUrl: './category-page.html',
  styleUrls: ['./category-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryPageComponent implements OnInit {

  categories: Category[] = [];

  ngOnInit(): void {
    this.categories.push({
      id: 1,
      name: 'Orthodontics'
    });
    this.categories.push({
      id: 2,
      name: 'Practice Management'
    });
    this.categories.push({
      id: 3,
      name: 'DSOs'
    });
    this.categories.push({
      id: 4,
      name: 'Generic Dentistry'
    });
    this.categories.push({
      id: 5,
      name: 'Implant Dentistry'
    });
  }

}
