import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FilterDialogStatus } from '../../../enums/filter-dialog-status';

import { Category } from '../../../models/category.model';
import { ContentType } from '../../../models/content-type.model';
import { CategoryService } from '../../../services/category.service';

@Component({
  templateUrl: './bookmark-filter-dialog.component.html',
  styleUrls: ['./bookmark-filter-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarkFilterDialogComponent implements OnInit {

  categories: Category[];
  contentTypes: ContentType[];

  categoryId: number;
  contentTypeId: number;

  constructor(public dialogRef: MatDialogRef<BookmarkFilterDialogComponent>, private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.categoryService.categories.subscribe(categories => {
      this.categories = categories.filter(category => category.name.includes('*') === false);
    });


    this.categoryService.getAllContentTypes().subscribe(contentTypes => {
      this.contentTypes = contentTypes.filter(type => type.name.includes('*') === false);
    });
  }

  onFilter() {
    if (this.categoryId === undefined) {
      if (this.contentTypeId === undefined) {
        this.dialogRef.close(FilterDialogStatus.Clear);
      } else {
        this.dialogRef.close({filterType: 'contentType', value: this.contentTypeId});
      }
    } else {
      this.dialogRef.close({filterType: 'category', value: this.categoryId});
    }
  }

  onClear() {
    this.dialogRef.close(FilterDialogStatus.Clear);
  }

}
