import { Pipe, PipeTransform } from '@angular/core';
import { Job } from '../models/job.model';

@Pipe({
  name: 'saved'
})
export class SavedPipe implements PipeTransform {
    transform(items: Job[], filter: boolean): any {
        if (!items || !filter) {
            return items;
        }

        return items.filter(item => item.isSaved === filter);
    }
}
