import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Category } from '../../../models/category.model';
import { CategoryService } from '../../../services/category.service';
import { Observable } from 'rxjs';
import { MatDialogRef } from '@angular/material';
import { FilterDialogStatus } from '../../../enums/filter-dialog-status';

@Component({
  templateUrl: './bookmark-filter-dialog.component.html',
  styleUrls: ['./bookmark-filter-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarkFilterDialogComponent implements OnInit {

  categories: Category[];
  contentTypes: any;
  categoryId: number;

  constructor(public dialogRef: MatDialogRef<BookmarkFilterDialogComponent>, private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.categoryService.categories.subscribe(date => {
      const categoryList = [];
      let i = 0;
      for (i = 0; i < date.length; i++) {
        const categoryItem = date[i];
        if (!categoryItem.name.includes('*')) {
          categoryList.push(categoryItem);
        }
      }

      this.categories = categoryList;
    });

    this.contentTypes = [];
    this.contentTypes.push({
      id: 0,
      name: 'Videos'
    });
    this.contentTypes.push({
      id: 1,
      name: 'Articles'
    });
    this.contentTypes.push({
      id: 2,
      name: 'Podcast'
    });
    this.contentTypes.push({
      id: 3,
      name: 'Interview'
    });
    this.contentTypes.push({
      id: 4,
      name: 'Tech Guides'
    });
    this.contentTypes.push({
      id: 5,
      name: 'Animations'
    });
    this.contentTypes.push({
      id: 6,
      name: 'Tip Sheets'
    });
  }

  onFilter() {
    if (this.categoryId === undefined) {
      this.dialogRef.close(FilterDialogStatus.Clear);
    } else {
      this.dialogRef.close(this.categoryId);
    }
  }

  onClear() {
    this.dialogRef.close(FilterDialogStatus.Clear);
  }

}
