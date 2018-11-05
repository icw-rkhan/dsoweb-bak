import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharingService {
  isLoading: BehaviorSubject<boolean>;
  posOfScroll: any;

  constructor() {
    this.isLoading = new BehaviorSubject<boolean>(false);
    this.posOfScroll = 0;
  }

  showLoading(status: boolean): void {
    this.isLoading.next(status);
  }

  getPosOfScroll() {
    return this.posOfScroll;
  }

  setPosOfScroll(pos: any) {
    this.posOfScroll = pos;
  }
}
