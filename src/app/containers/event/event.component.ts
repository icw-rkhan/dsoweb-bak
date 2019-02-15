import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { SharingService } from 'src/app/services/sharing.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'dso-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  @ViewChild('eventContainer') eventContainer: ElementRef;

  constructor(private sharingService: SharingService) { }

  ngOnInit() {
    const device = this.sharingService.getMyDevice();

    if (device === 'desktop') {
      const element = this.eventContainer.nativeElement;
      element.style.maxWidth = environment.fixedWidth;
      element.style.position = 'relative';
      element.style.margin = 'auto';
    }
  }
}
