import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharingService {

  deviceType: string;
  isLoading: BehaviorSubject<boolean>;

  constructor() {
    this.isLoading = new BehaviorSubject<boolean>(false);
  }

  showLoading(status: boolean): void {
    this.isLoading.next(status);
  }

  getMyDevice(): string {
    return this.deviceType;
  }

  setMyDevice(type: string) {
    this.deviceType = type;
  }
 }
