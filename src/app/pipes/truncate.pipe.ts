import { Pipe, PipeTransform } from '@angular/core';
import { truncate } from 'lodash';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return truncate(value, {
      length: args
    });
  }
}
