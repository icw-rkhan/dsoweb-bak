import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { SharingService } from 'src/app/services/sharing.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'dso-setting-help',
  templateUrl: './setting-help.component.html',
  styleUrls: ['./setting-help.component.scss']
})
export class SettingHelpComponent implements OnInit {

  @ViewChild('settingContainer') settingContainer: ElementRef;

  constructor(private sharingService: SharingService) { }

  ngOnInit() {
    const device = this.sharingService.getMyDevice();

    if (device === 'desktop') {
      const element = this.settingContainer.nativeElement;
      element.style.maxWidth = environment.fixedWidth;
      element.style.position = 'relative';
      element.style.margin = 'auto';
    }
  }
}
