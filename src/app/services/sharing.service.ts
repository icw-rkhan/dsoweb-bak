import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharingService {
  isLoading: BehaviorSubject<boolean>;

  constructor() {
    this.isLoading = new BehaviorSubject<boolean>(true);
  }

  showLoading̣̣(status: boolean): void {
    this.isLoading.next(status);
  }
}
