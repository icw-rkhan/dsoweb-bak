import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../models/category.model';

@Pipe({
  name: 'multipleCategories'
})
export class MultipleCategoriesPipe implements PipeTransform {
  transform(items: Category[] = [], args: any[]): any {
    return items.map(c => c.name).join(', ');
  }
}
