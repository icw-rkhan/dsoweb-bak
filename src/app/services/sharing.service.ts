import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharingService {

  isLoading: BehaviorSubject<boolean>;
  isBookmark: boolean;

  constructor() {
    this.isBookmark = false;
    this.isLoading = new BehaviorSubject<boolean>(false);
  }

  showLoading(status: boolean): void {
    this.isLoading.next(status);
  }

  changeStatusOfBookmark(status: boolean) {
    this.isBookmark = status;
  }
}
