import { Component, ViewEncapsulation, ViewChild, ElementRef, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

import { SharingService } from './services/sharing.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'dso-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit{

  isLoading = true;
  myDevice: string;

  constructor(
    public sharingService: SharingService,
    private deviceService: DeviceDetectorService) {
      this.sharingService.isLoading.subscribe(isLoading => {
        this.isLoading = isLoading;
      });

      this.checkDevice();
  }

  ngOnInit() {}

  checkDevice() {
    this.epicFunction();

    this.myDevice = this.sharingService.getMyDevice();
  }

  epicFunction() {
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();

    if (isMobile) {
      this.sharingService.setMyDevice('mobile');
    } else if (isTablet) {
      this.sharingService.setMyDevice('tablet');
    } else if (isDesktopDevice) {
      this.sharingService.setMyDevice('desktop');
    }
  }
}
