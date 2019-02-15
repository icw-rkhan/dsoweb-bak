import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { SharingService } from 'src/app/services/sharing.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'dso-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.scss']
})
export class CareerComponent implements OnInit {

  @ViewChild('careerContainer') careerContainer: ElementRef;

  constructor(private sharingService: SharingService) { }

  ngOnInit() {
    const device = this.sharingService.getMyDevice();

    if (device === 'desktop') {
      const element = this.careerContainer.nativeElement;
      element.style.maxWidth = environment.fixedWidth;
      element.style.position = 'relative';
      element.style.margin = 'auto';
    }
  }
}
